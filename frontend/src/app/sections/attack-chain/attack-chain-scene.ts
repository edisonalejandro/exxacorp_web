import * as THREE from 'three';

// --- small deterministic helpers -------------------------------------------------

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

/** Smoothstep-based remap: 0 before `start`, 1 after `end`, eased in between. */
function reveal(t: number, start: number, end: number): number {
  const x = clamp01((t - start) / (end - start));
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// --- node / edge data model --------------------------------------------------------

interface SceneNode {
  mesh: THREE.Mesh;
  gridPos: THREE.Vector3;
  layerPos: THREE.Vector3;
  layer: 0 | 1 | 2;
  /** progress at which this node lights up (0..1), null = never highlighted */
  litAt: number | null;
  baseColor: THREE.Color;
  litColor: THREE.Color;
}

interface SceneEdge {
  line: THREE.Line;
  from: SceneNode;
  to: SceneNode;
  revealStart: number;
  revealEnd: number;
  critical: boolean;
  curve: THREE.Vector3[];
}

const COLOR_DIM = new THREE.Color('#3a3149');
const COLOR_WHITE = new THREE.Color('#e9e4f4');
const COLOR_ORANGE = new THREE.Color('#f5a35c');
const COLOR_RED = new THREE.Color('#ef4444');
const COLOR_VIOLET = new THREE.Color('#9061f0');

const CATEGORY_COUNT = 9;
const LAYER_COUNTS = { l1: 10, l2: 10 };

export interface AttackChainLabel {
  el: HTMLDivElement;
  anchor: THREE.Vector3;
}

export class AttackChainScene {
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly clock = new THREE.Clock();

  private readonly gridNodes: SceneNode[] = [];
  private readonly l1Nodes: SceneNode[] = [];
  private readonly l2Nodes: SceneNode[] = [];
  private readonly edges: SceneEdge[] = [];
  private objectiveNode!: SceneNode;
  private objectiveGlow!: THREE.Sprite;

  private readonly labels: AttackChainLabel[] = [];
  private readonly labelContainer: HTMLElement;

  private progress = 0;
  private rafId = 0;
  private disposed = false;
  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement, labelContainer: HTMLElement, categories: string[]) {
    this.labelContainer = labelContainer;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(2, 3, 4);
    this.scene.add(key);

    this.buildGrid(categories);
    this.buildLayers();
    this.buildEdges();
    this.buildObjective();

    this.renderLoop();
  }

  // --- construction ---------------------------------------------------------------

  private buildGrid(categories: string[]): void {
    const rng = mulberry32(7);
    const spacing = 1.15;
    for (let i = 0; i < CATEGORY_COUNT; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const gridPos = new THREE.Vector3((col - 1) * spacing, (1 - row) * spacing, 0);

      const angle = (i / CATEGORY_COUNT) * Math.PI * 2;
      const radius = 2.6 + rng() * 0.6;
      const layerPos = new THREE.Vector3(
        Math.cos(angle) * radius,
        3.2 + (rng() - 0.5) * 0.3,
        Math.sin(angle) * radius * 0.35 - 1.5,
      );

      const geo = new THREE.BoxGeometry(0.34, 0.34, 0.08);
      const mat = new THREE.MeshStandardMaterial({ color: COLOR_WHITE, roughness: 0.5, metalness: 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(gridPos);
      this.scene.add(mesh);

      const node: SceneNode = {
        mesh,
        gridPos,
        layerPos,
        layer: 0,
        litAt: i === 4 ? 0.42 : i === 1 ? 0.46 : null,
        baseColor: COLOR_WHITE,
        litColor: i === 4 || i === 1 ? COLOR_RED : COLOR_ORANGE,
      };
      this.gridNodes.push(node);

      const el = document.createElement('div');
      el.className =
        'pointer-events-none absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-white/70 transition-opacity duration-150';
      el.textContent = categories[i] ?? '';
      this.labelContainer.appendChild(el);
      this.labels.push({ el, anchor: gridPos.clone() });
    }
  }

  private buildLayers(): void {
    const rng1 = mulberry32(101);
    const rng2 = mulberry32(202);
    this.scatterLayer(this.l1Nodes, LAYER_COUNTS.l1, 1, 0.4, rng1);
    this.scatterLayer(this.l2Nodes, LAYER_COUNTS.l2, -1.9, -0.4, rng2);
  }

  private scatterLayer(target: SceneNode[], count: number, centerY: number, centerZ: number, rng: () => number): void {
    const cols = Math.ceil(count / 2);
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * 0.62 + (rng() - 0.5) * 0.15;
      const y = centerY - row * 0.42 + (rng() - 0.5) * 0.1;
      const z = centerZ + (rng() - 0.5) * 0.5;
      const layerPos = new THREE.Vector3(x, y, z);

      const geo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
      const mat = new THREE.MeshStandardMaterial({ color: COLOR_DIM, roughness: 0.6, metalness: 0.1, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(layerPos);
      this.scene.add(mesh);

      target.push({
        mesh,
        gridPos: layerPos.clone(),
        layerPos,
        layer: target === this.l1Nodes ? 1 : 2,
        litAt: null,
        baseColor: COLOR_WHITE,
        litColor: COLOR_ORANGE,
      });
    }
  }

  private buildEdges(): void {
    const entries = [this.gridNodes[4], this.gridNodes[1]];
    const rngA = mulberry32(303);
    const l1Targets = this.pickRandom(this.l1Nodes, 7, rngA);
    l1Targets.forEach((target, i) => {
      const from = entries[i % entries.length];
      const critical = i === 0;
      this.addEdge(from, target, 0.46, 0.66, critical);
      target.litAt = lerp(0.5, 0.64, i / l1Targets.length);
      target.litColor = critical ? COLOR_RED : COLOR_ORANGE;
    });

    const litL1 = l1Targets;
    const rngB = mulberry32(404);
    const l2Targets = this.pickRandom(this.l2Nodes, 7, rngB);
    l2Targets.forEach((target, i) => {
      const from = litL1[i % litL1.length];
      const critical = i === 0;
      this.addEdge(from, target, 0.7, 0.9, critical);
      target.litAt = lerp(0.74, 0.88, i / l2Targets.length);
      target.litColor = critical ? COLOR_RED : COLOR_ORANGE;
    });
  }

  private pickRandom<T>(arr: T[], n: number, rng: () => number): T[] {
    const copy = [...arr];
    const out: T[] = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(rng() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  private addEdge(from: SceneNode, to: SceneNode, revealStart: number, revealEnd: number, critical: boolean): void {
    const points: THREE.Vector3[] = [];
    const segments = 24;
    const mid = from.layerPos.clone().lerp(to.layerPos, 0.5);
    mid.y += 0.15;
    const curve = new THREE.QuadraticBezierCurve3(from.layerPos, mid, to.layerPos);
    for (let i = 0; i <= segments; i++) points.push(curve.getPoint(i / segments));

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: critical ? COLOR_RED : COLOR_ORANGE, transparent: true, opacity: 0 });
    const line = new THREE.Line(geo, mat);
    this.scene.add(line);

    this.edges.push({ line, from, to, revealStart, revealEnd, critical, curve: points });
  }

  private buildObjective(): void {
    const geo = new THREE.OctahedronGeometry(0.26, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: COLOR_RED,
      emissive: COLOR_RED,
      emissiveIntensity: 0,
      roughness: 0.3,
      transparent: true,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const pos = new THREE.Vector3(0.3, -3.6, -0.6);
    mesh.position.copy(pos);
    this.scene.add(mesh);
    this.objectiveNode = { mesh, gridPos: pos, layerPos: pos, layer: 2, litAt: 0.92, baseColor: COLOR_RED, litColor: COLOR_RED };

    const spriteMat = new THREE.SpriteMaterial({
      map: this.makeGlowTexture(),
      color: COLOR_RED,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.objectiveGlow = new THREE.Sprite(spriteMat);
    this.objectiveGlow.scale.set(1.6, 1.6, 1.6);
    this.objectiveGlow.position.copy(pos);
    this.scene.add(this.objectiveGlow);

    const criticalL2 = this.edges.filter((e) => e.critical && e.to.layer === 2).map((e) => e.to)[0] ?? this.l2Nodes[0];
    this.addEdge(criticalL2, this.objectiveNode, 0.9, 0.98, true);
  }

  private makeGlowTexture(): THREE.Texture {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.4, 'rgba(239,68,68,0.55)');
    grad.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // --- per-frame update -------------------------------------------------------------

  setProgress(t: number): void {
    this.progress = clamp01(t);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private renderLoop = (): void => {
    if (this.disposed) return;
    this.update(this.clock.getElapsedTime());
    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this.renderLoop);
  };

  private update(time: number): void {
    const t = this.progress;

    // --- camera ---
    const gridToOrbit = reveal(t, 0.05, 0.3);
    const camStartPos = new THREE.Vector3(0, 0.3, 5.2);
    const camOrbitPos = new THREE.Vector3(2.6, 1.6, 3.6);
    const camScenePos = new THREE.Vector3(0, 0.6, 11.5);
    let camPos: THREE.Vector3;
    let lookAtTarget: THREE.Vector3;
    if (t < 0.32) {
      camPos = camStartPos.clone().lerp(camOrbitPos, gridToOrbit);
      lookAtTarget = new THREE.Vector3(0, 0, 0);
    } else {
      const settle = reveal(t, 0.32, 0.5);
      camPos = camOrbitPos.clone().lerp(camScenePos, settle);
      lookAtTarget = new THREE.Vector3(0, 0, 0).lerp(new THREE.Vector3(0, -0.2, -0.8), settle);
    }
    this.camera.position.copy(camPos);
    this.camera.lookAt(lookAtTarget);

    // --- grid dispersal (phase1 -> layer0 hanging position) ---
    const disperse = reveal(t, 0.3, 0.46);
    for (const n of this.gridNodes) {
      n.mesh.position.lerpVectors(n.gridPos, n.layerPos, disperse);
      const scale = lerp(1, 0.55, disperse);
      n.mesh.scale.setScalar(scale);
      this.applyNodeColor(n, t, time);
    }

    // --- lower layers fade in ---
    const layersIn = reveal(t, 0.34, 0.5);
    for (const n of this.l1Nodes) {
      (n.mesh.material as THREE.MeshStandardMaterial).opacity = layersIn;
      this.applyNodeColor(n, t, time);
    }
    for (const n of this.l2Nodes) {
      const l2In = reveal(t, 0.55, 0.7);
      (n.mesh.material as THREE.MeshStandardMaterial).opacity = l2In;
      this.applyNodeColor(n, t, time);
    }

    // --- edges ---
    let anyCriticalDone = true;
    for (const e of this.edges) {
      const localT = reveal(t, e.revealStart, e.revealEnd);
      const count = e.curve.length;
      const visibleCount = Math.max(2, Math.floor(count * localT));
      e.line.geometry.setFromPoints(e.curve.slice(0, visibleCount));
      const mat = e.line.material as THREE.LineBasicMaterial;
      mat.opacity = localT * (e.critical ? 0.95 : 0.55);
      if (e.critical && localT < 1) anyCriticalDone = false;
    }

    // --- final resolution: dim everything except the critical path ---
    const resolve = reveal(t, 0.94, 1.0);
    if (resolve > 0) {
      for (const e of this.edges) {
        const mat = e.line.material as THREE.LineBasicMaterial;
        if (!e.critical) mat.opacity *= 1 - resolve * 0.85;
      }
      for (const n of [...this.l1Nodes, ...this.l2Nodes]) {
        if (n.litColor !== COLOR_RED) {
          const mat = n.mesh.material as THREE.MeshStandardMaterial;
          mat.color.lerp(COLOR_DIM, resolve * 0.8);
        }
      }
    }
    void anyCriticalDone;

    // --- objective node ---
    const objIn = reveal(t, 0.88, 0.98);
    const objMat = this.objectiveNode.mesh.material as THREE.MeshStandardMaterial;
    objMat.opacity = objIn;
    objMat.emissiveIntensity = objIn * (1.2 + Math.sin(time * 3) * 0.2);
    this.objectiveNode.mesh.position.copy(this.objectiveNode.layerPos);
    this.objectiveNode.mesh.rotation.y = time * 0.6;
    this.objectiveNode.mesh.rotation.x = time * 0.3;
    (this.objectiveGlow.material as THREE.SpriteMaterial).opacity = objIn * (0.6 + Math.sin(time * 3) * 0.15);

    // --- labels (only meaningful during phase 1) ---
    const labelOpacity = 1 - reveal(t, 0.24, 0.4);
    for (const label of this.labels) {
      if (labelOpacity <= 0.01) {
        label.el.style.opacity = '0';
        continue;
      }
      const worldPos = label.anchor.clone();
      const gridNode = this.gridNodes[this.labels.indexOf(label)];
      worldPos.copy(gridNode.mesh.position).add(new THREE.Vector3(0, 0.26, 0));
      const projected = worldPos.project(this.camera);
      const x = (projected.x * 0.5 + 0.5) * this.width;
      const y = (-projected.y * 0.5 + 0.5) * this.height;
      label.el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
      label.el.style.opacity = String(labelOpacity);
    }
  }

  private applyNodeColor(n: SceneNode, t: number, time: number): void {
    const mat = n.mesh.material as THREE.MeshStandardMaterial;
    if (n.litAt !== null && t >= n.litAt) {
      const glowT = reveal(t, n.litAt, n.litAt + 0.06);
      mat.color.lerpColors(n.baseColor, n.litColor, glowT);
      if (n.layer === 0) {
        mat.emissive = n.litColor;
        mat.emissiveIntensity = glowT * (0.6 + Math.sin(time * 4) * 0.2);
      }
    } else {
      mat.color.copy(n.layer === 0 ? COLOR_VIOLET : COLOR_DIM);
      if (n.layer === 0) mat.color.copy(COLOR_WHITE);
    }
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    for (const label of this.labels) label.el.remove();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mat = obj.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    });
    this.renderer.dispose();
  }
}
