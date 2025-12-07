# 🛒 Ecommerce Frontend – React.js

Frontend for a full-stack **multi-vendor Ecommerce platform**, built using **React.js, Redux Toolkit, React Router, Tailwind CSS**, and integrated with **Stripe** for secure payments.  
Supports **Customer, Admin, and Seller dashboards**, product browsing, cart, checkout, order management, and more.

---

## 📌 Project Overview

This frontend communicates with the Spring Boot backend and provides:

- 🛍️ **Complete customer shopping experience**
- 🧑‍💼 **Admin dashboard for managing products, orders, categories, sellers**
- 🛒 **Seller dashboard for product & order management**
- 💳 **Stripe payment gateway integration**
- 🔐 **JWT-based login and role-based UI**
- 📦 **Cart, Orders, Product listings, Filters, Sorting**
- 📱 **Responsive UI with Tailwind CSS**

---

## 🛠️ Tech Stack

- ⚛️ React.js
- 🛠️ Redux Toolkit
- 🎨 Tailwind CSS
- 🔄 React Router
- 💳 Stripe Payments
- 🔧 Axios

## 📁 Frontend Folder Structure

```
src/
├── Api/                     # API request functions (Axios calls)
├── assets/                  # Images, icons, static assets
├── Components/              # All UI components
│   ├── admin/               # Admin dashboard components
│   ├── auth/                # Login, Signup, Protected routes
│   ├── cart/                # Cart UI & logic
│   ├── checkout/            # Address, Payment, Order Summary
│   ├── home/                # Homepage sections
│   ├── Products/            # Product listing, filtering, modal view
│   └── Shared/              # Navbar, Footer, Loader, Pagination, etc.
│
├── Hooks/                   # Custom React hooks
├── Store/                   # Redux Toolkit store + slices
├── Utils/                   # Helper functions (formatting, validation)
│
├── App.css                  # Global styles
├── App.jsx                  # App routes & layout
├── index.css                # Additional global styles
├── main.jsx                 # React application entry point
│
├── .env                     # Environment variables (API URL, Stripe keys)
├── package.json             # Project dependencies & scripts
└── vite.config.js           # Vite configuration
```

---

## 🚀 Features

### 👤 Customer
- Browse products with **pagination, sorting & category filtering**
- View product details with **quick preview modal**
- Add to Cart / Update quantity / Remove items
- Multi-step **Checkout flow**
- **Stripe payment** integration
- Manage **addresses, orders, profile**

### 🛒 Seller Dashboard
- Manage own **products**
- View **orders received**
- Update status: *Accepted → Shipped → Delivered*

### 🧑‍💼 Admin Dashboard
- Manage **all products**, **categories**, **orders**, and **sellers**
- Admin analytics: Total Revenue, Products, Orders

### 🔐 Authentication
- JWT-based login
- Role-based UI (Customer, Seller, Admin)
- Auto-redirecting routes based on role

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ItzSanket99/Ecommerce-Frontend.git
cd Ecommerce-Frontend
```

### **2️⃣ Install Dependencies**
`npm install`

### **3️⃣ Configure Environment Variables**
**Create a .env file:**
```
VITE_BACK_END_URL=http://localhost:8080     # Backend API
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLIC_KEY
```

### **4️⃣ Run the Frontend**
`npm run dev`


