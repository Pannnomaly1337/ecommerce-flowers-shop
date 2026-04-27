# E-commerce Flowers Shop (Fullstack)

A fullstack e-commerce application for a flower shop built with:

* **Frontend:** Next.js + TailwindCSS
* **Backend:** NestJS + Prisma + PostgreSQL

This project focuses on **clean architecture, real-world business logic, and scalable fullstack design**.

---

## Version

Current version: **v1.1.0**

* `v1.0.0` → Backend system
* `v1.1.0` → Frontend integration (Fullstack ready)

---

## Features

## Authentication & Authorization

* JWT-based authentication (login/register)
* Password hashing with bcrypt
* Route protection with guards
* Role-based access control (ADMIN / CUSTOMER)

---

## Product System

* Public product browsing (GET)
* Admin-only product management (CUD)
* Full CRUD operations

---

## Cart System

* Add / update / remove items
* Quantity validation (> 0)
* Stock validation (prevent overselling)
* Business error handling

---

## Order System

* Create order from cart (checkout)
* Stock deduction on checkout
* Order cancellation via `/cancel`
* Stock restoration on cancellation
* Strict business rules (cancel only when PENDING)

---

## Dashboard (Admin)

* Total revenue (**count only `DELIVERED` orders**)
* Sales per day
* Best-selling products
* Low stock alerts

---

## Frontend (v1.1.0)

* Next.js application setup
* TailwindCSS integration
* Clean project structure
* Axios API layer
* Connected to backend API
* Successfully fetching products from backend

---

## Key Design Decisions

* Separate **business action (`/cancel`)** from **status update (`/status`)**
* Revenue counted only when order is `DELIVERED`
* Use Prisma enums for **type safety (Role, OrderStatus)**
* Prevent invalid operations with business-level exceptions
* Clear separation between frontend (UI) and backend (API)

---

## Tech Stack

### Backend

* **Framework:** NestJS
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Auth:** JWT + Passport
* **Validation:** class-validator, class-transformer

### Frontend

* **Framework:** Next.js
* **Styling:** TailwindCSS
* **HTTP Client:** Axios

---

## Project Structure

```bash
ecommerce-flowers-shop/
 ├── backend/
 │   └── src/
 │       ├── auth/
 │       ├── users/
 │       ├── products/
 │       ├── cart/
 │       ├── orders/
 │       ├── dashboard/
 │       └── prisma/
 │
 ├── frontend/
 │   └── src/
 │       ├── app/
 │       ├── components/
 │       ├── lib/
 │       ├── services/
 │       └── types/
```

---

## Getting Started

## 1. Clone repository

```bash
git clone https://github.com/Pannnomaly1337/ecommerce-flowers-shop.git
cd ecommerce-flowers-shop
```

---

## Backend Setup

```bash
cd backend
npm install
```

### Setup `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
JWT_SECRET="your_secret_key"
```

---

### Setup database

```bash
npx prisma migrate dev
npx prisma generate
```

---

### Run backend

```bash
npm run start:dev
```

Backend will run on:

```bash
http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

---

### Run frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:3001
```

---

## API Integration

* Frontend communicates with backend via Axios
* CORS configured for `http://localhost:3001`
* Example API:

```bash
GET /products
```

---

## API Testing Tools

* Postman
* Thunder Client
* Insomnia

---

## Example Endpoints

### Auth

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Products

```
GET    /products
GET    /products/:id
POST   /products      (ADMIN)
PATCH  /products/:id  (ADMIN)
DELETE /products/:id  (ADMIN)
```

### Cart

```
GET    /cart
POST   /cart
PATCH  /cart/:itemId
DELETE /cart/:itemId
```

### Orders

```
GET    /orders
GET    /orders/:id
POST   /orders
PATCH  /orders/:id/cancel
PATCH  /orders/:id/status   (ADMIN)
```

---

## Roles

| Role     | Permissions                                          |
| -------- | ---------------------------------------------------- |
| CUSTOMER | Use cart & order                                     |
| ADMIN    | Manage products, update order status, view dashboard |

---

## Business Rules Highlights

* Cannot add product if stock is insufficient
* Cannot cancel order unless status = `PENDING`
* Cannot cancel order twice
* Cannot cancel via `/status` endpoint
* Cancel order → stock restored
* Revenue counted only when `DELIVERED`

---

## Future Improvements

* Authentication UI (login/register)
* Product listing UI
* Cart & order UI
* Payment integration
* Docker setup
* CI/CD pipeline

---

## Author

Developed by **Pannnomaly1337**

---

## License

This project is for educational and portfolio purposes.