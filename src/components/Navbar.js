"use client";

import Link from "next/link";

export default function Navbar({ onOpenAdmin, settings }) {
  return (
    <nav>
      <div className="logo" id="logo-el" style={{ fontWeight: 800 }}>
        {settings?.name || "Golden Crumb"}
      </div>
      <ul>
        <li>
          <Link href="#home">Home</Link>
        </li>
        <li>
          <Link href="#menu">Menu</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>
      <button className="admin-btn" onClick={onOpenAdmin}>
        🔐 Admin Portal
      </button>
    </nav>
  );
}
