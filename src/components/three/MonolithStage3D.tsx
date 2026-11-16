import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MonolithStage3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function MonolithStage3D({ scrollProgressRef }: MonolithStage3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 60);
    camera.position.set(0, 0.8, 9.2);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x09090b, 0.65);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 7, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xe4e4e7, 1.6);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const pillarMatDark = new THREE.MeshStandardMaterial({
      color: 0x121217,
      metalness: 0.78,
      roughness: 0.25,
    });

    const pillarMatSilver = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.88,
      roughness: 0.22,
    });

    const pillars: THREE.Mesh[] = [];
    const pillarGeos: THREE.BufferGeometry[] = [];
    const count = 7;

    for (let i = 0; i < count; i++) {
      const height = 1.1 + i * 0.48;
      const geo = new THREE.BoxGeometry(0.46, height, 0.46);
      pillarGeos.push(geo);
      const mesh = new THREE.Mesh(geo, i === count - 1 ? pillarMatSilver : pillarMatDark);
      mesh.position.set((i - (count - 1) / 2) * 0.88, -1.6 + height * 0.5, -Math.abs(i - 3) * 0.32);
      stageGroup.add(mesh);
      pillars.push(mesh);
    }

    const arcGeo = new THREE.TorusGeometry(3.8, 0.014, 14, 100, Math.PI * 1.15);
    const arcMesh = new THREE.Mesh(arcGeo, pillarMatSilver);
    arcMesh.rotation.set(Math.PI * 0.12, 0, -Math.PI * 0.08);
    arcMesh.position.y = 0.2;
    stageGroup.add(arcMesh);

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    let isVisible = false;
    let smoothScroll = 0;

    // Only render MonolithStage3D when Scene 10 is actually near/in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !disposed) {
          clock.getDelta();
          tick();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 },
    );
    observer.observe(container);

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed || !isVisible) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed || !isVisible) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const motionFactor = prefersReducedMotion ? 0.15 : 1;

      smoothScroll = THREE.MathUtils.damp(smoothScroll, scrollProgressRef.current, 6, delta);

      stageGroup.rotation.y = (smoothScroll - 0.5) * 0.7 + Math.sin(elapsed * 0.25) * 0.08 * motionFactor;
      stageGroup.rotation.x = 0.08 + (smoothScroll - 0.5) * 0.18;
      stageGroup.position.y = (smoothScroll - 0.5) * -0.4;

      for (let i = 0; i < pillars.length; i++) {
        const p = pillars[i];
        const wave = Math.sin(elapsed * 0.9 + i * 0.55) * 0.08 * motionFactor;
        const lift = smoothScroll * (i * 0.12);
        const baseH = 1.1 + i * 0.48;
        p.position.y = -1.6 + baseH * 0.5 + wave + lift;
      }

      arcMesh.rotation.z = -Math.PI * 0.08 + smoothScroll * 0.45;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);

      pillarGeos.forEach((g) => g.dispose());
      arcGeo.dispose();
      pillarMatDark.dispose();
      pillarMatSilver.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef]);

  if (webglFailed) {
    return null;
  }

  return <div ref={containerRef} className="w-full h-full opacity-70" aria-hidden="true" />;
}
