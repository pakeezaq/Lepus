# Lepus Backend Server

Backend server for Lepus ecommerce website with order processing and email notifications.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

3. Configure your `.env` file:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Gmail App Password (not regular password)
   - `ADMIN_EMAIL`: Email where orders are sent (currently: nizaam.ilm@gmail.com)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (for payment gateway)

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### POST /api/orders
Creates a new order and sends confirmation emails.

Request body:
```json
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+923001234567",
    "address": "123 Main St",
    "city": "Lahore",
    "postalCode": "54000"
  },
  "items": [...],
  "subtotal": 3500,
  "shipping": 150,
  "total": 3650,
  "paymentMethod": "cod"
}
```

### POST /api/payments/create-intent
Creates a Stripe payment intent for online payments.

## Email Notifications

- Admin receives order details at `ADMIN_EMAIL`
- Customer receives order confirmation at their provided email

