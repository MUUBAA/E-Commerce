
# 🛍️ Nest E-Commerce Web App

A modern full-stack e-commerce shopping experience built with **React**, **Redux Toolkit**, **.NET Core Web API**, **MySQL Server**, **Entity Framework**, **Stripe Checkout**, and **Railway/Vercel Deployment**.

This application provides a seamless shopping experience with secure authentication, a robust cart system, order creation, and payment processing via Stripe.

---

## 1. Technical Stack & Dependencies

| Category      | Component | Key Technologies Used                                                                                   |
|-------------- |-----------|--------------------------------------------------------------------------------------------------------|
| **Frontend**  | Client    | React + Vite, TypeScript, Redux Toolkit (State Management), Axios, Tailwind CSS, Lucide Icons           |
| **Backend**   | Server/API| .NET Core 8 Web API, Entity Framework Core, MySQL, Stripe Checkout, SendGrid (Email Service)            |
| **Deployment**| Infra     | Frontend → Vercel, Backend → Railway, Database → aiven                                                 |

---

## 2. Core Features & Functionality

### 2.1. 🛒 Storefront & Browsing

- **Categorized Browsing:** Browse products by categories.
- **Product Presentation:** Detailed listings with images, descriptions, and pricing.
- **Promotional Content:** Banner offers (e.g., Shop Now, Order Now, Grab Offer).
- **User Experience:** Mobile-friendly UI with smooth animations.

### 2.2. 🧺 Cart & Checkout System

- **Item Management:** Add/remove items from the cart.
- **Quantity Control:** Increase/decrease item quantity.
- **Cart Drawer UI:** Seamless, easy access.
- **Live Calculations:** Real-time cart total.
- **Order Flow:** Proceed to checkout, order auto-created before payment.
- **Payment Integration:** Stripe Checkout for secure payments.

### 2.3. 💳 Payments (Stripe)

- **Security:** Stripe's secure hosted checkout page.
- **Flow Control:** Auto-redirect after successful payment.
- **Validation:** Backend order verification post-payment.
- **Testing:** Test mode ready with test card details.

### 2.4.  User Account & Authentication

- **Access:** Secure JWT login & registration.
- **Recovery:** Password reset via email verification.
- **Profile Data:** View profile, manage saved address.
- **Order History:** My Orders list with past orders and items.

### 2.5. 🔐 Security & Verification

- **Core Security:** Robust JWT authentication.
- **Access Control:** Protected routes for restricted pages.
- **Email Verification:** SendGrid/Gmail SMTP.

---

## 3. ⚙️ Installation & Setup Guide

### 3.1. Clone Repository

```bash
git clone https://github.com/MUUBAA/nest-ecommerce.git
cd nest
```

### 3.2. Frontend Setup (Client)

```bash
cd client
npm install
npm run dev
```

### 3.3. Backend Setup (Server)

```bash
cd server/Server
dotnet restore
dotnet build
dotnet ef database update
dotnet run
```

---

## 4. Testing Payments (Stripe Test Mode)

Stripe test mode is enabled. Use the following card details for test payments:

- **Card Number:** 4242 4242 4242 4242
- **CCV:** Any three digits
- **Expiry:** Any valid future month and year

---

## 5.  Contributing & Licensing

### 5.1. Contributing Guidelines

1. Fork the project repository.
2. Create your feature branch.
3. Commit your changes following best practices.
4. Create a pull request to merge your contributions.

### 5.2. License

This project is licensed under the **MIT License**.

---

_Built with passion by Abdullah Mubasir._
