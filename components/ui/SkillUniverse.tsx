'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Skill } from '@/lib/data';

interface SkillUniverseProps {
  skills: Skill[];
  onSkillHover: (skill: Skill | null) => void;
}

function Word({ children, position, skill, onHover, ...props }: any) {
  const color = new THREE.Color();
  const fontProps = { 
    fontSize: 2.5, 
    letterSpacing: -0.05, 
    lineHeight: 1, 
    'material-toneMapped': false,
    font: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
  };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  
  const over = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    onHover(skill);
    document.body.style.cursor = 'pointer';
  };
  
  const out = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = 'auto';
  };

  useFrame(({ camera }) => {
    if (ref.current) {
        // Make text always face camera
        ref.current.quaternion.copy(camera.quaternion);
        // Animate color/scale on hover
        if (ref.current.material) {
          ref.current.material.color.lerp(color.set(hovered ? '#00D9FF' : '#ffffff'), 0.1);
        }
        ref.current.scale.lerp(new THREE.Vector3().setScalar(hovered ? 1.5 : 1), 0.1);
    }
  });

  return (
    <Text 
      ref={ref} 
      position={position} 
      {...props} 
      {...fontProps} 
      onPointerOver={over} 
      onPointerOut={out}
    >
      {children}
    </Text>
  );
}

function Cloud({ radius = 20, skills, onSkillHover }: { radius: number, skills: Skill[], onSkillHover: any }) {
  // Fibonacci Sphere distribution
  const words = useMemo(() => {
    const temp: any[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    // Duplicate skills if not enough to fill a nice sphere
    const list = skills.length < 15 ? [...skills, ...skills, ...skills] : skills;

    for (let i = 0; i < list.length; i++) {
      const y = 1 - (i / (list.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), list[i]]);
    }
    return temp;
  }, [radius, skills]);

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
      if(groupRef.current) {
         // Slowly rotate the entire cloud
         groupRef.current.rotation.y += 0.001;
         groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, skill], index) => (
        <Word 
            key={index} 
            position={pos} 
            children={skill.name} 
            skill={skill}
            onHover={onSkillHover}
        />
      ))}
    </group>
  );
}

export default function SkillUniverse({ skills, onSkillHover }: SkillUniverseProps) {
  return (
    <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#050505', 0, 80]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Float floatIntensity={2} rotationIntensity={2} speed={2}>
            <Cloud radius={15} skills={skills} onSkillHover={onSkillHover} />
        </Float>
        
        <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
