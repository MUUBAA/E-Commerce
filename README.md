🛍️ Nest E-Commerce Web App

A modern full-stack e-commerce shopping experience built with React, Redux Toolkit, .NET Core Web API, MYSQL Server, Entity Framework, Stripe Checkout, and Railway/Vercel Deployment.
This app provides a seamless shopping experience with secure authentication, cart system, order creation, and payment using Stripe Checkout.

Installation Guide
Clone Repository
git clone https://github.com/MUUBAA/nest-ecommerce.git
cd nest

Frontend Setup
cd client
npm install
npm run dev

cd server/Server
dotnet restore
dotnet build
dotnet ef database update
dotnet run

Testing Payments (Stripe)
Stripe test mode is enabled in this project.

 Test Card Details (Stripe)
Use these to complete a successful payment during checkout:

Card Type	Number	Expiry	CVC
Visa (successful)	4242 4242 4242 4242	Any future date	Any 3 digits
3D Secure Card	4000 0027 6000 3184	Any future date	Any 3 digits
Payment Declined	4000 0000 0000 9995	Any future date	Any 3 digits

 To simulate success:
Just use 4242 4242 4242 4242

Features
🛒 Storefront
Browse products by categories
Product listing with images, descriptions & pricing
Banner offers (Shop Now, Order Now, Grab Offer)
Mobile-friendly UI with smooth animations

🧺 Cart & Checkout
Add/remove items
Increase/decrease quantity
Cart drawer UI
Live total calculation
Proceed to checkout
Creates order before payment
Stripe checkout integration

💳 Payments (Stripe)
Secure hosted checkout page
Auto-redirect after payment
Backend order verification
Test mode ready (test cards included below)

 User Account
JWT login & register
Password reset via email
Saved address
Profile view
My Orders list with order items

🔐 Authentication & Security
JWT authentication
Protected routes
Email verification (SendGrid/Gmail SMTP)

🏗️ Tech Stack
Frontend
React + Vite
TypeScript
Redux Toolkit
Axios
Tailwind CSS
Lucide Icons

Backend
.NET Core 8 Web API
Entity Framework Core
MySQL
Stripe Checkout
SendGrid Email Service

Deployment
Frontend → Vercel
Backend → Railway
Database → aiven

🤝 Contributing

Fork project

Create feature branch

Commit changes

Create pull request

📜 License
This project is licensed under the MIT License.

❤️ Made with Love
Built with passion by Abdullah Mubasir.
