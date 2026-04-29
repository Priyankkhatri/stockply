<div align="center">

# 📦 Stockply

### **The Digital Atelier for Supply Chain Excellence**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Frontend-black?logo=vercel)](https://frontend-three-peach-97.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?logo=render)](https://stockply-backend.onrender.com/health)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

### 🌐 [Live App ↗](https://frontend-three-peach-97.vercel.app) &nbsp;|&nbsp; ⚙️ [Backend API ↗](https://stockply-backend.onrender.com/health) &nbsp;|&nbsp; 🎨 [Figma Design ↗](https://www.figma.com/design/QrKMtDP4QTgr966N20zdOV/Untitled?node-id=0-1&t=7mfRi0p7h7UuW9fN-1)

---

**Stockply** is a premium, full-stack supply chain ecosystem designed to redefine how shop owners and suppliers interact. Inspired by the "Digital Atelier" philosophy, it blends minimalist aesthetics with industrial-strength functionality backed by a live MongoDB Atlas database.

[Explore Features](#-key-capabilities) • [Tech Stack](#-the-engine) • [Getting Started](#-launch-sequence) • [Design System](#-design-philosophy)

</div>

---

## ✨ Why Stockply?

In a world of cluttered, legacy inventory systems, **Stockply** stands out as a beacon of clarity. We believe that professional tools should be as delightful to use as they are powerful. Whether you are a boutique owner managing inventory or a large-scale supplier fulfilling thousands of orders, Stockply provides the precision you need with the beauty you deserve.

---

## 🚀 Key Capabilities

### 🏢 For Shop Owners
> "Empowering retailers with data-driven precision."

- **Intelligent Inventory Ledger**: Real-time tracking with smart categorisation and automated low-stock triggers.
- **Supplier Comparison Engine**: Compare suppliers based on dynamic metrics: Price, Reliability, and Lead Time.
- **Seamless Procurement**: One-click purchase orders with integrated tracking.

### 🏭 For Suppliers
> "Scale your distribution with cinematic efficiency."

- **Partner Dashboard**: Manage all your shop clients from a single, high-fidelity portal.
- **Advanced Fulfillment Analytics**: Visualize your supply performance with glowing, real-time data insights.
- **Order Logistics**: Manage the entire lifecycle of an order from placement to delivery with live MongoDB persistence.

---

## 🛠 The Engine

Stockply is built on a modern, high-performance MERN stack designed for speed and scalability.

| Technology | Purpose |
| :--- | :--- |
| **React 18 + Vite** | UI Logic & Component Architecture |
| **Tailwind CSS** | Atomic Styling & "Digital Atelier" Theme |
| **Framer Motion** | Micro-animations & Transitions |
| **Node.js + Express** | REST API Backend |
| **MongoDB Atlas** | Cloud Database Persistence |
| **Mongoose** | ODM & Schema Validation |
| **Render** | Backend Hosting |
| **Vercel** | Frontend Hosting with Auto-deploy |

---

## 📂 Architecture

```bash
stockply/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Atomic UI elements (GlassCard, PremiumButton...)
│   │   ├── context/       # Global state (SupplierContext)
│   │   ├── layouts/       # Structural templates (DashboardLayout)
│   │   ├── pages/         # Route-specific views
│   │   └── services/      # API service layer (axios)
│   └── vercel.json        # Vercel routing config
└── backend/               # Express REST API
    └── src/
        ├── controllers/   # Business logic
        ├── models/        # Mongoose schemas
        └── routes/        # Express routers
```

---

## 🛰 Launch Sequence

Get Stockply running locally in minutes.

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone & Enter
```bash
git clone https://github.com/Priyankkhatri/stockply.git && cd stockply
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env file:
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
# Create .env.local file:
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env.local
npm run dev
```

### 4. Open in Browser
```
http://localhost:5173
```

> **Test Credentials**: Any email + any password. Select your role (Shop Owner or Supplier).

---

## 🎨 Design Philosophy: The Digital Atelier

Stockply isn't just an app; it's a workspace. Our design system, **Atelier DS**, is built on four core pillars:

1. **Glassmorphism**: Using depth and transparency to create a sense of hierarchy and focus.
2. **Kinetic Typography**: Intentional use of 'Inter' and 'Outfit' fonts for maximum legibility.
3. **Harmonious Palette**: Warm parchment backgrounds with gold primary accents.
4. **Micro-Interactions**: Every click, hover, and scroll is accompanied by smooth, hardware-accelerated animations.

---

<div align="center">

Built with precision by **Priyank Khatri**.

[🐛 Report Bug](https://github.com/Priyankkhatri/stockply/issues) • [💡 Request Feature](https://github.com/Priyankkhatri/stockply/issues) • [🌐 Live Demo](https://frontend-three-peach-97.vercel.app)

</div>
