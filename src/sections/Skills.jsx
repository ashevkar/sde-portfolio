import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillGroups = [
  {
    label: 'Frontend',
    color: '#00f5c4',
    skills: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'HTML5/CSS3', 'Material UI', 'Responsive Design'],
  },
  {
    label: 'Backend',
    color: '#7b61ff',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Spring Boot', 'Serverless', 'GraphQL'],
  },
  {
    label: 'Cloud & DevOps',
    color: '#ff6b6b',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'AWS Lambda', 'CloudFormation'],
  },
  {
    label: 'Databases',
    color: '#f59e0b',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle', 'Pinecone', 'Elasticsearch'],
  },
  {
    label: 'AI / ML',
    color: '#06b6d4',
    skills: ['OpenAI API', 'LLMs', 'TensorFlow', 'Prompt Engineering', 'NLP', 'Computer Vision', 'Pinecone'],
  },
  {
    label: 'Languages',
    color: '#a78bfa',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL'],
  },
];

const certs = [
  'Hash Code 2022',
  'Kickstart 2021',
  'Oracle Cloud Foundations',
  'Salesforce AI Associate',
  'Salesforce AI Specialist',
];

function SkillGroup({ group, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="glass-card"
      style={{ padding: '1.6rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
        <span style={{ fontFamily: 'DM Mono', fontSize: '0.72rem', color: group.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {group.label}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {group.skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.08 + i * 0.04, duration: 0.3 }}
            whileHover={{ scale: 1.08, borderColor: group.color, color: group.color }}
            style={{
              fontFamily: 'DM Mono', fontSize: '0.72rem',
              padding: '5px 12px', borderRadius: '5px',
              background: `${group.color}0a`,
              border: `1px solid ${group.color}25`,
              color: '#e8eaf6', cursor: 'default',
              transition: 'all 0.2s ease',
            }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const certRef = useRef();
  const certInView = useInView(certRef, { once: true });

  return (
    <section id="skills" style={{ padding: '3rem 8%' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="section-label">04 — Skills</p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '4rem' }}>
          Tech <span style={{ color: '#00f5c4' }}>Arsenal</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem', marginBottom: '4rem' }}>
        {skillGroups.map((g, i) => <SkillGroup key={g.label} group={g} index={i} />)}
      </div>

      {/* Certifications */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, y: 30 }}
        animate={certInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: 'DM Mono', fontSize: '0.72rem', color: '#00f5c4', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Certifications & Achievements
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {certs.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: -20 }}
              animate={certInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card"
              style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span style={{ color: '#00f5c4', fontSize: '0.7rem' }}>✦</span>
              <span style={{ fontFamily: 'DM Mono', fontSize: '0.75rem', color: '#e8eaf6' }}>{c}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
