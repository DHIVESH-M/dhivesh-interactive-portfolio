import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas({ scrollProgress, hasShattered }) {
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting for Glass Shards
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3, 100);
    cyanLight.position.set(0, 0, 20);
    scene.add(cyanLight);

    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 2);
    blueRimLight.position.set(30, 20, 10);
    scene.add(blueRimLight);

    // 3. Create 3D Glass Shards
    const shardCount = 36;
    const shards = [];

    // Glass material with cyan specular rim and transmission look
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9be8ff,
      emissive: 0x003355,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      transparent: true,
      opacity: 0.8,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });

    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < shardCount; i++) {
      // Create varied sharp shard shapes using 3-sided cones or flattened tetrahedrons
      const radius = Math.random() * 2.5 + 1.2;
      const height = Math.random() * 4.5 + 2.0;
      const geom = new THREE.ConeGeometry(radius, height, 3);
      geom.scale(1, Math.random() * 0.4 + 0.1, 1); // Flatten into a shard

      const mesh = new THREE.Mesh(geom, glassMaterial);
      
      // Wireframe edge accent
      const wireGeom = new THREE.WireframeGeometry(geom);
      const wire = new THREE.LineSegments(wireGeom, wireMaterial);
      mesh.add(wire);

      // Initial center distribution (near the glass plane z=0)
      const angle = (i / shardCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distFromCenter = Math.random() * 14 + 2;

      const initX = Math.cos(angle) * distFromCenter * 0.4;
      const initY = Math.sin(angle) * distFromCenter * 0.4;
      const initZ = (Math.random() - 0.5) * 3;

      mesh.position.set(initX, initY, initZ);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      // Trajectory velocity when shattered
      const spread = Math.random() * 35 + 20;
      const targetX = Math.cos(angle) * spread + (Math.random() - 0.5) * 15;
      const targetY = Math.sin(angle) * spread + (Math.random() - 0.5) * 15;
      const targetZ = Math.random() * 40 + 10; // explodes towards screen

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
    const sparkleCount = 120;
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
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const p = progressRef.current;

      // Camera tilt with smooth damping
      targetCamX += (mouseX - targetCamX) * 0.08;
      targetCamY += (mouseY - targetCamY) * 0.08;
      camera.position.x = targetCamX;
      camera.position.y = targetCamY;
      camera.lookAt(0, 0, 0);

      // Calculate shatter explosion factor (0 before 38%, ramps up to 1.0 by 70%)
      const shatterProgress = Math.max(0, Math.min(1, (p - 0.38) / 0.35));

      shards.forEach((item) => {
        const { mesh, initPos, targetPos, initRot, rotSpeed, baseScale } = item;

        // Position interpolation
        mesh.position.lerpVectors(initPos, targetPos, shatterProgress);

        // Rotation spin based on shatter progress
        mesh.rotation.x = initRot.x + rotSpeed.x * shatterProgress;
        mesh.rotation.y = initRot.y + rotSpeed.y * shatterProgress;
        mesh.rotation.z = initRot.z + rotSpeed.z * shatterProgress;

        // Scale & Visibility
        if (shatterProgress > 0.01) {
          mesh.visible = true;
          const s = baseScale * (0.8 + shatterProgress * 0.4);
          mesh.scale.set(s, s, s);
          mesh.material.opacity = Math.min(0.9, shatterProgress * 1.5);
        } else {
          mesh.visible = false;
        }
      });

      // Ambient sparkle rotation
      sparkles.rotation.y += delta * 0.1;
      sparkles.rotation.x += delta * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
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
