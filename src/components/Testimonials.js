export default function Testimonials() {
  return (
    <section className="testi-section">
      <div className="section-header">
        <div className="section-label">Happy Customers</div>
        <h2 className="section-title">What People Say</h2>
      </div>
      <div className="testi-grid">
        <div className="testi-card">
          <div className="testi-stars">⭐⭐⭐⭐⭐</div>
          <p className="testi-text">
            "The chocolate truffle cake was absolutely divine. My family couldn't believe it was from a local bakery — it tasted like something from a five-star hotel!"
          </p>
          <div className="testi-author">
            <div className="testi-avatar">👩</div>
            <div>
              <div className="testi-name">Priya Sharma</div>
              <div className="testi-loc">Krishnagiri</div>
            </div>
          </div>
        </div>
        <div className="testi-card">
          <div className="testi-stars">⭐⭐⭐⭐⭐</div>
          <p className="testi-text">
            "Ordered for my daughter's birthday via WhatsApp — so easy! The cake was delivered on time and looked exactly as expected. Highly recommend!"
          </p>
          <div className="testi-author">
            <div className="testi-avatar">👨</div>
            <div>
              <div className="testi-name">Rajan Kumar</div>
              <div className="testi-loc">Hosur</div>
            </div>
          </div>
        </div>
        <div className="testi-card">
          <div className="testi-stars">⭐⭐⭐⭐⭐</div>
          <p className="testi-text">
            "The sourdough bread is incredible! I pick it up every Saturday morning. The crust, the flavour — nothing compares. This is our family's bakery now."
          </p>
          <div className="testi-author">
            <div className="testi-avatar">👩</div>
            <div>
              <div className="testi-name">Meena Nair</div>
              <div className="testi-loc">Salem</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
