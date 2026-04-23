# E-commerce Flowers Shop (Backend)

Backend API for an e-commerce flower shop built with **NestJS + Prisma + PostgreSQL**.
This project focuses on **clean architecture, business logic correctness, and real-world backend practices**.

## Version

Current version: **v1.0.0**

## Features

### Authentication & Authorization

* JWT-based authentication (login/register)
* Password hashing with bcrypt
* Route protection with guards
* Role-based access control (ADMIN / CUSTOMER)

---

### Product System

* Public product browsing (GET)
* Admin-only product management (CUD)
* Full CRUD operations

---

### Cart System

* Add / update / remove items
* Quantity validation (> 0)
* Stock validation (prevent overselling)
* Business error handling

---

### Order System

* Create order from cart (checkout)
* Stock deduction on checkout
* Order cancellation via `/cancel`
* Stock restoration on cancellation
* Strict business rules (cancel only when PENDING)

---

### Dashboard (Admin)

* Total revenue (count only `DELIVERED`)
* Sales per day
* Best-selling products
* Low stock alerts

---

## Key Design Decisions

* Separate **business action (`/cancel`)** from **status update (`/status`)**
* Revenue is counted only when order is `DELIVERED`
* Use Prisma enums for **type safety (Role, OrderStatus)**
* Prevent invalid operations with business-level exceptions

---

## Tech Stack

* **Framework:** NestJS
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Auth:** JWT + Passport
* **Validation:** class-validator, class-transformer

---

## Project Structure

```bash
src/
 ├── auth/
 ├── users/
 ├── products/
 ├── cart/
 ├── orders/
 ├── dashboard/
 ├── prisma/
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pannnomaly1337/ecommerce-flowers-shop.git
cd ecommerce-flowers-shop/backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
JWT_SECRET="your_secret_key"
```

---

### 4. Setup database

```bash
npx prisma migrate dev
```

---

### 5. Generate Prisma client (if needed)

```bash
npx prisma generate
```

---

### 6. Run the server

```bash
npm run start:dev
```

Server will run on:

```bash
http://localhost:3000
```

---

## API Testing

You can use:

* Postman
* Thunder Client
* Insomnia

---

### Example endpoints

#### Auth

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

#### Products

```
GET    /products
GET    /products/:id
POST   /products      (ADMIN)
PATCH  /products/:id  (ADMIN)
DELETE /products/:id  (ADMIN)
```

#### Cart

```
GET    /cart
POST   /cart
PATCH  /cart/:itemId
DELETE /cart/:itemId
```

#### Orders

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

* ❌ Cannot add product if stock is insufficient
* ❌ Cannot cancel order unless status = `PENDING`
* ❌ Cannot cancel order twice
* ✅ Cancel order → stock restored
* ✅ Revenue counted only when `DELIVERED`

---

## Future Improvements

* Payment integration
* Order lifecycle automation
* Frontend (Next.js / React)
* Docker setup
* CI/CD pipeline

---

## Author

Developed by **Pannnomaly1337**

---

## License

This project is for educational and portfolio purposes.