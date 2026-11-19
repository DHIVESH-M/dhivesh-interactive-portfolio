import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas({ scrollProgress }) {
  const mountRef = useRef(null);
  const shardsRef = useRef([]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    let animId = null;
    const disposables = [];

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const isMobile = (container.clientWidth || window.innerWidth) < 768;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Context loss handling
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

    // 2. Lighting for Glass Shards
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3, 100);
    cyanLight.position.set(0, 0, 20);
    scene.add(cyanLight);

    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 2);
    blueRimLight.position.set(30, 20, 10);
    scene.add(blueRimLight);

    // 3. Create 3D Glass Shards (lighter on mobile)
    const shardCount = isMobile ? 14 : 32;
    const shards = [];

    // Efficient MeshStandardMaterial with high specular shine (avoids heavy transmission render targets on integrated GPUs)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8f4ff,
      emissive: 0x002b44,
      roughness: 0.1,
      metalness: 0.15,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    disposables.push(glassMaterial);

    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4
    });
    disposables.push(wireMaterial);

    for (let i = 0; i < shardCount; i++) {
      const radius = Math.random() * 2.2 + 1.2;
      const h = Math.random() * 4.2 + 2.0;
      const geom = new THREE.ConeGeometry(radius, h, 3);
      geom.scale(1, Math.random() * 0.35 + 0.12, 1);
      disposables.push(geom);

      const mesh = new THREE.Mesh(geom, glassMaterial);
      
      const wireGeom = new THREE.WireframeGeometry(geom);
      disposables.push(wireGeom);
      const wire = new THREE.LineSegments(wireGeom, wireMaterial);
      mesh.add(wire);

      const angle = (i / shardCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distFromCenter = Math.random() * 14 + 2;

      const initX = Math.cos(angle) * distFromCenter * 0.4;
      const initY = Math.sin(angle) * distFromCenter * 0.4;
      const initZ = (Math.random() - 0.5) * 3;

      mesh.position.set(initX, initY, initZ);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      const spread = Math.random() * 35 + 20;
      const targetX = Math.cos(angle) * spread + (Math.random() - 0.5) * 15;
      const targetY = Math.sin(angle) * spread + (Math.random() - 0.5) * 15;
      const targetZ = Math.random() * 40 + 10;

      const rotSpeedX = (Math.random() - 0.5) * 8;
      const rotSpeedY = (Math.random() - 0.5) * 8;
      const rotSpeedZ = (Math.random() - 0.5) * 8;

      scene.add(mesh);

      shards.push({
        mesh,
        initPos: new THREE.Vector3(initX, initY, initZ),
        targetPos: new THREE.Vector3(targetX, targetY, targetZ),
        initRot: mesh.rotation.clone(),
        rotSpeed: new THREE.Vector3(rotSpeedX, rotSpeedY, rotSpeedZ),
        baseScale: Math.random() * 0.5 + 0.7
      });
    }

    shardsRef.current = shards;

    // 4. Floating 3D Sparkle Dust Particles
    const sparkleCount = 80;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 80;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    disposables.push(sparkleGeom, sparkleMat);

    const sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    scene.add(sparkles);

    // 5. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      const delta = clock.getDelta();
      const p = progressRef.current;

      targetCamX += (mouseX - targetCamX) * 0.08;
      targetCamY += (mouseY - targetCamY) * 0.08;
      camera.position.x = targetCamX;
      camera.position.y = targetCamY;
      camera.lookAt(0, 0, 0);

      const shatterProgress = Math.max(0, Math.min(1, (p - 0.38) / 0.35));

      if (shatterProgress > 0.005) {
        shards.forEach((item) => {
          const { mesh, initPos, targetPos, initRot, rotSpeed, baseScale } = item;

          mesh.position.lerpVectors(initPos, targetPos, shatterProgress);
          mesh.rotation.x = initRot.x + rotSpeed.x * shatterProgress;
          mesh.rotation.y = initRot.y + rotSpeed.y * shatterProgress;
          mesh.rotation.z = initRot.z + rotSpeed.z * shatterProgress;

          mesh.visible = true;
          const s = baseScale * (0.8 + shatterProgress * 0.4);
          mesh.scale.set(s, s, s);
          mesh.material.opacity = Math.min(0.9, shatterProgress * 1.5);
        });
      } else {
        shards.forEach((item) => {
          item.mesh.visible = false;
        });
      }

      sparkles.rotation.y += delta * 0.1;
      sparkles.rotation.x += delta * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
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
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden"
    />
  );
}
