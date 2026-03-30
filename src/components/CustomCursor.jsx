import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [data-hover]');
    const grow = () => ringRef.current?.classList.add('big');
    const shrink = () => ringRef.current?.classList.remove('big');
    links.forEach(l => { l.addEventListener('mouseenter', grow); l.addEventListener('mouseleave', shrink); });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s;
        }
        .cursor-ring {
          width: 32px; height: 32px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-ring.big {
          width: 52px; height: 52px;
          border-color: rgba(0,245,196,0.9);
        }
        @media (max-width: 768px) { .cursor-dot, .cursor-ring { display: none; } }
      `}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
