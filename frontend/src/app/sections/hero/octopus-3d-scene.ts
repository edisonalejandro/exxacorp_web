import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { prefersReducedMotion } from '../../core/reduced-motion';

const MODEL_URL = '/assets/3d/octopus-serious.glb';

/**
 * Hexagon corner-dot positions as measured on the source artwork (% of the
 * badge's own width/height), used to anchor the hotspot markers to the
 * corresponding point on the 3D relief. Only three alternate corners are used
 * (one per core service) so the tooltips never cover each other.
 */
export const HOTSPOT_PCT = {
  top: { x: 49.68, y: 9.44 },
  lowerRight: { x: 87.87, y: 69.14 },
  lowerLeft: { x: 11.64, y: 69.13 },
} as const;
export type HotspotCorner = keyof typeof HOTSPOT_PCT;
const CORNERS: HotspotCorner[] = ['top', 'lowerRight', 'lowerLeft'];

const MAX_TILT = 0.22; // radians (~12.6deg) — parallax only, never a full turn
const TARGET_HEIGHT = 2.6;

export class Octopus3DScene {
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly clock = new THREE.Clock();
  private readonly pivot = new THREE.Group();

  private anchorLocal: THREE.Vector3[] = [];

  private targetTiltX = 0;
  private targetTiltY = 0;
  private currentTiltX = 0;
  private currentTiltY = 0;

  private rafId = 0;
  private disposed = false;
  private paused = false;
  private width = 1;
  private height = 1;
  private readonly reducedMotion = prefersReducedMotion();

  private onHotspotUpdate: ((positions: Record<HotspotCorner, { x: number; y: number }>) => void) | null = null;
  private onLoaded: (() => void) | null = null;

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

  onHotspots(cb: (positions: Record<HotspotCorner, { x: number; y: number }>) => void): void {
    this.onHotspotUpdate = cb;
  }

  /** Called once the model is in the scene (the static poster can fade out). */
  onReady(cb: () => void): void {
    this.onLoaded = cb;
  }

  private async load(): Promise<void> {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(MODEL_URL);
    if (this.disposed) return;
    this.prepare(gltf.scene);
    this.pivot.add(gltf.scene);
    this.onLoaded?.();
  }

  private prepare(root: THREE.Group): void {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    root.position.sub(center);
    const scale = TARGET_HEIGHT / size.y;
    root.scale.setScalar(scale);

    const depth = size.z * scale;
    this.anchorLocal = CORNERS.map((corner) => {
      const p = HOTSPOT_PCT[corner];
      return new THREE.Vector3((p.x / 100 - 0.5) * size.x * scale, (0.5 - p.y / 100) * size.y * scale, depth * 0.32);
    });
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

  /** Stops the render loop (e.g. while the canvas is scrolled out of view). */
  pause(): void {
    this.paused = true;
    cancelAnimationFrame(this.rafId);
  }

  /** Restarts the render loop after `pause()`. */
  resume(): void {
    if (!this.paused || this.disposed) return;
    this.paused = false;
    this.clock.start();
    this.renderLoop();
  }

  private renderLoop = (): void => {
    if (this.disposed || this.paused) return;
    this.update(this.clock.getElapsedTime());
    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this.renderLoop);
  };

  private update(time: number): void {
    this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.08;
    this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.08;

    const idleSway = this.reducedMotion ? 0 : Math.sin(time * 0.6) * 0.03;
    this.pivot.rotation.x = this.currentTiltX;
    this.pivot.rotation.y = this.currentTiltY + idleSway;

    if (this.onHotspotUpdate && this.anchorLocal.length === CORNERS.length) {
      this.pivot.updateMatrixWorld(true);
      const positions = {} as Record<HotspotCorner, { x: number; y: number }>;
      CORNERS.forEach((corner, i) => {
        const projected = this.anchorLocal[i].clone().applyMatrix4(this.pivot.matrixWorld).project(this.camera);
        positions[corner] = {
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
