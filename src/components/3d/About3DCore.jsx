import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function About3DCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    let animId = null;
    const disposables = [];

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 4, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3, 30);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    // Group for all core parts
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Core (Octahedron)
    const innerGeom = new THREE.OctahedronGeometry(2.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0077aa,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);
    disposables.push(innerGeom, innerMat);

    // 2. Wireframe Cage (Icosahedron)
    const cageGeom = new THREE.IcosahedronGeometry(4.2, 1);
    const cageWireGeom = new THREE.WireframeGeometry(cageGeom);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.LineSegments(cageWireGeom, cageMat);
    coreGroup.add(cageMesh);
    disposables.push(cageGeom, cageWireGeom, cageMat);

    // 3. Orbital Ring 1
    const ring1Geom = new THREE.TorusGeometry(5.2, 0.08, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);
    disposables.push(ring1Geom, ring1Mat);

    // 4. Orbital Ring 2
    const ring2Geom = new THREE.TorusGeometry(5.8, 0.06, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);
    disposables.push(ring2Geom, ring2Mat);

    // 5. Orbital Particles
    const orbPartCount = 35;
    const orbPartGeom = new THREE.BufferGeometry();
    const orbPartPos = new Float32Array(orbPartCount * 3);

    for (let i = 0; i < orbPartCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * 2.5 + 4.5;
      orbPartPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      orbPartPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      orbPartPos[i * 3 + 2] = r * Math.cos(phi);
    }

    orbPartGeom.setAttribute('position', new THREE.BufferAttribute(orbPartPos, 3));
    const orbPartMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const orbPoints = new THREE.Points(orbPartGeom, orbPartMat);
    coreGroup.add(orbPoints);
    disposables.push(orbPartGeom, orbPartMat);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetRotX += (mouseY * 0.8 - targetRotX) * 0.05;
      targetRotY += (mouseX * 0.8 - targetRotY) * 0.05;

      coreGroup.rotation.x = t * 0.2 + targetRotX;
      coreGroup.rotation.y = t * 0.3 + targetRotY;

      // Pulse inner core
      const scale = 1 + Math.sin(t * 2) * 0.08;
      innerMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.y = -t * 0.5;

      ring1.rotation.z = t * 0.4;
      ring2.rotation.z = -t * 0.3;

      orbPoints.rotation.y = t * 0.2;

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
      className="w-full h-full min-h-[220px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
