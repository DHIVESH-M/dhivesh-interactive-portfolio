import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playHoverSound } from '../../utils/audio';

const SKILLS_NODES = [
  { name: 'Java', category: 'Programming', color: '#00f0ff', pos: [0, 8, 0] },
  { name: 'C', category: 'Programming', color: '#38bdf8', pos: [-7, 3, 4] },
  { name: 'AI Model Dev', category: 'Artificial Intelligence', color: '#00f0ff', pos: [6, 4, -3] },
  { name: 'Machine Learning', category: 'Artificial Intelligence', color: '#3b82f6', pos: [7, -3, 3] },
  { name: 'Real-time AI', category: 'Artificial Intelligence', color: '#60a5fa', pos: [-6, -4, -4] },
  { name: 'Blender', category: 'Creative Tech', color: '#f97316', pos: [-4, 6, -5] },
  { name: 'Unity (Learner)', category: 'Creative Tech', color: '#fbbf24', pos: [3, -7, -4] },
  { name: 'Illustrator', category: 'Creative Tech', color: '#f59e0b', pos: [5, 5, 5] },
  { name: 'AWS (Learner)', category: 'Cloud Computing', color: '#f59e0b', pos: [-5, -6, 5] }
];

export default function Skills3DConstellation() {
  const mountRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 4, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Center Core Anchor
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Celestial Orbital Wireframe Sphere
    const sphereWireGeom = new THREE.IcosahedronGeometry(9.5, 2);
    const wireframe = new THREE.WireframeGeometry(sphereWireGeom);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.12
    });
    const sphereLines = new THREE.LineSegments(wireframe, lineMat);
    rootGroup.add(sphereLines);

    // Center Pulsing Core
    const coreGeom = new THREE.SphereGeometry(1.5, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const centerCore = new THREE.Mesh(coreGeom, coreMat);
    rootGroup.add(centerCore);

    // Create 3D Nodes
    const raycastMeshes = [];
    const nodeMeshes = [];

    SKILLS_NODES.forEach((skill, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...skill.pos);

      // Node Sphere
      const geom = new THREE.SphereGeometry(0.85, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.5
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.userData = { skill, idx };
      nodeGroup.add(mesh);
      raycastMeshes.push(mesh);

      // Outer Halo Ring
      const haloGeom = new THREE.RingGeometry(1.1, 1.25, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      nodeGroup.add(halo);

      // Connecting Line to Center
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...skill.pos)
      ]);
      const rayLineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.25
      });
      const rayLine = new THREE.Line(lineGeom, rayLineMat);
      rootGroup.add(rayLine);

      rootGroup.add(nodeGroup);
      nodeMeshes.push({ group: nodeGroup, mesh, halo, skill });
    });

    // Connecting Network Lines Between Nodes
    const connectionPoints = [];
    for (let i = 0; i < SKILLS_NODES.length; i++) {
      for (let j = i + 1; j < SKILLS_NODES.length; j++) {
        const p1 = new THREE.Vector3(...SKILLS_NODES[i].pos);
        const p2 = new THREE.Vector3(...SKILLS_NODES[j].pos);
        if (p1.distanceTo(p2) < 11) {
          connectionPoints.push(p1, p2);
        }
      }
    }
    const netGeom = new THREE.BufferGeometry().setFromPoints(connectionPoints);
    const netMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18
    });
    const netLines = new THREE.LineSegments(netGeom, netMat);
    rootGroup.add(netLines);

    // Raycasting & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        rootGroup.rotation.y += dx * 0.008;
        rootGroup.rotation.x += dy * 0.008;
        rotVelY = dx * 0.004;
        rotVelX = dy * 0.004;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // Inertia & Auto-rotation
      if (!isDragging) {
        rotVelX *= 0.95;
        rotVelY *= 0.95;
        rootGroup.rotation.y += 0.004 + rotVelY;
        rootGroup.rotation.x += rotVelX;
      }

      centerCore.rotation.y = t * 0.4;
      centerCore.rotation.z = t * 0.2;

      // Billboarding halos so they always face camera
      nodeMeshes.forEach(({ group, halo }) => {
        halo.quaternion.copy(camera.quaternion);
      });

      // Raycast test
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const skill = hit.userData.skill;
        if (hoveredSkill?.name !== skill.name) {
          setHoveredSkill(skill);
          playHoverSound();
        }
        hit.scale.set(1.4, 1.4, 1.4);
      } else {
        if (hoveredSkill !== null) {
          setHoveredSkill(null);
        }
        raycastMeshes.forEach((m) => m.scale.set(1, 1, 1));
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [hoveredSkill]);

  return (
    <div className="relative w-full h-[450px] rounded-3xl glass-panel border border-cyan-500/20 overflow-hidden flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D HUD Badge in Corner */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>THREE.JS &bull; 3D SKILL CONSTELLATION</span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none text-[11px] font-mono text-slate-500 hidden sm:block">
        DRAG TO ROTATE &bull; HOVER NODES
      </div>

      {/* Floating 3D Hover Card Indicator */}
      {hoveredSkill && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none px-5 py-2.5 rounded-2xl bg-[#090e1a]/90 border border-cyan-400 text-center shadow-xl shadow-cyan-500/30 backdrop-blur-lg animate-in fade-in zoom-in duration-150">
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
            {hoveredSkill.category}
          </div>
          <div className="text-base font-bold text-white">
            {hoveredSkill.name}
          </div>
        </div>
      )}
    </div>
  );
}
