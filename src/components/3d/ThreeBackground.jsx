import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ isReducedMotion = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    let animId = null;
    const disposables = [];

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.005);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    container.appendChild(renderer.domElement);

    const canvasEl = renderer.domElement;
    const handleContextLost = (e) => {
      e.preventDefault();
      if (animId) cancelAnimationFrame(animId);
    };
    const handleContextRestored = () => {
      animate();
    };
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 2. Interactive Neural Particle Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = [];

    const cyanColor = new THREE.Color('#00f5ff');
    const purpleColor = new THREE.Color('#a855f7');
    const blueColor = new THREE.Color('#38bdf8');
    const whiteColor = new THREE.Color('#f8fafc');

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 160;
      const z = (Math.random() - 0.5) * 140 - 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        vz: (Math.random() - 0.5) * 0.04
      });

      // Randomized multi-tone cyber colors
      const rand = Math.random();
      const col = rand > 0.6 ? cyanColor : rand > 0.3 ? purpleColor : rand > 0.1 ? blueColor : whiteColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    disposables.push(particleGeo);

    // Create glowing point sprite
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(0, 245, 255, 0.9)');
    gradient.addColorStop(0.55, 'rgba(168, 85, 247, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
    disposables.push(spriteTexture);

    const particleMat = new THREE.PointsMaterial({
      size: 2.2,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    disposables.push(particleMat);

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // 3. Floating 3D Cyber Wireframe Nodes (AI/ML Geometries)
    const polyhedra = [];
    const polyGeo1 = new THREE.IcosahedronGeometry(6, 1);
    const polyGeo2 = new THREE.OctahedronGeometry(5, 0);
    const polyGeo3 = new THREE.TorusGeometry(8, 0.4, 8, 32);
    disposables.push(polyGeo1, polyGeo2, polyGeo3);

    const wireMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.20
    });
    const wireMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    disposables.push(wireMat1, wireMat2, wireMat3);

    // Polyhedron 1: Floating top right
    const p1 = new THREE.Mesh(polyGeo1, wireMat1);
    p1.position.set(50, 28, -30);
    scene.add(p1);
    polyhedra.push({ mesh: p1, rotSpeedX: 0.004, rotSpeedY: 0.007, basePos: p1.position.clone() });

    // Polyhedron 2: Floating mid left
    const p2 = new THREE.Mesh(polyGeo2, wireMat2);
    p2.position.set(-55, -12, -40);
    scene.add(p2);
    polyhedra.push({ mesh: p2, rotSpeedX: -0.006, rotSpeedY: 0.005, basePos: p2.position.clone() });

    // Polyhedron 3: Torus floating lower center
    const p3 = new THREE.Mesh(polyGeo3, wireMat3);
    p3.position.set(20, -42, -50);
    scene.add(p3);
    polyhedra.push({ mesh: p3, rotSpeedX: 0.005, rotSpeedY: 0.003, basePos: p3.position.clone() });

    // 4. Horizon Cyber Grid Plane
    const gridHelper = new THREE.GridHelper(260, 36, 0x00f5ff, 0xa855f7);
    gridHelper.position.y = -55;
    gridHelper.position.z = -30;
    if (gridHelper.material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.12;
      disposables.push(gridHelper.material);
    }
    scene.add(gridHelper);
    disposables.push(gridHelper);

    // 5. Interactive Mouse & Scroll Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let mouseNX = 0;
    let mouseNY = 0;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleMouseMove = (e) => {
      mouseNX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = mouseNX * 0.22;
      targetRotX = -mouseNY * 0.18;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) animate();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 6. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Smooth camera orientation lerp
      curRotX += (targetRotX - curRotX) * 0.05;
      curRotY += (targetRotY - curRotY) * 0.05;
      camera.rotation.x = curRotX;
      camera.rotation.y = curRotY;

      // Scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;
      const scrollFactor = scrollY * 0.0012;

      // Rotate and drift wireframe polyhedra
      polyhedra.forEach((p, idx) => {
        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.position.y = p.basePos.y + Math.sin(elapsed * 0.8 + idx * 1.5) * 3 - scrollFactor * 12;
        p.mesh.position.x = p.basePos.x + Math.cos(elapsed * 0.6 + idx) * 2;
      });

      // Animate particles & respond to mouse
      if (!isReducedMotion) {
        const posAttr = particleGeo.attributes.position;
        const posArr = posAttr.array;

        for (let i = 0; i < particleCount; i++) {
          const idx3 = i * 3;
          posArr[idx3] += velocities[i].vx;
          posArr[idx3 + 1] += velocities[i].vy;
          posArr[idx3 + 2] += velocities[i].vz;

          // Wrap boundaries
          if (posArr[idx3] > 100) posArr[idx3] = -100;
          if (posArr[idx3] < -100) posArr[idx3] = 100;
          if (posArr[idx3 + 1] > 80) posArr[idx3 + 1] = -80;
          if (posArr[idx3 + 1] < -80) posArr[idx3 + 1] = 80;
          if (posArr[idx3 + 2] > 50) posArr[idx3 + 2] = -90;
          if (posArr[idx3 + 2] < -90) posArr[idx3 + 2] = 50;
        }

        posAttr.needsUpdate = true;
        particleMesh.rotation.y = elapsed * 0.02 + mouseNX * 0.05;
        particleMesh.rotation.x = elapsed * 0.01 + mouseNY * 0.04;
      }

      // Slowly shift horizon cyber grid
      gridHelper.rotation.y = elapsed * 0.02;
      gridHelper.position.y = -55 - (scrollY * 0.015) % 10;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
      if (animId) cancelAnimationFrame(animId);

      disposables.forEach((item) => {
        if (item && typeof item.dispose === 'function') {
          item.dispose();
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% -20%, rgba(30, 20, 60, 0.45) 0%, rgba(7, 8, 11, 0.95) 75%, #07080b 100%)'
      }}
    />
  );
}
