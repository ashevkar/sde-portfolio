import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const projects = [
  {
    title: "Tracer Code Copilot",
    desc: "AI-powered code refactoring backend system with secure API endpoints, efficient data processing pipelines, and sub-100ms response times. Built comprehensive logging and monitoring for high availability.",
    link: "#",
    category: "React",
    tags: ["Node.js", "AI/ML", "REST APIs", "Monitoring", "Scalable Arch"],
    color: "var(--accent)",
    icon: "⚡",
  },
  {
    title: "Ring Atelier Payment System",
    desc: "Secure, multi-method global payment system supporting credit/debit cards, wallet integrations, and third-party gateway fallback — cut cart abandonment by 25% and payment support tickets by 40%.",
    link: "#",
    category: "TypeScript",
    tags: [
      "Kafka",
      "PostgreSQL",
      "Payment Gateways",
      "Fraud Detection",
      "Compliance",
    ],
    color: "#7b61ff",
    icon: "💎",
  },

  {
    title: "Orkut Social App",
    desc: "Full-stack social platform inspired by Orkut built with Next.js App Router. Features user authentication via NextAuth.js, tweet/post creation, likes, comments, follow functionality, and profile management with PostgreSQL + Prisma ORM.",
    link: "https://github.com/ashevkar/social-app",
    category: "Next.js",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind",
      "PostgreSQL",
      "Prisma",
      "Authentication",
    ],
    color: "#3b82f6",
    icon: "👥",
  },
  {
    title: "AI-Powered Food Inventory Tracker",
    desc: "Intelligent pantry management system with real-time inventory tracking, AI image recognition for adding items, and smart recipe suggestions powered by OpenAI. Built with Next.js, Firebase, and Material-UI for seamless dark mode.",
    link: "https://github.com/ashevkar/inventory-tracker",
    category: "Next.js",
    tags: [
      "Next.js",
      "React",
      "AI/ML",
      "Firebase",
      "OpenAI",
      "Image Recognition",
    ],
    color: "#ef4444",
    icon: "🍎",
  },
  {
    title: "Modern Frontend Portfolio",
    desc: "Responsive React portfolio using Vite, Framer Motion, and three.js background effects. Includes theme switcher and smooth section scroll experience.",
    link: "#",
    category: "React",
    tags: ["React", "Vite", "Framer Motion", "CSS", "UI/UX"],
    color: "#22d3ee",
    icon: "🎨",
  },
  {
    title: "Retail E-Commerce Platform",
    desc: "Feature-rich e-commerce platform with dynamic product listings, advanced search/filtering, and integrated AI-powered chatbot for customer support. Deployed via GitHub Actions with automated CI/CD to Azure.",
    link: "https://github.com/ashevkar/ai-retail-experience",
    category: "React",
    tags: ["React", "Tailwind", "Redux", "AI/ML", "Azure", "GitHub Actions"],
    color: "#8b5cf6",
    icon: "🛍️",
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        borderColor: hovered ? `${project.color}44` : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? `0 0 40px ${project.color}22` : "none",
        transition: "all 0.35s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      >
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight
            position={[2, 2, 2]}
            color={project.color}
            intensity={3}
          />
          <ProjectOrb color={project.color} />
        </Canvas>
      </div>

      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        {project.icon}
      </div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
        {project.title}
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#9ca3af",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
        }}
      >
        {project.desc}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "1.5rem",
        }}
      >
        {project.tags.map((t) => (
          <span
            key={t}
            className="tag"
            style={{
              borderColor: `${project.color}33`,
              color: project.color,
              background: `${project.color}10`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <button
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: `1px solid ${project.color}`,
            background: `${project.color}15`,
            color: project.color,
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `${project.color}30`;
            e.target.style.boxShadow = `0 0 20px ${project.color}40`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `${project.color}15`;
            e.target.style.boxShadow = "none";
          }}
        >
          Visit Project →
        </button>
      </a>

      {/* Glow border animation */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: `radial-gradient(ellipse at top right, ${project.color}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState("React");

  const categories = [
    "All",
    "React",
    "Next.js",
    "TypeScript",
    "CSS",
    "AWS",
    "AI/ML",
    "Animation",
    "Three.js",
  ];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedCategory));

  return (
    <section id="projects" style={{ padding: "3rem 8%" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">04 — Projects</p>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            marginBottom: "4rem",
          }}
        >
          Selected <span style={{ color: "var(--accent)" }}>Work</span>
        </h2>
      </motion.div>

      <div
        style={{
          marginBottom: "1.7rem",
          display: "flex",
          gap: "0.65rem",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              cursor: "pointer",
              border: "1px solid #fff3",
              borderRadius: "999px",
              padding: "0.6rem 1rem",
              fontSize: "0.85rem",
              color: selectedCategory === cat ? "white" : "#d1d5db",
              background:
                selectedCategory === cat
                  ? "rgba(59, 130, 246, 0.25)"
                  : "rgba(255,255,255,0.04)",
              transition: "all 0.2s ease",
              fontWeight: selectedCategory === cat ? 700 : 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {filteredProjects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
