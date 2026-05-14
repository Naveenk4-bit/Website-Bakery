"use client";

import Link from "next/link";

export default function Footer({ settings }) {
  const { name, phone, addr } = settings || {};
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo" style={{ fontWeight: 800 }}>
            {name || "Golden Crumb"}
          </div>
          <p>
            Handcrafted baked goods made with love, tradition, and the finest ingredients. Fresh from our oven to your table every single day.
          </p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="#home">Home</Link>
          <Link href="#menu">Our Menu</Link>
          <Link href="#about">Our Story</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p id="footer-addr">📍 {addr || "123 Bakery Lane, Krishnagiri"}</p>
          <p id="footer-phone">📞 {phone || "+91 98765 43210"}</p>
          <p>🕗 Open: 7 AM – 9 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p id="footer-brand-name">© {new Date().getFullYear()} {name || "Golden Crumb Bakery"}. Made with 🧡</p>
        <p style={{ fontSize: "12px" }}>Order easily via WhatsApp →</p>
      </div>
    </footer>
  );
}
