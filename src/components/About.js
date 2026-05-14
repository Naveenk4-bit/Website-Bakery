import { useState, useEffect, useRef } from "react";

function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={elementRef}>{count}{target.includes('+') ? '+' : ''}</span>;
}

export default function About({ settings }) {
  const aboutText = settings?.about || "Golden Crumb began in a small home kitchen where every morning was blessed with the scent of fresh bread and warm chai. We've carried that spirit forward — baking not just treats, but memories.\n\nEvery recipe is tested by tradition, every ingredient sourced with care. We believe in slow-baked goodness that nourishes body and soul.";
  const paragraphs = aboutText.split('\n').filter(p => p.trim() !== '');

  return (
    <section className="about-section" id="about">
      <div className="about-visual" style={settings?.aboutImage ? { background: `url(${settings.aboutImage}) center/cover no-repeat`, border: 'none' } : {}}>
        {!settings?.aboutImage && <span className="about-emoji-big">👩‍🍳</span>}
        <div className="about-card-float">
          <p>Trusted by families since</p>
          <strong>{settings?.aboutYear || "1995 · 28 Years"}</strong>
        </div>
      </div>
      <div className="about">
        <div className="about-label">Our Story</div>
        <h2>Born from a Grandmother's Kitchen</h2>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="stats">
          <div>
            <div className="stat-num"><Counter target="28+" /></div>
            <div className="stat-label">Years of Baking</div>
          </div>
          <div>
            <div className="stat-num"><Counter target="150+" /></div>
            <div className="stat-label">Orders Daily</div>
          </div>
          <div>
            <div className="stat-num"><Counter target="40+" /></div>
            <div className="stat-label">Menu Items</div>
          </div>
        </div>
      </div>
    </section>
  );
}
