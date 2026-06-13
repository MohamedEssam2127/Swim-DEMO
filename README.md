<div align="center">

# 🌊 SWIM Protocol

### Multi-Store Inventory, Order & Stock Request Management Platform

A full-stack web application for organizations to manage **inventory across multiple stores and warehouses**, process **orders with integrated Stripe payments**, handle **stock transfer requests**, and track **real-time activity** — all from one unified dashboard.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_App-00C2A8?style=for-the-badge)](https://swim-demo-phi.vercel.app/)
[![Figma Design](https://img.shields.io/badge/Figma-Design_File-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/U0HjirmTr4i3ENCV3BTDup/SWIM-rebranding?node-id=63-5733&t=LhdDHHeLwZmVJOzq-0)

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Screenshots & Design](#-screenshots--design)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Roles & Permissions](#-roles--permissions)
- [Real-Time Notifications](#-real-time-notifications)
- [Localization](#-localization)
- [Contributors](#-contributors)

---

## 📖 About the Project

**SWIM Protocol** is a multi-tenant inventory and operations platform built for businesses that manage stock across **multiple stores and warehouses**. It enables organization owners and store managers to:

- Track inventory levels per item, per location, in real time
- Move stock between **warehouses and stores** with full audit trails
- Create and fulfill **customer orders** with **Stripe-powered checkout**
- Submit, approve, and track **stock requests** between locations
- View **transaction history**, statistics, and dashboards
- Receive **live notifications** via Socket.IO when requests are made, approved, or rejected

It was built as a collaborative full-stack project using a modern **MERN-based stack** with **TypeScript**, **Redux Toolkit**, and a fully documented **REST API**.

---

## 🛠 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO_Client-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe.js-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

### AI / Tooling

![Google Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)

---

## ✨ Features

### 🏢 Multi-Tenant Organization Management
- Organizations with multiple **stores** and **warehouses**
- Role-based access: **Owner**, **Store Manager**, and **Staff**
- Location-aware inventory and permissions

### 📦 Inventory Management
- Real-time stock levels per item per location
- Add new items, adjust quantities, and track item history
- Move stock **between warehouses** or **from warehouse to store**
- Move stock **between stores**
- Export stock from warehouse to store with full popup workflows

### 🧾 Orders & Payments
- Create customer orders from in-stock items
- Integrated **Stripe checkout** (5-step payment flow: intent → confirm → webhook → order finalize → receipt)
- Auto-generated **digital receipts** with line items, totals, and customer info
- Order history with searchable, filterable records

### 🔄 Stock Requests
- Store managers submit **stock requests** to the organization owner
- Owners **approve** or **reject** requests with admin notes
- Live request status updates pushed via WebSockets

### 📊 Dashboards & Statistics
- Per-store and organization-wide statistics
- Transaction history (sales, transfers, restocks, refunds/dumps)
- Activity history feed with filters

### 🔐 Authentication & Authorization
- JWT-based authentication with secure password hashing (bcrypt)
- Role-based route guards on both frontend and backend
- Profile management for owners, managers, and staff

### 🔔 Real-Time Notifications
- Socket.IO powered toast notifications
- Owners get notified instantly when a store manager submits a request
- Managers get notified when their requests are approved/rejected

### 🌍 Internationalization
- Full **English** and **Arabic** localization with a language switcher
- RTL-ready layout support

### 📚 Self-Documenting API
- Auto-generated **Swagger/OpenAPI** docs at `/api-docs`
- Bearer-token auth support directly in the Swagger UI

---

## 🎨 Screenshots & Design

The complete UI/UX design system, including the SWIM rebranding, component library, and high-fidelity mockups, is available on Figma:

> 🔗 **[View the Figma Design File](https://www.figma.com/design/U0HjirmTr4i3ENCV3BTDup/SWIM-rebranding?node-id=63-5733&t=LhdDHHeLwZmVJOzq-0)**
> <h3>Landing Page</h3>
<p>
  <img src="https://github.com/user-attachments/assets/6f3f5488-e1c2-4c44-ac23-7a1317b77d14" width="1000"/>
</p>

> <h3>Statistics Page</h3>
<p>
  <img src="https://github.com/user-attachments/assets/3e805e41-83eb-467b-bb3b-d51e50bcdd78" width="1000"/>
</p>

<h3>Inventory Page</h3>
<p>
  <img src="https://github.com/user-attachments/assets/ecaf1c87-79d9-4d45-aedd-ffb6c03c3052" width="1000"/>
</p>

<h3>Popups</h3>
<p align="center">
  <img src="https://github.com/user-attachments/assets/65c3599c-3695-4f51-8f34-6aa2291cc12d" width="480" height="800"/>
  <img src="https://github.com/user-attachments/assets/bef51d91-d98a-4b18-8038-c39bbec8eb12" width="480" height="800"/>
</p>
 
---

## 📂 Project Structure

```
swim-protocol/
├── frontend/                  # React + TypeScript + Vite client
│   ├── src/
│   │   ├── components/        # Reusable UI components & popups
│   │   ├── pages/              # Route-level pages (inventory, orders, profile, history, auth...)
│   │   ├── store/
│   │   │   └── slices/         # Redux Toolkit slices (auth, inventory, orders, requests, store managers, history)
│   │   ├── interfaces/         # Shared TypeScript types & DTOs
│   │   ├── localization/       # EN / AR translation files + i18n config
│   │   ├── layout/              # Navbar, mobile nav, footer
│   │   ├── core/                # Socket.IO client setup
│   │   └── utils/                # Toast helpers, formatters, etc.
│   └── package.json
│
├── backend/                    # Node.js + Express + MongoDB API
│   ├── controllers/             # Route handlers (auth, inventory, orders, transactions...)
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # Express route definitions
│   ├── middlewares/              # Auth, validation, error handling
│   ├── config/                   # DB connection & Swagger config
│   ├── utils/                     # Helper utilities
│   └── server.js                  # App entry point (Express + Socket.IO)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **MongoDB** (local instance or MongoDB Atlas connection string)
- **Stripe** account (test mode API keys)
- npm or yarn

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/swim-protocol.git
cd swim-protocol
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
cp .env.example .env   # add your environment variables (see below)
npm run dev             # starts the server with nodemon
```

The API will run at **`http://localhost:3000`** by default, with Swagger docs at **`http://localhost:3000/api-docs`**.

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **`http://localhost:5173`** (default Vite port).

### 4️⃣ Build for production

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default `3000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `GEMINI_API_KEY` | Google Gemini API key (for AI agent features) |
| `OPENAI_API_KEY` | OpenAI key (used via LangChain, if applicable) |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials for Nodemailer |
| `NODE_ENV` | `development` \| `production` |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API (e.g. `http://localhost:3000/api`) |
| `VITE_SOCKET_URL` | URL for the Socket.IO server (e.g. `http://localhost:3000`) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

---

## 📘 API Documentation

The backend exposes a fully interactive **Swagger UI** covering all endpoints:

```
GET /api-docs           → Interactive Swagger UI
GET /api-docs.json      → Raw OpenAPI 3.0 spec
```

### Main API Resources

| Resource | Base Route | Description |
|---|---|---|
| 🔐 Auth | `/api/auth` | Register, login, JWT issuance |
| 👤 Users | `/api/users` | User profile & management |
| 🏢 Organizations | `/api/organization` | Organization CRUD |
| 📍 Locations | `/api/location` | Stores & warehouses |
| 📦 Inventory | `/api/inventory` | Stock levels, transfers, exports |
| 🏷 Items | `/api/item` | Product/item catalog |
| 👥 Customers | `/api/customer` | Customer records for orders |
| 🧾 Orders | `/api/order` | Order creation, Stripe payments, receipts |
| 🔄 Stock Requests | `/api/stock-requests` | Inter-location stock requests |
| 💳 Transactions | `/api/transactions` | Sales, transfers, restocks, refunds |
| 🤖 Agent | `/api/agent` | AI-powered assistant endpoints |

---

## 👥 Roles & Permissions

| Role | Capabilities |
|---|---|
| **Owner** | Full access — manages organization, all stores/warehouses, approves/rejects stock requests, views all statistics |
| **Store Manager** | Manages inventory for their assigned store, creates orders, submits stock requests |
| **Staff** | Limited operational access (varies by configuration) |

Role-based **route guards** are enforced on the frontend (`Guards` components) and validated again on the backend via JWT middleware.

---

## 🔔 Real-Time Notifications

SWIM Protocol uses **Socket.IO** for live, room-based notifications:

- Each user joins a room based on their **organization ID** and **personal user ID**
- 📥 **Owners** receive a toast + live badge update when a new stock request comes in
- ✅ / ❌ **Store Managers** receive a toast when their request is **approved** or **rejected**, including any admin notes

---

## 🌍 Localization

The frontend supports full bilingual UI:

- 🇬🇧 **English (EN)**
- 🇪🇬 **Arabic (AR)**

Switch languages instantly via the in-app **Language Switcher** — translations are organized per-namespace (e.g. `common`, `toast`) for easy extension to additional languages.

---

## 🤝 Contributors

Built with ❤️ by the SWIM Protocol team.
- 👨🏻‍💻 Abdelrahman Khaled Mohammed [Github](https://github.com/AbdelrhmanKhaled76)
- 👨🏻‍💻 Mohamed EssamElDin AbdelFattah [Github](https://github.com/MohamedEssam2127)
- 👨🏻‍💻 Islam Adel Ahmed [Github](https://github.com/ISLAM2ADEL)
- 👨🏻‍💻 Mario Nady Khalaf [Github](https://github.com/marionadydev)
- 👩🏻‍💻 Mariam Essam Edward [Github](https://github.com/MariamEssam5)

---

<div align="center">

**⭐ If you found this project interesting, consider giving it a star!**

[Live Demo](https://swim-demo-phi.vercel.app/) · [Figma Design](https://www.figma.com/design/U0HjirmTr4i3ENCV3BTDup/SWIM-rebranding?node-id=63-5733&t=LhdDHHeLwZmVJOzq-0)

</div>
