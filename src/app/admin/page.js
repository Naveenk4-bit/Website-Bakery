"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db, isValidConfig } from "../../lib/firebase";
import { fetchMenuItems, fetchSettings } from "../../lib/db";
import Link from "next/link";

const EMOJIS = ['🎂','🍰','🧁','🍩','🍮','🥮','🍡','🍞','🥐','🥖','🫓','🥨','🍪','🍫','🍬','🍭','☕','🧋','🥛','🍵','🧇','🥧','🫖','🍱'];
const COLORS = ['#FFF5E6','#FFE8F0','#E6F5FF','#E8FFE8','#FFF0E8','#F0E8FF','#FDECD5','#E8F8F5','#FFF9E6','#F5E8E8'];

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({ wa: "", msg: "", name: "", phone: "", addr: "", about: "", aboutImage: "", aboutYear: "", heroImage: "" });
  const [toastMsg, setToastMsg] = useState("");

  // Form states
  const [form, setForm] = useState({ id: "", name: "", cat: "cakes", price: "", badge: "", desc: "", emoji: "🎂", color: "#FFF5E6", image: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isValidConfig) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadData();
      }
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    const dbItems = await fetchMenuItems();
    const dbSettings = await fetchSettings();
    if (dbItems) setItems(dbItems);
    if (dbSettings) setSettings(dbSettings);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidConfig) {
      setError("Firebase is not configured yet. See .env.local");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError("Incorrect email or password.");
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth);
  };

  const handleSaveItem = async () => {
    if (!form.name || !form.price) {
      showToast("Please fill in Name and Price");
      return;
    }
    if (!isValidConfig) {
      showToast("Firebase not configured!");
      return;
    }
    try {
      const itemId = form.id || Date.now().toString();
      await setDoc(doc(db, "menu_items", itemId), {
        name: form.name,
        cat: form.cat,
        price: Number(form.price),
        badge: form.badge,
        desc: form.desc,
        emoji: form.emoji,
        color: form.color,
        image: form.image || ""
      });
      showToast("✅ Item saved successfully!");
      setForm({ id: "", name: "", cat: "cakes", price: "", badge: "", desc: "", emoji: "🎂", color: "#FFF5E6", image: "" });
      setActiveTab("items");
      loadData();
    } catch (err) {
      showToast("❌ Error saving item.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || cloudName === "your-cloud-name") {
      showToast("Please configure Cloudinary in .env.local first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm({ ...form, image: data.secure_url });
        showToast("📸 Image uploaded!");
      } else {
        showToast("❌ Error uploading image.");
      }
    } catch (err) {
      showToast("❌ Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSettingsImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || cloudName === "your-cloud-name") {
      showToast("Please configure Cloudinary in .env.local first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setSettings({ ...settings, aboutImage: data.secure_url });
        showToast("📸 About image uploaded!");
      } else {
        showToast("❌ Error uploading image.");
      }
    } catch (err) {
      showToast("❌ Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || cloudName === "your-cloud-name") {
      showToast("Please configure Cloudinary in .env.local first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST", body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setSettings({ ...settings, heroImage: data.secure_url });
        showToast("📸 Hero image uploaded!");
      } else {
        showToast("❌ Error uploading image.");
      }
    } catch (err) {
      showToast("❌ Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditItem = (item) => {
    setForm({ ...item, id: item.id, price: item.price.toString() });
    setActiveTab("add");
  };

  const handleDeleteItem = async (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "menu_items", id));
      showToast("🗑 Item deleted");
      loadData();
    } catch (err) {
      showToast("❌ Error deleting item.");
    }
  };

  const handleSaveSettings = async (type) => {
    if (!isValidConfig) {
      showToast("Firebase not configured!");
      return;
    }
    try {
      await setDoc(doc(db, "config", "settings"), settings, { merge: true });
      showToast(type === "wa" ? "📱 WhatsApp settings saved!" : "🏪 Bakery info updated!");
    } catch (err) {
      showToast("❌ Error saving settings.");
    }
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

  if (!user && isValidConfig) {
    return (
      <div id="login-screen" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1E0F08 0%, #3D1C0A 60%, #5C2A10 100%)" }}>
        <div className="login-card">
          <span className="login-icon">🔐</span>
          <h2>Admin Portal</h2>
          <p>Sign in to manage your bakery website</p>
          <form onSubmit={handleLogin}>
            <input type="email" className="login-input" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <input type={showPassword ? "text" : "password"} className="login-input" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ marginBottom: 0, paddingRight: "40px" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", opacity: 0.7 }}>
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            <button type="submit" className="login-btn">Sign In</button>
          </form>
          {error && <div className="login-error" style={{ display: "block", color: "#C0392B", marginTop: "14px" }}>❌ {error}</div>}
          <div style={{ marginTop: "20px" }}>
             <Link href="/" style={{ color: "#aaa", fontSize: "13px", textDecoration: "none" }}>← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidConfig) {
    return (
      <div id="login-screen" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", color: "var(--espresso)" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "16px", maxWidth: "500px", textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginBottom: "20px", fontFamily: "'Playfair Display', serif", fontSize: "32px" }}>Database Not Configured</h2>
          <p style={{ lineHeight: "1.6", marginBottom: "30px", color: "var(--text-mid)" }}>
            Please add your Firebase configuration to the <strong>.env.local</strong> file to enable the Admin Portal. The dashboard requires a secure database to function.
          </p>
          <Link href="/" className="btn-primary" style={{ display: "inline-block" }}>Return to Website</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", paddingBottom: "100px" }}>
      <div className="admin-header">
        <div className="admin-logo">🧁 {settings?.name || "Golden Crumb"} — Admin</div>
        <div className="admin-nav">
          <Link href="/"><button className="aclose" style={{ marginRight: "10px" }}>🌐 View Site</button></Link>
          <button className="aclose" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      <div className="admin-body">
        <div className="atabs">
          <button className={`atab ${activeTab === "items" ? "active" : ""}`} onClick={() => setActiveTab("items")}>📋 All Items</button>
          <button className={`atab ${activeTab === "add" ? "active" : ""}`} onClick={() => { setForm({ id: "", name: "", cat: "cakes", price: "", badge: "", desc: "", emoji: "🎂", color: "#FFF5E6", image: "" }); setActiveTab("add"); }}>➕ Add Item</button>
          <button className={`atab ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>⚙️ Settings</button>
        </div>

        {activeTab === "items" && (
          <div className="apanel active">
            <div className="fcard">
              <h3>Menu Items <span style={{ fontSize: "16px", color: "var(--text-light)", fontWeight: 400 }}>({items.length} items)</span></h3>
              <div className="alist">
                {items.length === 0 ? (
                  <p style={{ color: "var(--text-light)", padding: "20px 0" }}>No items yet. Go to "Add Item" to create your first menu item.</p>
                ) : (
                  items.map(item => (
                    <div className="aitem" key={item.id}>
                      <div className="aitem-emoji" style={{ backgroundImage: item.image ? `url(${item.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: item.image ? '0' : '32px' }}>
                        {item.emoji}
                      </div>
                      <div className="aitem-info">
                        <div className="aitem-name">{item.name}</div>
                        <div className="aitem-meta">{item.cat} {item.badge ? `· ${item.badge}` : ""}</div>
                      </div>
                      <div className="aitem-price">₹{item.price}</div>
                      <div className="aitem-actions">
                        <button className="ebtn" onClick={() => handleEditItem(item)}>✏️ Edit</button>
                        <button className="dbtn" onClick={() => handleDeleteItem(item.id)}>🗑 Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="apanel active">
            <div className="fcard">
              <h3>{form.id ? "Edit Item" : "Add New Item"}</h3>
              <div className="fgrid">
                <div className="fg">
                  <label>Item Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Chocolate Truffle Cake" />
                </div>
                <div className="fg">
                  <label>Category *</label>
                  <select value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })}>
                    <option value="cakes">🎂 Cakes</option>
                    <option value="breads">🍞 Breads</option>
                    <option value="pastries">🥐 Pastries</option>
                    <option value="cookies">🍪 Cookies</option>
                    <option value="beverages">☕ Beverages</option>
                    <option value="snacks">🍟 Snacks</option>
                  </select>
                </div>
                <div className="fg">
                  <label>Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="e.g. 350" min="0" />
                </div>
                <div className="fg">
                  <label>Badge (optional)</label>
                  <input type="text" value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} placeholder="Best Seller, New!, etc." />
                </div>
                <div className="fg full">
                  <label>Short Description</label>
                  <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Describe the item in a few words..."></textarea>
                </div>
                <div className="fg full">
                  <label>Upload Photo (Optional)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
                    {form.image && <img src={form.image} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />}
                    <label style={{ cursor: 'pointer', background: 'rgba(200,144,42,0.1)', color: '#8B4513', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                      {uploading ? "Uploading..." : form.image ? "Change Photo" : "📸 Select Photo"}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                    {form.image && (
                      <button type="button" onClick={() => setForm({ ...form, image: "" })} className="btn-remove">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="fg full">
                  <label>Choose Emoji / Icon (Fallback)</label>
                  <div className="emoji-row">
                    {EMOJIS.map(e => (
                      <div key={e} className={`eopt ${form.emoji === e ? "sel" : ""}`} onClick={() => setForm({...form, emoji: e})}>{e}</div>
                    ))}
                  </div>
                </div>
                <div className="fg">
                  <label>Card Background Color</label>
                  <div className="color-row">
                    {COLORS.map(c => (
                      <div key={c} className={`copt ${form.color === c ? "sel" : ""}`} style={{ background: c }} onClick={() => setForm({...form, color: c})}></div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="savebtn" onClick={handleSaveItem}>💾 Save Item</button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="apanel active">
            <div className="fcard">
              <h3>📱 WhatsApp Settings</h3>
              <div className="fgrid">
                <div className="fg">
                  <label>WhatsApp Number (with country code)</label>
                  <input type="text" value={settings.wa} onChange={e => setSettings({...settings, wa: e.target.value})} placeholder="919876543210" />
                </div>
                <div className="fg">
                  <label>Pre-filled Order Message</label>
                  <input type="text" value={settings.msg} onChange={e => setSettings({...settings, msg: e.target.value})} placeholder="Hi, I'd like to order..." />
                </div>
              </div>
              <button className="savebtn" onClick={() => handleSaveSettings("wa")}>Save WhatsApp</button>
            </div>
            <div className="fcard">
              <h3>🏪 Bakery Info</h3>
              <div className="fgrid">
                <div className="fg">
                  <label>Bakery Name</label>
                  <input type="text" value={settings.name} onChange={e => setSettings({...settings, name: e.target.value})} placeholder="Golden Crumb Bakery" />
                </div>
                <div className="fg">
                  <label>Phone</label>
                  <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} placeholder="+91 98765 43210" />
                </div>
                <div className="fg full">
                  <label>Address</label>
                  <input type="text" value={settings.addr} onChange={e => setSettings({...settings, addr: e.target.value})} placeholder="123 Bakery Lane, City" />
                </div>
                <div className="fg full">
                  <label>Our Story (About Us)</label>
                  <textarea value={settings.about || ""} onChange={e => setSettings({...settings, about: e.target.value})} placeholder="Tell your customers about your bakery..." rows="4"></textarea>
                </div>
                <div className="fg">
                  <label>Established Year Text</label>
                  <input type="text" value={settings.aboutYear || ""} onChange={e => setSettings({...settings, aboutYear: e.target.value})} placeholder="e.g. 1995 · 28 Years" />
                </div>
                <div className="fg full">
                  <label>Hero Section Photo (Main Circular Image)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
                    {settings.heroImage && <img src={settings.heroImage} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />}
                    <label style={{ cursor: 'pointer', background: 'rgba(200,144,42,0.1)', color: '#8B4513', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                      {uploading ? "Uploading..." : settings.heroImage ? "Change Photo" : "📸 Select Photo"}
                      <input type="file" accept="image/*" onChange={handleHeroImageUpload} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                    {settings.heroImage && (
                      <button type="button" onClick={() => setSettings({ ...settings, heroImage: "" })} className="btn-remove">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="fg full">
                  <label>About Section Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
                    {settings.aboutImage && <img src={settings.aboutImage} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />}
                    <label style={{ cursor: 'pointer', background: 'rgba(200,144,42,0.1)', color: '#8B4513', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                      {uploading ? "Uploading..." : settings.aboutImage ? "Change Photo" : "📸 Select Photo"}
                      <input type="file" accept="image/*" onChange={handleSettingsImageUpload} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                    {settings.aboutImage && (
                      <button type="button" onClick={() => setSettings({ ...settings, aboutImage: "" })} className="btn-remove">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <button className="savebtn" onClick={() => handleSaveSettings("info")}>Save Info</button>
            </div>
          </div>
        )}

      </div>
      
      {toastMsg && <div className="toast show">{toastMsg}</div>}
    </div>
  );
}
