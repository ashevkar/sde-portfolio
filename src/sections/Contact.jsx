import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
} from "framer-motion";

export default function LetsConnect() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 80, skewY: 4 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="contact" style={{ padding: "3rem 8%" }}>
      <div
        style={{
          minHeight: "100vh",
          // backgroundColor: "#080c14",
          color: "#fff",
          fontFamily: "'Space Mono', 'Courier New', monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "60px 20px 40px",
        }}
      >
        {/* Google Fonts */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Barlow:wght@900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .connect-card {
          background: rgba(44, 44, 44, 0.04);
          border: 1px solid rgba(170, 170, 170, 0.15);
          border-radius: 12px;
          padding: 32px 48px;
          width: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, transform 0.2s;
          position: relative;
          overflow: hidden;
          text-decoration:none;
        }

        .connect-card:hover {
          background: rgba(63, 63, 63, 0.06);
          border-color: var(--accent);
        }

        .connect-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(50, 50, 50, 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .connect-card:hover::before {
          opacity: 1;
        }

        .card-label-linkedin {
          color: var(--accent);
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-decoration: none;

        }

        .card-label-email {
          color: #8899aa;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.12em;
        }

        .connect-card:hover .card-label-email {
          color: #aabbcc;
        }

        .headline-line {
          display: block;
          overflow: hidden;
        }
      `}</style>

        {/* Radial glow top-center */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            pointerEvents: "none",
          }}
        />

        {/* Bottom vignette */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            pointerEvents: "none",
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            cursor: "pointer",
          }}
        />
      
        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Section label */}
          <motion.div
            variants={fadeUp}
            style={{ marginBottom: 24, position: "relative" }}
          >
            <span
              className = "section-label"
            >
              06. LET'S CONNECT
            </span>
          </motion.div>

          {/* Massive headline */}
          <div
            style={{ textAlign: "center", marginBottom: 48, lineHeight: 0.88 }}
          >
            <span className="headline-line">
              <motion.span
                variants={headlineVariants}
                style={{
                  display: "inline-block",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(52px, 10vw, 120px)",
                  color: "#f0f4f8",
                  letterSpacing: "-0.02em",
                }}
                
              >
           
                Let's build
              </motion.span>
            </span>
            <br />
            <span className="headline-line">
              <motion.span
                variants={headlineVariants}
                style={{
                  display: "inline-block",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 100,
                  fontSize: "clamp(52px, 10vw, 120px)",
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                }}
              >
                something.
              </motion.span>
            </span>
          </div>

          {/* Subtext */}
          <motion.div
            variants={fadeUp}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(13px, 1.5vw, 17px)",
                color: "#c0d0dd",
                lineHeight: 1.8,
                maxWidth: 600,
                letterSpacing: "0.01em",
              }}
            >
              Open to collaborations, research roles, and opportunities in AI,
              <br />
              computer vision, and critical infrastructure.
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(12px, 1.3vw, 15px)",
                color: "var(--accent)",
                marginTop: 12,
                letterSpacing: "0.01em",
              }}
            >
              Reach out — I'd love to hear from you.
            </p>
          </motion.div>

          {/* CTA Cards */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 80,
            }}
          >
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/aish06/"
              target="_blank"
              className="connect-card"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHoveredCard("linkedin")}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* LinkedIn Icon */}
              <motion.svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                animate={{
                  color: hoveredCard === "linkedin" ? "var(--accent)" : "#00e5ff",
                }}
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="4"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 10v7M7 7v.5"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 17v-4c0-1.105.895-2 2-2s2 .895 2 2v4"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 10v7"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </motion.svg>
              <span className="card-label-linkedin">Message on LinkedIn</span>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:ashshevkar@gmail.com"
              className="connect-card"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHoveredCard("email")}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Email Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke={hoveredCard === "email" ? "#aabbcc" : "#556677"}
                  strokeWidth="1.5"
                  style={{ transition: "stroke 0.3s" }}
                />
                <path
                  d="M3 8l9 6 9-6"
                  stroke={hoveredCard === "email" ? "#aabbcc" : "#556677"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s" }}
                />
              </svg>
              <span className="card-label-email">Send an Email</span>
            </motion.a>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "12px",
              color: "#334455",
              letterSpacing: "0.1em",
            }}
          >
            Aishwarya Shevkar © 2025
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
