const FAQs = () => {
  const faqs = [
    {
      question: 'What is your shipping policy?',
      answer: 'We offer free shipping on all orders within Pakistan. Orders are typically processed within 1-2 business days and delivered within 5-7 business days.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our shipping partner\'s website.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached. Please visit our Return Policy page for more details.',
    },
    {
      question: 'How do I exchange an item?',
      answer: 'To exchange an item, please contact us at orders@lepus.com.pk or call +92 329 4609497. We will guide you through the exchange process.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash on delivery, bank transfers, and major credit/debit cards. All transactions are secure and encrypted.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within Pakistan. We are working on expanding our shipping options in the future.',
    },
    {
      question: 'How do I care for my Lepus garments?',
      answer: 'Please follow the care instructions on the garment label. Most of our items are machine washable on gentle cycle. We recommend air drying to maintain quality.',
    },
    {
      question: 'What sizes do you offer?',
      answer: 'We offer sizes S, M, L, XL, and XXL for most items. Some items may have different sizing. Please refer to the product page for specific size information and our sizing chart.',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 24 hours of placement. Please contact us immediately at orders@lepus.com.pk if you need to make changes.',
    },
    {
      question: 'Do you have a physical store?',
      answer: 'No, we do not have a physical store yet, but we plan to in the future.',
    },
  ]

  return (
    <div className="pt-40 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-medium mb-3">{faq.question}</h2>
            <p className="text-tweed leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-footer">
        <h2 className="text-2xl font-medium mb-4">Still have questions?</h2>
        <p className="text-tweed mb-4">
          If you can't find the answer you're looking for, please don't hesitate to reach out to us.
        </p>
        <p className="text-navy">
          Email: <a href="mailto:orders@lepus.com.pk" className="underline">orders@lepus.com.pk</a>
          <br />
          Phone: <a href="tel:+923294609497" className="underline">+92 329 4609497</a>
        </p>
      </div>
    </div>
  )
}

export default FAQs

