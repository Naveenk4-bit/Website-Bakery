"use client";

import { useState } from "react";

export default function MenuSection({ items, settings }) {
  const [activeCat, setActiveCat] = useState("all");

  const filteredItems = activeCat === "all" ? items : items.filter((i) => i.cat === activeCat);

  const getWaLink = (name, price) => {
    const n = settings?.wa?.replace(/\D/g, "") || "919876543210";
    const msg = settings?.msg || "Hi! I want to order from Golden Crumb Bakery 🧁";
    const fullMsg = encodeURIComponent(msg + "\n\n📦 Item: " + name + "\n💰 Price: ₹" + price);
    return `https://wa.me/${n}?text=${fullMsg}`;
  };

  return (
    <section className="menu-section" id="menu">
      <div className="section-header">
        <div className="section-label">Our Menu</div>
        <h2 className="section-title">Freshly Baked Favourites</h2>
        <p className="section-subtitle">Each item crafted with care, using time-honoured recipes</p>
      </div>

      <div className="categories">
        <button className={`cat-btn ${activeCat === "all" ? "active" : ""}`} onClick={() => setActiveCat("all")}>All Items</button>
        <button className={`cat-btn ${activeCat === "cakes" ? "active" : ""}`} onClick={() => setActiveCat("cakes")}>🎂 Cakes</button>
        <button className={`cat-btn ${activeCat === "breads" ? "active" : ""}`} onClick={() => setActiveCat("breads")}>🍞 Breads</button>
        <button className={`cat-btn ${activeCat === "pastries" ? "active" : ""}`} onClick={() => setActiveCat("pastries")}>🥐 Pastries</button>
        <button className={`cat-btn ${activeCat === "cookies" ? "active" : ""}`} onClick={() => setActiveCat("cookies")}>🍪 Cookies</button>
        <button className={`cat-btn ${activeCat === "beverages" ? "active" : ""}`} onClick={() => setActiveCat("beverages")}>☕ Beverages</button>
        <button className={`cat-btn ${activeCat === "snacks" ? "active" : ""}`} onClick={() => setActiveCat("snacks")}>🍟 Snacks</button>
      </div>

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-light)", padding: "60px 0", fontSize: "16px" }}>
            No items in this category yet.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div className="item-card" key={item.id}>
              <div
                className="item-img"
                style={{
                  background: item.image ? `url(${item.image}) center/cover no-repeat` : item.color,
                  fontSize: item.image ? '0' : undefined
                }}
              >
                {!item.image && item.emoji}
                {item.badge && <div className="item-badge">{item.badge}</div>}
              </div>
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.desc || ""}</div>
                <div className="item-footer">
                  <div className="item-price">
                    ₹{item.price} <span>/ piece</span>
                  </div>
                  <a className="wa-btn" href={getWaLink(item.name, item.price)} target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.855L.057 23.927a.5.5 0 0 0 .609.637l6.337-1.658A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.032-1.384l-.36-.214-3.733.977.999-3.645-.235-.374A9.786 9.786 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                    </svg>
                    Order
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
