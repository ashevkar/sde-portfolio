import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./About.css";

function PhotoPlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/5",
        maxWidth: "380px",
          border: "1.5px solid var(--accent)",
          padding: "6px",
    borderRadius: "10px",
        background: "transparent",

      }}
    >
      {/* Main photo frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid var(--border-light)",
          borderRadius: "4px",
          background:
            "linear-gradient(135deg, #111110 0%, #1a1f10 50%, #0f1508 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* SVG avatar silhouette */}
        <svg
          width="180"
          height="220"
          viewBox="0 0 180 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.5 }}
        >
          <circle
            cx="90"
            cy="72"
            r="42"
            fill="#c8f542"
            fillOpacity="0.15"
            stroke="#c8f542"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <path
            d="M10 220 C10 155 170 155 170 220"
            fill="#c8f542"
            fillOpacity="0.1"
            stroke="#c8f542"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <circle cx="90" cy="72" r="28" fill="#c8f542" fillOpacity="0.2" />
        </svg>

        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.6rem",
            color: "var(--text-3)",
            letterSpacing: "0.15em",
            marginTop: "1rem",
          }}
        >
          ADD YOUR PHOTO
        </p>
        <motion.img
          src="/PP.jpeg" // put image in public folder
          alt="Profile"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
          }}
        />
        {/* Decorative corner marks */}
        {[
          [0, 0, "top left"],
          [100, 0, "top right"],
          [0, 100, "bottom left"],
          [100, 100, "bottom right"],
        ].map(([x, y, k]) => (
          <div
            key={k}
            style={{
              position: "absolute",
              [y === 0 ? "top" : "bottom"]: "12px",
              [x === 0 ? "left" : "right"]: "12px",
              width: "12px",
              height: "12px",
              borderTop: y === 0 ? "1px solid var(--accent)" : "none",
              borderBottom: y === 100 ? "1px solid var(--accent)" : "none",
              borderLeft: x === 0 ? "1px solid var(--accent)" : "none",
              borderRight: x === 100 ? "1px solid var(--accent)" : "none",
              opacity: 0.6,
            }}
          />
        ))}


        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />
      </motion.div>

      {/* Floating accent box */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: "absolute",
          bottom: "-1.5rem",
          right: "-1.5rem",
          background: "var(--accent)",
          color: "var(--bg)",
          padding: "1rem 1.2rem",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "1.4rem",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          3+
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.08em",
            marginTop: "4px",
          }}
        >
          years of
          <br />
          experience
        </div>
      </motion.div>
    </div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section" style={{ padding: "2rem 8%" }}>

      <div className="about-grid">
        {/* Photo */}
        <div className="about-photo-wrap">
          <PhotoPlaceholder />
        </div>

        {/* Text */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p variants={fadeUp} className="sec-label">
            <p className="section-label">02 — About</p>
          </motion.p>
          <motion.h2 variants={fadeUp} className="sec-title">
            <h2
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                marginBottom: "1rem",
              }}
            >
              Built, not <span style={{ color: "#00f5c4" }}>stumbled</span>
            </h2>
          </motion.h2>

          {/* <motion.p variants={fadeUp} style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.4rem' }}>
            I started writing code that nobody saw, debugging systems that nobody thanked me for fixing. Today I architect platforms that serve millions — where a 40% latency reduction isn't a number, it's thousands of people getting their answer faster.
          </motion.p> */}

          <motion.p
            variants={fadeUp}
            style={{
              color: "var(--text-2)",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            Give me a hard problem. I'll find the architecture, ship the
            solution, and document it well enough that the next engineer doesn't
            curse my name.
          </motion.p>

          <motion.div variants={fadeUp} className="about-quote-box">
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                color: "var(--text-2)",
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "var(--accent)" }}>Currently:</span>{" "}
              Software Developer at Arizona State University — building
              AI-powered research collaboration tools that connect researchers
              with funding opportunities.
            </p>
          </motion.div>

          {/* <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['TypeScript', 'React', 'Node.js', 'AWS', 'Pinecone', 'Docker', 'Python', 'PostgreSQL'].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </motion.div> */}

          <motion.div variants={fadeUp} className="about-contact-links">
            <a
              href="mailto:ashshevkar@gmail.com"
              className="about-link about-link-accent"
            >
              ashshevkar@gmail.com ↗
            </a>
            <a
              href="https://www.linkedin.com/in/aish06/"
              target="_blank"
              className="about-link about-link-secondary"
            >
              LinkedIn ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
