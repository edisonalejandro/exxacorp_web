import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const CUTE_URL = '/assets/3d/octopus-cute.glb';
const SERIOUS_URL = '/assets/3d/octopus-serious.glb';

// Hexagon corner-dot positions as measured on the source artwork (% of the
// badge's own width/height), reused here to anchor the 6 hotspot markers to
// the corresponding point on the 3D relief.
const HOTSPOT_PCT: { x: number; y: number }[] = [
  { x: 49.68, y: 9.44 }, // top
  { x: 87.74, y: 30.58 }, // upper-right
  { x: 87.87, y: 69.14 }, // lower-right
  { x: 49.58, y: 89.39 }, // bottom
  { x: 11.64, y: 69.13 }, // lower-left
  { x: 11.5, y: 30.62 }, // upper-left
];

const MAX_TILT = 0.22; // radians (~12.6deg) — parallax only, never a full turn
const TARGET_HEIGHT = 2.6;

interface LoadedOctopus {
  root: THREE.Group;
  materials: THREE.Material[];
}

export class Octopus3DScene {
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly clock = new THREE.Clock();
  private readonly pivot = new THREE.Group();

  private cute?: LoadedOctopus;
  private serious?: LoadedOctopus;
  private anchorLocal: THREE.Vector3[] = [];

  private targetTiltX = 0;
  private targetTiltY = 0;
  private currentTiltX = 0;
  private currentTiltY = 0;
  private mood = 0; // 0 = cute, 1 = serious
  private moodTarget = 0;

  private rafId = 0;
  private disposed = false;
  private width = 1;
  private height = 1;

  private onHotspotUpdate: ((positions: { x: number; y: number }[]) => void) | null = null;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    this.camera.position.set(0, 0, 6.4);

    this.scene.add(this.pivot);

    this.scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    // Lights are parented to the pivot (not the scene) so they rotate together
    // with the relief and it never goes dark when tilted.
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(2.5, 3, 4);
    this.pivot.add(key, key.target);
    const rim = new THREE.DirectionalLight(0x9061f0, 0.9);
    rim.position.set(-3, 1.5, -2);
    this.pivot.add(rim, rim.target);
    const fill = new THREE.DirectionalLight(0x60a5fa, 0.4);
    fill.position.set(-1, -2, 3);
    this.pivot.add(fill, fill.target);

    this.load();
    this.renderLoop();
  }

  onHotspots(cb: (positions: { x: number; y: number }[]) => void): void {
    this.onHotspotUpdate = cb;
  }

  private async load(): Promise<void> {
    const loader = new GLTFLoader();
    const [cuteGltf, seriousGltf] = await Promise.all([loader.loadAsync(CUTE_URL), loader.loadAsync(SERIOUS_URL)]);

    this.cute = this.prepare(cuteGltf.scene, true);
    this.serious = this.prepare(seriousGltf.scene, false);
    this.pivot.add(this.cute.root, this.serious.root);
  }

  private prepare(root: THREE.Group, computeAnchors: boolean): LoadedOctopus {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    root.position.sub(center);
    const scale = TARGET_HEIGHT / size.y;
    root.scale.setScalar(scale);

    if (computeAnchors) {
      const depth = size.z * scale;
      this.anchorLocal = HOTSPOT_PCT.map(
        (p) =>
          new THREE.Vector3(
            (p.x / 100 - 0.5) * size.x * scale,
            (0.5 - p.y / 100) * size.y * scale,
            depth * 0.32,
          ),
      );
    }

    const materials: THREE.Material[] = [];
    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          m.transparent = true;
          m.opacity = computeAnchors ? 1 : 0;
          materials.push(m);
        }
      }
    });

    return { root, materials };
  }

  setMood(serious: boolean): void {
    this.moodTarget = serious ? 1 : 0;
  }

  setPointer(nx: number, ny: number): void {
    // nx, ny in [-1, 1] relative to the container center
    this.targetTiltY = nx * MAX_TILT;
    this.targetTiltX = -ny * MAX_TILT;
  }

  resetPointer(): void {
    this.targetTiltX = 0;
    this.targetTiltY = 0;
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
    this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.08;
    this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.08;

    const idleSway = Math.sin(time * 0.6) * 0.03;
    this.pivot.rotation.x = this.currentTiltX;
    this.pivot.rotation.y = this.currentTiltY + idleSway;

    this.mood += (this.moodTarget - this.mood) * 0.09;
    if (this.cute && this.serious) {
      // Only one mesh is ever visible/transparent at a time: rendering both
      // fully-overlapping meshes as transparent simultaneously produces bad
      // depth-sorting artifacts (large dark patches). So this is a quick
      // sequential fade-out-then-fade-in across the midpoint instead of a
      // true cross-dissolve.
      if (this.mood < 0.5) {
        const cuteOpacity = Math.min(1, (0.5 - this.mood) * 2);
        this.cute.root.visible = true;
        this.serious.root.visible = false;
        for (const m of this.cute.materials) m.opacity = cuteOpacity;
      } else {
        const seriousOpacity = Math.min(1, (this.mood - 0.5) * 2);
        this.cute.root.visible = false;
        this.serious.root.visible = true;
        for (const m of this.serious.materials) m.opacity = seriousOpacity;
      }
    }

    if (this.onHotspotUpdate && this.anchorLocal.length === 6) {
      this.pivot.updateMatrixWorld(true);
      const positions = this.anchorLocal.map((local) => {
        const world = local.clone().applyMatrix4(this.pivot.matrixWorld);
        const projected = world.project(this.camera);
        return {
          x: (projected.x * 0.5 + 0.5) * this.width,
          y: (-projected.y * 0.5 + 0.5) * this.height,
        };
      });
      this.onHotspotUpdate(positions);
    }
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    this.renderer.dispose();
  }
}
