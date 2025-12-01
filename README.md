🛍️ Nest E-Commerce Web App: 
Project SpecificationA modern full-stack e-commerce shopping experience built with React, Redux Toolkit, 
.NET Core Web API, MySQL Server, Entity Framework, Stripe Checkout, and Railway/Vercel Deployment.This application provides a seamless shopping experience with secure authentication, a robust cart system, order creation, and payment processing via Stripe.

1.Technical Stack & Dependencies
This project utilizes a modern and robust tech stack for both the client and server.CategoryComponentKey Technologies UsedFrontendClientReact + Vite, TypeScript, Redux Toolkit (State Management), Axios, Tailwind CSS (Styling), Lucide IconsBackendServer/API.NET Core 8 Web API, Entity Framework Core, MySQL (Database), Stripe Checkout (Payments), SendGrid (Email Service)DeploymentInfrastructureFrontend $\to$ Vercel, Backend $\to$ Railway, Database $\to$ aiven

2. Core Features & Functionality
2.1. 🛒 Storefront & BrowsingCategorized Browsing: Users can easily browse products filtered by categories.Product Presentation: Detailed product listing including images, descriptions, and pricing.Promotional Content: Integrated Banner offers (e.g., Shop Now, Order Now, Grab Offer) for highlighting promotions.User Experience: Features a Mobile-friendly UI with smooth animations for a great shopping experience across devices.
   
2.2. 🧺 Cart & Checkout SystemItem Management: Functionality to Add/remove items from the cart.Quantity Control: Ability to Increase/decrease quantity of items in the cart.UI/UX: Utilizes a seamless Cart drawer UI for easy access.Live Calculations: Provides a Live total calculation of the cart value.Order Flow: Users can Proceed to checkout, which automatically creates the order before payment is initiated.Payment Integration: Fully integrated with Stripe Checkout for secure payment processing.

2.3. 💳 Payments (Stripe)Security: Uses Stripe's Secure hosted checkout page for handling sensitive card data.Flow Control: Auto-redirect after a successful payment.Validation: Includes Backend order verification post-payment to confirm transaction validity.Testing: The project is Test mode ready, with test card details provided for developers.

2.4.  User Account & AuthenticationAccess: Secure JWT login & register system.Recovery: Password reset functionality via email verification.Profile Data: Users can view their Profile and manage a Saved address.Order History: Comprehensive My Orders list showing past orders and their respective items.

2.5. 🔐 Security & VerificationCore Security: Implements robust JWT authentication.Access Control: Utilization of Protected routes to restrict unauthorized access to specific pages.Email Verification: Email verification implemented using SendGrid/Gmail SMTP.3.

⚙️ Installation & Setup Guide3.1. Clone RepositoryClone the project:Bashgit clone https://github.com/MUUBAA/nest-ecommerce.git
Navigate into the project directory:
Bash: cd nest

3.2. Frontend Setup (Client)Change directory to the client folder:Bashcd client
Install dependencies:
Bash: npm install
Run the development server:
Bash: npm run dev

3.3. Backend Setup (Server)Change directory to the server folder:Bashcd server/Server
Restore dependencies:
Bash:  dotnet restore

Build the project:
Bash: dotnet build

Update the database schema (using Entity Framework):
Bash: dotnet ef database update

Run the API server:
Bash: dotnet run
4. Testing Payments (Stripe Test Mode)Stripe test mode is enabled in this project.
 Use the following card details to complete a successful payment during checkout:
 card number : 4242 4242 4242 4242
 ccv: any three digits
 expiry: any valid future month and year.

5.  Contributing & Licensing
6.  5.1. Contributing GuidelinesFork the project repository.Create your feature branch.Commit your changes following best practices.Create a pull request to merge your contributions.
7.  5.2. LicenseThis project is licensed under the MIT License.Built with passion by Abdullah Mubasir.
