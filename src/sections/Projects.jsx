import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const projects = [
  {
    num: '01',
    title: 'Tracer Code Copilot',
    desc: 'AI-powered code refactoring backend system with secure API endpoints, efficient data processing pipelines, and sub-100ms response times. Built comprehensive logging and monitoring for high availability.',
    tags: ['Node.js', 'AI/ML', 'REST APIs', 'Monitoring', 'Scalable Arch'],
    color: '#00f5c4',
    icon: '⚡',
  },
  {
    num: '02',
    title: 'Ring Atelier Payment System',
    desc: 'Secure, multi-method global payment system supporting credit/debit cards, wallet integrations, and third-party gateway fallback — cut cart abandonment by 25% and payment support tickets by 40%.',
    tags: ['Kafka', 'PostgreSQL', 'Payment Gateways', 'Fraud Detection', 'Compliance'],
    color: '#7b61ff',
    icon: '💎',
  },
  {
    num: '03',
    title: 'Research Collaboration Platform',
    desc: 'Semantic search platform at ASU using Pinecone vector DB and custom embeddings — context-aware recommendations across thousands of research records for 100+ concurrent users.',
    tags: ['Pinecone', 'TypeScript', 'React', 'AWS', 'Semantic Search'],
    color: '#ff6b6b',
    icon: '🔬',
  },
  {
    num: '04',
    title: 'Microservices Migration (2M Users)',
    desc: 'Led full AWS microservices migration reducing load times by 40% and boosting uptime. Implemented Docker CI/CD pipeline cutting deployment time by 30% across 10+ services.',
    tags: ['AWS', 'Docker', 'Microservices', 'CI/CD', 'Node.js'],
    color: '#f59e0b',
    icon: '🚀',
  },
];

function ProjectOrb({ color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
  });
  const c = new THREE.Color(color);
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial color={c} wireframe opacity={0.7} transparent />
    </mesh>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      className="glass-card"
      style={{
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        borderColor: hovered ? `${project.color}44` : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? `0 0 40px ${project.color}22` : 'none',
        transition: 'all 0.35s ease',
        cursor: 'default',
      }}
    >
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s' }}>
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} color={project.color} intensity={3} />
          <ProjectOrb color={project.color} />
        </Canvas>
      </div>

      <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: project.color, marginBottom: '0.8rem', letterSpacing: '0.2em' }}>
        {project.num}
      </div>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>{project.title}</h3>
      <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.75, marginBottom: '1.5rem' }}>{project.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map(t => (
          <span key={t} className="tag" style={{ borderColor: `${project.color}33`, color: project.color, background: `${project.color}10` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Glow border animation */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: 16,
          background: `radial-gradient(ellipse at top right, ${project.color}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  return (
    <section id="projects" style={{ padding: '3rem 8%' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="section-label">04 — Projects</p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '4rem' }}>
          Selected <span style={{ color: '#00f5c4' }}>Work</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
      </div>
    </section>
  );
}
