"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Strip from "../components/Strip";
import MenuSection from "../components/MenuSection";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { fetchMenuItems, fetchSettings } from "../lib/db";

const MOCK_ITEMS = [
  {id:1,name:'Chocolate Truffle Cake',cat:'cakes',price:650,desc:'Rich dark chocolate layers with silky ganache and dreamy truffle filling.',emoji:'🎂',badge:'Best Seller',color:'#FFF5E6'},
  {id:2,name:'Sourdough Loaf',cat:'breads',price:180,desc:'Slow-fermented wild yeast bread. Crispy crust, airy chewy crumb.',emoji:'🍞',badge:'',color:'#FDECD5'},
  {id:3,name:'Butter Croissant',cat:'pastries',price:80,desc:'Flaky golden layers of buttery laminated pastry. Served warm.',emoji:'🥐',badge:'Fresh Today',color:'#FFF5E6'},
  {id:4,name:'Choco Chip Cookies',cat:'cookies',price:120,desc:'Classic cookies loaded with premium chocolate chips. Pack of 6.',emoji:'🍪',badge:'',color:'#FFE8F0'},
  {id:5,name:'Filter Coffee',cat:'beverages',price:60,desc:'South Indian style filter coffee, freshly brewed and aromatic.',emoji:'☕',badge:'',color:'#E6F5FF'},
  {id:6,name:'Red Velvet Cake',cat:'cakes',price:720,desc:'Velvety red layers with luscious cream cheese frosting.',emoji:'🍰',badge:'New!',color:'#FFE8F0'},
  {id:7,name:'Multigrain Bread',cat:'breads',price:160,desc:'Wholesome blend of seeds and grains. Perfect for sandwiches.',emoji:'🥖',badge:'Healthy',color:'#E8FFE8'},
  {id:8,name:'Mango Pastry',cat:'pastries',price:95,desc:'Light chiffon base with fresh mango cream and fruit topping.',emoji:'🍮',badge:'',color:'#FFF9E6'},
];

const MOCK_SETTINGS = {
  wa:'919876543210',
  msg:'Hi! I want to order from Golden Crumb Bakery 🧁',
  name:'Golden Crumb Bakery',
  phone:'+91 98765 43210',
  addr:'123 Bakery Lane, Krishnagiri, Tamil Nadu'
};

export default function Home() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const dbItems = await fetchMenuItems();
      const dbSettings = await fetchSettings();
      
      setItems(dbItems && dbItems.length > 0 ? dbItems : MOCK_ITEMS);
      setSettings(dbSettings || MOCK_SETTINGS);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleOpenAdmin = () => {
    // In step 4, we will navigate to the /admin route
    window.location.href = "/admin";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ fontSize: "48px", animation: "bounce 1s infinite ease-in-out" }}>🧁</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "var(--espresso)", fontWeight: 600 }}>Warming up the ovens...</div>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`}</style>
      </div>
    );
  }

  return (
    <main>
      <Navbar onOpenAdmin={handleOpenAdmin} settings={settings} />
      <Hero settings={settings} />
      <Strip />
      <MenuSection items={items} settings={settings} />
      <Testimonials />
      <About settings={settings} />
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </main>
  );
}
