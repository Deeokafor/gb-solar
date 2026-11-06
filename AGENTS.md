# AGENTS.md — Autonomous Agent Directives

## 1. Project Overview & Scope
- **Project Name:** Goodeybest Solar Enterprise Web Store
- **Business Domain:** Clean energy & solar products (Solar Panels, Inverters, Deep-Cycle/Lithium Batteries, Accessories).
- **Core Objective:** Build a production-grade full-stack e-commerce web application. Static UI alone is insufficient; **integrations and end-to-end data persistence are the primary evaluation criteria.**
- **Key Milestones:**
  1. Product catalog browsing & filtering.
  2. Cart management (state preserved across sessions).
  3. Checkout flow with order placement.
  4. Google OAuth authentication via Google Cloud Console.
  5. Persistent database storage (Supabase or Neon PostgreSQL).
  6. Transactional email dispatch on checkout completion via Mailgun.
  7. User order history (persisting across logins, reloads, and browser restarts).

---

## 2. Tech Stack & Architectural Choices

| Concern | Selected Technology | Notes |
| :--- | :--- | :--- |
| **Frontend Framework** | Vue 3 (Composition API, `<script setup>`) | Use Vite or Nuxt 3 (SSR/hybrid recommended for backend API routes). |
| **Styling** | Tailwind CSS | Strict minimalist aesthetic, clean typography, whitespace-focused. |
| **State Management** | Pinia + `pinia-plugin-persistedstate` | For cart and active session state sync. |
| **Database & Auth** | Supabase (Default) or Neon PostgreSQL | Supabase Auth handles Google OAuth and Row-Level Security (RLS). |
| **Server/API Layer** | Nitro / Nuxt Server Routes or Node.js / Express backend | Secures sensitive API keys (Mailgun, DB service role). |
| **Email Service** | Mailgun API (`mailgun.js` + `form-data`) | Triggered server-side upon successful order insertion. |

---

## 3. UI/UX & Design Guidelines (Minimalist Solar Aesthetic)

- **Palette:**
  - **Backgrounds:** Clean white (`#FFFFFF`) and warm neutral slate (`#F8FAFC`).
  - **Primary / Action:** Deep slate / solar navy (`#0F172A` or `#1E293B`).
  - **Accent / Solar Hint:** Subtle warm amber / soft sun gold (`#F59E0B` or muted `#D97706`) used sparingly for badges, active states, and primary CTAs.
  - **Borders & Dividers:** Subtle grays (`#E2E8F0`).
- **Typography:** Modern clean sans-serif (e.g., Inter, Plus Jakarta Sans, or Geist).
- **Rules:**
  - Avoid noisy gradients or cluttered layouts.
  - Generous padding and clean card borders with minimal drop-shadows (`shadow-sm`).
  - High-clarity product specs (e.g., Wattage `W`, Voltage `V`, Capacity `Ah/kWh`).

---

## 4. Architectural Requirements & Data Flow

### 4.1. Authentication Architecture (Google OAuth)
- Configure OAuth consent screen and credentials in **Google Cloud Console**.
- Redirect URIs must match:
  - Local: `http://localhost:3000/auth/callback` (or your local port).
  - Production: `https://<your-domain>/auth/callback`.
- If using **Supabase**: Use `@supabase/supabase-js` OAuth provider (`provider: 'google'`).
- If using **Neon**: Use a secure session/JWT flow (e.g., Auth.js / NextAuth / custom JWT cookie) integrated with Google client IDs.

### 4.2. Database Schema (PostgreSQL / Supabase)

#### `profiles` (managed via auth triggers or app sync)
- `id` (UUID, PK, references `auth.users.id` if Supabase)
- `email` (TEXT, NOT NULL)
- `full_name` (TEXT)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

#### `products`
- `id` (UUID or BIGSERIAL, PK)
- `name` (TEXT, NOT NULL)
- `slug` (TEXT, UNIQUE)
- `category` (TEXT — enum/check: `'panel'`, `'inverter'`, `'battery'`, `'accessory'`)
- `price` (NUMERIC(12, 2), NOT NULL)
- `stock` (INTEGER, DEFAULT 0)
- `specs` (JSONB — e.g. `{"wattage": 450, "voltage": "24V", "efficiency": "21.3%"}`)
- `image_url` (TEXT)
- `is_active` (BOOLEAN, DEFAULT TRUE)

#### `orders`
- `id` (UUID, PK, DEFAULT gen_random_uuid())
- `user_id` (UUID, references `profiles.id`, NOT NULL)
- `total_amount` (NUMERIC(12, 2), NOT NULL)
- `status` (TEXT, DEFAULT `'pending'` — `'pending'`, `'paid'`, `'delivered'`, `'cancelled'`)
- `shipping_address` (JSONB)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

#### `order_items`
- `id` (UUID, PK, DEFAULT gen_random_uuid())
- `order_id` (UUID, references `orders.id` ON DELETE CASCADE)
- `product_id` (UUID, references `products.id`)
- `quantity` (INTEGER, NOT NULL)
- `unit_price` (NUMERIC(12, 2), NOT NULL)

#### 4.3. Row Level Security (RLS) Policies
- `products`: Public readable (`SELECT`), writeable only by Admin/Service Role.
- `orders`: Users can `SELECT` and `INSERT` records where `auth.uid() == user_id`.
- `order_items`: Users can view items belonging to their own orders.

---

## 5. Mailgun Confirmation Service Architecture

> **SECURITY NOTICE:** Mailgun API keys (`MAILGUN_API_KEY`) and Domain names must **NEVER** be exposed in client-side code (`VITE_*` / public browser variables).

### Flow:
1. Client submits cart payload and shipping details to `/api/orders/checkout`.
2. Server validates user session (via Bearer token / Supabase cookie).
3. Server executes atomic transaction:
   - Verifies product stock and prices against database.
   - Inserts `orders` and `order_items`.
   - Decrements stock.
4. Server invokes Mailgun SDK / REST API to compile and send a responsive HTML receipt:
   - Order Number
   - Itemized list with solar specifications and quantities
   - Total amount charged
   - Delivery address and estimated lead time
5. Server responds with `order_id` to client for confirmation view.

---

## 6. Critical Architecture Details Often Overlooked

1. **Server-Side Price Validation:**
   - Never trust prices or totals calculated on the frontend. The backend must recalculate `order_total` using live product prices in the database before saving the order.
2. **Session Persistence & Re-hydration:**
   - Ensure auth state listeners (`supabase.auth.onAuthStateChange`) handle browser refresh, tab close, and page re-open without flashing unauthorized/empty states.
   - Cart should sync to `localStorage` for guests, and optionally merge with the user's account upon login.
3. **Optimistic UI vs. Inventory Locks:**
   - Prevent overselling. When checking out, verify stock availability before order creation.
4. **Environment Isolation:**
   - Clearly separate `.env.example` with placeholders for:
     ```env
     # Client/Public
     SUPABASE_URL=
     SUPABASE_ANON_KEY=
     
     # Server/Private Only
     SUPABASE_SERVICE_ROLE_KEY=
     MAILGUN_API_KEY=
     MAILGUN_DOMAIN=
     MAILGUN_FROM_EMAIL=
     ```
5. **Zero-Result & Loading States:**
   - Minimalist loaders/skeletons for order history fetching.
   - Empty order state with quick link back to `/products`.

---

## 7. Step-by-Step Execution Plan for Autonomous Agents

- [ ] **Phase 1: Project Scaffolding**
  - Initialize Vue 3 / Nuxt 3 project with Tailwind CSS.
  - Configure router, Pinia store, and base minimalist components (Navbar, Footer, Layout, Button, Card).
- [ ] **Phase 2: Database & Auth Setup**
  - Apply migrations for `profiles`, `products`, `orders`, and `order_items`.
  - Enable RLS policies.
  - Setup Google OAuth integration and Supabase/Neon client.
- [ ] **Phase 3: Catalog & Cart State**
  - Seed catalog with realistic solar data (panels, hybrid inverters, LiFePO4 batteries).
  - Implement cart store with add/remove/increment actions and local persistence.
- [ ] **Phase 4: Checkout & Order API**
  - Build checkout view collecting shipping and contact information.
  - Implement server endpoint (`/api/checkout`) with server-side validation and DB insertion.
- [ ] **Phase 5: Mailgun Transactional Email**
  - Integrate Mailgun sending logic inside the checkout route.
  - Create a clean HTML template matching the store's minimalist solar branding.
- [ ] **Phase 6: User Order History View**
  - Create `/orders` or `/account/orders` page.
  - Test session re-hydration: Sign in $\to$ place order $\to$ close browser $\to$ re-open $\to$ sign in $\to$ verify order list.
- [ ] **Phase 7: Review & Verification**
  - Validate security (no keys in bundle).
  - Audit mobile responsiveness and accessibility.