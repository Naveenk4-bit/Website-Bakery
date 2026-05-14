"use client";

export default function Hero({ settings }) {
  return (
    <section className="hero" id="home">
      <div className="particles">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
        <div className="particle p5"></div>
        <div className="particle p6"></div>
        <div className="particle p7"></div>
        <div className="particle p8"></div>
        <div className="particle p9"></div>
        <div className="particle p10"></div>
        <div className="particle p11"></div>
        <div className="particle p12"></div>
        <div className="particle p13"></div>
        <div className="particle p14"></div>
        <div className="particle p15"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">🌾 Baked Fresh Every Morning</div>
        <h1>
          Handcrafted with <em>Love &amp; Flour</em>
        </h1>
        <p>
          Every bite tells a story of tradition, passion, and the finest ingredients.
          From our warm oven to your heart — pure joy in every crumb.
        </p>
        <div className="hero-actions">
          <a href="#menu" className="btn-primary">
            Explore Menu
          </a>
          <a href="#about" className="btn-outline">
            Our Story
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div style={{ position: "relative", width: "420px" }}>
          {settings?.heroImage ? (
            <img src={settings.heroImage} alt="Hero Visual" style={{ width: "420px", height: "420px", objectFit: "cover", borderRadius: "50%", boxShadow: "0 40px 100px rgba(139,69,19,0.22)", animation: "float 5s ease-in-out infinite" }} />
          ) : (
            <div className="hero-circle">🎂</div>
          )}
          <div className="floating-tags">
            <div className="ftag ftag-1">⭐ 4.9 Rating</div>
            <div className="ftag ftag-2">🕐 Daily Fresh</div>
            <div className="ftag ftag-3">🌿 All Natural</div>
          </div>
        </div>
      </div>
    </section>
  );
}
