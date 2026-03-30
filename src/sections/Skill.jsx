import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const bars = [
  { label: "React / Next.js / TypeScript", pct: 95 },
  { label: "Node.js / Express / REST APIs", pct: 93 },
  { label: "AWS / Cloud Architecture", pct: 88 },
  { label: "Docker / Kubernetes / CI/CD", pct: 85 },
  { label: "PostgreSQL / MongoDB / Databases", pct: 87 },
  { label: "AI / ML / LLMs / Pinecone", pct: 80 },
  { label: "Python / TensorFlow / NLP", pct: 75 },
  { label: "System Design / Microservices", pct: 90 },
];

const tagGroups = [
  {
    cat: "Frontend",
        color: 'var(--accent)',

    tags: [
      "React",
      "Next.js",
      "Redux",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Material UI",
    ],
  },
  {
    cat: "Backend",
        color: '#7b61ff',

    tags: ["Node.js", "Express.js", "Spring Boot", "Serverless", "GraphQL"],
  },
  {
    cat: "Cloud & DevOps",
        color: '#ff6b6b',

    tags: [
      "AWS Lambda",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "CloudFormation",
      "Vercel",
    ],
  },
  {
    cat: "Databases",
        color: '#f59e0b',

    tags: ["PostgreSQL", "MongoDB", "MySQL", "Pinecone", "Elasticsearch"],
  },
  {
    cat: "AI / ML",
        color: '#06b6d4',

    tags: [
      "OpenAI API",
      "TensorFlow",
      "Prompt Engineering",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    cat: "Languages",
        color: '#a78bfa',

    tags: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL"],
  },
];




function SkillBar({ item, index, trigger }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => setWidth(item.pct), index * 80 + 100);
      return () => clearTimeout(timer);
    }
  }, [trigger, index, item.pct]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="skills-bar-row"
    >
      <div className="skills-bar-label-row">
        <span
          className="skills-bar-label"
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            lineHeight: 1.7,
            display: "flex",
            gap: "8px",
          }}
        >
          {item.label}
        </span>
        <span
          className="skills-bar-value"
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            lineHeight: 1.7,
            display: "flex",
            gap: "8px",
          }}
        >
          {item.pct}%
        </span>
      </div>
      {/* Track */}
      <div className="skills-bar-track">
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background:
              "linear-gradient(90deg, var(--accent) 0%, rgba(207, 255, 64, 0.89) 100%)",
            borderRadius: "2px",
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 0 8px rgba(200,245,66,0.4)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const tagRef = useRef();
  const tagInView = useInView(tagRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" style={{ padding: "8rem 8%" }}>
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          max-width: 1100px;
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .skills-section-bars {}
        .skills-section-tags {}
        .skills-bar-row {
          margin-bottom: 1.1rem;
        }
        .skills-bar-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 7px;
        }
        .skills-bar-label {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--text-2);
          letter-spacing: 0.03em;
        }
        .skills-bar-value {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--accent);
          font-weight: 600;
        }
        .skills-bar-track {
          height: 3px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        .skills-tags-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .skills-tags-category {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skills-certs {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .skills-cert-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">05 — Skills</p>

        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '4rem' }}>
          Tech <span style={{ color: 'var(--accent)' }}>Arsenal</span>
        </h2>
      </motion.div>

      <div className="skills-grid">
        {/* Skill bars */}
        <div ref={ref}>
          <p
            style={{
              fontFamily: "var(--DM Mono)",
              fontSize: "0.8em",
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Proficiency
          </p>
          {bars.map((item, i) => (
            <SkillBar key={i} item={item} index={i} trigger={inView} />
          ))}
        </div>

        {/* Tag grid */}
        <div ref={tagRef}>
          <p
            style={{
              fontFamily: "var(--DM Mono)",
              fontSize: "0.8em",
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Technologies
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {tagGroups.map(({ cat, tags }, gi) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={tagInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: gi * 0.1, duration: 0.5 }}
              >
                <p
                  style={{
                    fontFamily: "var(--DM Mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                    marginBottom: "0.6rem",
                  }}
                >
                  {cat}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tags.map((t) => (
                    <motion.span
                      key={t}
                  
                      whileHover={{
                        borderColor: t.color,
                        color: "var(--accent)",
                        background: "var(--glass)",
                      }}
                      style={{
                        cursor: "default",
                        transition: "all 0.2s",
                        fontFamily: "DM Mono",
                        fontSize: "0.72rem",
                        padding: "5px 12px",
                        borderRadius: "5px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border)",
                        color: "#e8eaf6",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
