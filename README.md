# Lepus Website

A modern, elegant ecommerce website for Lepus fashion brand, built with React and Tailwind CSS.

## Features

- **Home Page** with hero video, collection previews
- **Collection Pages** for Winter Men/Women and Summer Men/Women
- **Product Detail Pages** with image galleries, size selection, and add to cart
- **Shopping Cart** with quantity management
- **Checkout Flow** with payment method selection (COD/Online)
- **Backend Server** with order processing and email notifications
- **Footer Pages**: FAQs, Return Policy, Privacy Policy, Terms & Conditions, About
- **Responsive Design** optimized for all devices
- **Smooth Animations** with fade-in effects

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Nodemailer (for email notifications)
- Stripe (for payment gateway)

## Getting Started

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

3. Configure your `.env` file:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Gmail App Password (see server/README.md for setup)
   - `ADMIN_EMAIL`: Email where orders are sent (currently: nizaam.ilm@gmail.com)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (for payment gateway)

4. Start backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

## Project Structure

```
src/
  ├── components/     # Reusable components (Navbar, Footer, ProductCard)
  ├── context/        # React Context (CartContext, RecentlyViewedContext)
  ├── data/           # Product data
  ├── pages/          # Page components
  │   ├── collections/ # Collection pages
  │   └── ...
  └── App.jsx         # Main app component with routing

server/
  ├── routes/         # API routes
  │   ├── orders.js   # Order processing
  │   └── payments.js # Payment gateway
  └── server.js       # Express server
```

## Design System

- **Colors**: Ivory (#f6f3ee), Navy (#1c2331), Tweed (#6b5f4b), Olive (#4a5a3c), Camel (#c2a77d)
- **Fonts**: Valetia Script (logo), Montserrat (body)
- **Style**: Minimal, elegant, Ralph Lauren-inspired layout

## Assets

All assets (images, fonts, videos) are located in the `public/assets/` directory.

## Payment Methods

- **Cash on Delivery (COD)**: Pay when you receive your order
- **Online Payment**: Pay securely with debit/credit card via Stripe

## Email Notifications

When an order is placed:
- Admin receives order details at `ADMIN_EMAIL`
- Customer receives order confirmation at their provided email

## Notes

- Cart state is persisted in localStorage
- Product images use placeholder URLs for summer collection items
- All product data is stored in `src/data/products.js`
- Backend requires Gmail App Password for email functionality
