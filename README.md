# 🌊 Swim — Inventory Management System

A full-stack inventory management platform built for businesses that operate across multiple warehouses and stores. Swim handles stock tracking, inter-location transfers, sales orders, AI-assisted restocking, and real-time notifications — all under a role-based access system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Role System](#role-system)
- [Project Structure](#project-structure)

---

## Overview

Swim is a multi-tenant inventory management system. When an **Owner** registers, their organization, first warehouse, and account are created automatically. They can then invite **Store Managers**, create additional locations (warehouses or stores), manage items and inventory, process customer orders, and oversee stock requests from their managers — all in real time via WebSocket notifications.

An integrated AI agent (powered by Google Gemini) can analyze warehouse stock levels and automatically generate smart stock request quantities and logistics notes.

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Real-time | Socket.IO |
| AI Agent | Google Gemini (`@google/generative-ai`) |
| Payments | Stripe |
| Email | Nodemailer |
| Validation | Joi, Zod, express-validator |
| API Docs | Swagger UI (`swagger-jsdoc` + `swagger-ui-express`) |
| Dev Tools | Nodemon, Vitest, Supertest |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 8 |
| State Management | Redux Toolkit |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Real-time | Socket.IO Client |
| Styling | Tailwind CSS v4 |
| Payments | Stripe.js |
| Notifications | React Hot Toast |

---

## Features

### 🔐 Authentication & Authorization
- Owner self-registration (auto-creates organization + first warehouse)
- JWT-based login with persistent sessions
- Role-based route protection (`Owner` / `StoreManager`)
- Email-based password reset with token expiration
- Owner-invited Store Manager accounts

### 🏢 Organization & Location Management
- Multi-tenant organizations with `free` and `pro` tiers
- Create and manage **Warehouses** and **Stores** as location types
- Assign Store Managers to specific store locations

### 📦 Inventory Management
- Per-location inventory tracking with live quantity updates
- Switch between warehouse and store views (Owner)
- Add new items with category, price, and image
- Export items from warehouse to store
- Move stock between two warehouses or between two stores
- Import stock from a warehouse into a store
- Search and sort inventory across all locations
- Cross-location stock alert when an item is available elsewhere

### 🛒 Orders & Receipts
- Create customer orders tied to a specific store
- Order status workflow: `pending → confirmed → shipped → delivered → cancelled`
- Receipt generation per completed order

### 🔄 Stock Requests
- Store Managers submit stock requests from their store to a warehouse
- Owners receive real-time toast notifications via Socket.IO when a new request arrives
- Owners can approve or reject requests with an optional admin note
- Request status: `pending → approved / rejected`

### 🤖 AI Agent
- Chat interface powered by Google Gemini
- AI-assisted stock request creation: analyzes warehouse availability and auto-generates a recommended quantity and logistics note (capped to available stock)

### 💳 Payments
- Stripe integration for payment processing on orders

### 📊 Statistics & History
- System performance metrics dashboard (latency, throughput, uptime, error rate)
- Dock activity tracking (ONLOADING, STAGING, CLEARED)
- Transaction history log (sales, transfers, restocks, dumps)

### 📡 Real-time
- Socket.IO rooms scoped per organization (`org_<id>`)
- Live stock request notifications pushed to all connected Owners in the same org

---

## Architecture

```
┌─────────────────────────────────────────┐
│              Frontend (React)            │
│  Vite · Redux Toolkit · React Router     │
│  Socket.IO Client · Tailwind CSS         │
└────────────────┬────────────────────────┘
                 │ HTTP (REST) + WebSocket
┌────────────────▼────────────────────────┐
│              Backend (Express)           │
│  JWT Auth · Role Middleware              │
│  Socket.IO Server · Swagger Docs         │
│  Google Gemini Agent · Stripe            │
└────────────────┬────────────────────────┘
                 │ Mongoose
┌────────────────▼────────────────────────┐
│              MongoDB                     │
│  Users · Organizations · Locations       │
│  Items · Inventory · Orders              │
│  Transactions · StockRequests            │
└─────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then fill in all required values (see Environment Variables below)

# 4. Start in development mode
npm run dev

# 5. Start in production mode
npm start
```

The server starts on `http://localhost:3000` by default.  
Interactive API docs are available at **`http://localhost:3000/api-docs`**.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

The frontend starts on `http://localhost:5173` by default and connects to the backend at `http://localhost:3000/api/`.

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/swim

# Authentication
JWT_SECRET=your_jwt_secret_here

# Email (Nodemailer)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

---

## API Reference

All routes are prefixed with `/api`. Interactive documentation with request/response schemas is available at `/api-docs` when the backend is running.

| Resource | Base Path | Description |
|---|---|---|
| Auth | `/api/auth` | Register, login, forgot/reset password, invite store manager |
| Users | `/api/users` | User profile management |
| Organizations | `/api/organization` | Org CRUD, tier upgrade/downgrade |
| Locations | `/api/location` | Warehouse and store management |
| Items | `/api/item` | Product catalog |
| Inventory | `/api/inventory` | Per-location stock quantities |
| Stock Requests | `/api/stock-requests` | Restock request workflow |
| Orders | `/api/order` | Customer order management |
| Transactions | `/api/transactions` | Sales, transfers, restocks, dumps |
| Customers | `/api/customer` | Customer records |
| AI Agent | `/api/agent` | Gemini chat and AI-assisted stock requests |

---

## Role System

| Capability | Owner | StoreManager |
|---|:---:|:---:|
| Register organization | ✅ | — |
| Invite Store Managers | ✅ | — |
| Manage locations (warehouses & stores) | ✅ | — |
| View all inventory (warehouses + stores) | ✅ | Store only |
| Add / edit items | ✅ | — |
| Export stock to store / move between locations | ✅ | — |
| Create stock requests | — | ✅ |
| Approve / reject stock requests | ✅ | — |
| Create customer orders | ✅ | ✅ |
| View transaction history | ✅ | ✅ |
| Upgrade organization tier | ✅ | — |
| Receive real-time restock notifications | ✅ | — |

---

## Project Structure

```
├── backend/
│   ├── config/
│   │   ├── dbConfig.js          # MongoDB connection
│   │   └── swagger.js           # OpenAPI spec
│   ├── controllers/             # Business logic
│   │   ├── agent.controller.js  # AI agent (Gemini)
│   │   ├── auth.controller.js
│   │   ├── inventory.controller.js
│   │   ├── stockRequest.controller.js
│   │   ├── transaction.controller.js
│   │   └── ...
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT protection
│   │   └── role.middleware.js   # Role-based authorization
│   ├── models/                  # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── organization.model.js
│   │   ├── location.model.js
│   │   ├── item.model.js
│   │   ├── inventory.model.js
│   │   ├── order.model.js
│   │   ├── stockRequest.model.js
│   │   └── transaction.model.js
│   ├── routes/                  # Express routers
│   ├── utils/
│   │   ├── sendEmail.js         # Nodemailer helper
│   │   └── validators.js        # Input validation
│   └── server.js                # Entry point + Socket.IO setup
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/          # Reusable UI components
    │   ├── core/
    │   │   ├── apiClient.ts     # Axios instance
    │   │   ├── api.constants.ts # Base URL
    │   │   └── socket.ts        # Socket.IO client
    │   ├── layout/
    │   │   ├── nav/             # Desktop + mobile navigation
    │   │   └── footer/
    │   ├── pages/               # Route-level pages
    │   │   ├── home/
    │   │   ├── inventory/
    │   │   ├── order/
    │   │   ├── history/
    │   │   ├── statistics/
    │   │   ├── profile/
    │   │   ├── reciept/
    │   │   ├── signin/
    │   │   └── signup/
    │   ├── store/               # Redux store + slices
    │   │   └── slices/
    │   │       ├── authSlice.ts
    │   │       ├── inventorySlice.ts
    │   │       ├── orderSlice.ts
    │   │       ├── requestsSlice.ts
    │   │       └── ...
    │   ├── types/               # Shared TypeScript types
    │   ├── interfaces/          # TypeScript interfaces
    │   ├── utils/
    │   │   └── toast.ts         # Notification helpers
    │   ├── App.tsx              # Root layout + Socket.IO setup
    │   └── main.tsx             # Router + Redux Provider
    └── vite.config.ts
```