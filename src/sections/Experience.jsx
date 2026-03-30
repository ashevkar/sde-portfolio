import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const timelineData = [
  {
    year: "Aug 2025 - Present",
    title: "Software Developer",
    company: "Arizona State University",
    location: "Tempe, AZ",
  },
  {
    year: "Aug 2023 -May 2025",
    title: "Master of Science - Information Technology",
    company: "Illinois Institute of Technology",
    location: "Chicago, IL",
  },
  {
    year: "Mar 2022 - Jun 2023",
    title: "Software Developer",
    company: "Anikaay Integration",
    location: "Pune, India",
  },
  {
    year: "Aug 2020 - Mar 2022",
    title: "Software Developer",
    company: "GlobalStep",
    location: "Pune, India",
  },

  {
    year: "Aug 2016 - Jun 2020",
    title: "Bachelor of Engineering - Information Technology",
    company: "University of Pune",
    location: "Pune, India",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const inView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); // now syncs with scroll

  return (
    <section id="experience" style={{ padding: "3rem 8%" }}>
      <style>{`
        .timeline-wrapper {
          background: radial-gradient(circle at top, #0f172a, #021709);
          min-height: 100vh;
          padding: 60px 20px;
          color: white;
          font-family: sans-serif;
        }
        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0;
        }
        .timeline-line {
          position: absolute;
          left: 20px;
          top: 0;
          width: 3px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
        }
        .timeline-line-progress {
          width: 2px;
          background: linear-gradient(to bottom, var(--accent), var(--second));
          box-shadow: 0 0 10px var(--accent);
        }
        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }
        .timeline-item {
          position: relative;
          padding-left: 60px;
        }
        .timeline-dot {
          position: absolute;
          left: 17px;
          top: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent2);
        }
        .timeline-year {
          color: var(--accent);
          font-size: 16px;
          margin-bottom: 6px;
        }
        .timeline-title {
          font-size: 20px;
          font-weight: 600;
        }
        .timeline-company {
          color: var(--text-muted);
        }
        .timeline-location {
          color: #94a3b8;
          font-size: 14px;
        }
      `}</style>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">03 — Education and Experience</p>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            marginBottom: "4rem",
          }}
        >
          The journey
          <span style={{ color: "var(--accent)" }}>
            <br />
            so far.
          </span>
        </h2>
      </motion.div>

      <div ref={containerRef} className="timeline-container">
        <div className="timeline-line">
          <motion.div
            style={{ height: lineHeight }}
            className="timeline-line-progress"
          />
        </div>

        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="timeline-item"
    >
      <div className="timeline-dot" />

      <p className="timeline-year">{item.year}</p>
      <h3 className="timeline-title">{item.title}</h3>
      <p className="timeline-company">{item.company}</p>
      <p className="timeline-location">{item.location}</p>
    </motion.div>
  );
}

/* ===== CSS (timeline.css) ===== */
