import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'pkr', metadata = {} } = req.body

    // Convert amount to smallest currency unit (paisa for PKR)
    const amountInPaisa = Math.round(amount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaisa,
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message,
    })
  }
}

