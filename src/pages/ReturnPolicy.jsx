const ReturnPolicy = () => {
  return (
    <div className="pt-40 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium mb-12">
        Return & Exchange Policy
      </h1>

      <div className="space-y-8 text-tweed leading-relaxed">
        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Returns</h2>
          <p className="mb-4">
            We want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, you may return items within 7 days of delivery.
          </p>
          <p className="mb-4">
            To be eligible for a return, items must be:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Unworn and unwashed</li>
            <li>In original packaging with all tags attached</li>
            <li>In the same condition as when you received them</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">How to Return</h2>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Contact us at Lepus4003@gmail.com or call +92 329 4609497 to initiate a return</li>
            <li>Provide your order number and reason for return</li>
            <li>We will provide you with return instructions and a return authorization number</li>
            <li>Package the item securely with the original packaging</li>
            <li>Ship the item back to our address: Valencia Town, Commercial Market, H Block, 7/14 Office, Lahore, Pakistan</li>
          </ol>
          <p className="mb-4">
            Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Exchanges</h2>
          <p className="mb-4">
            We offer exchanges for different sizes or colors, subject to availability. To exchange an item:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Follow the return process above</li>
            <li>Specify the size or color you would like to exchange for</li>
            <li>If the requested item is available, we will ship it to you once we receive your return</li>
          </ol>
          <p className="mb-4">
            If the item you want is not available, we will process a refund instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Refunds</h2>
          <p className="mb-4">
            Once we receive and inspect your returned item, we will process your refund. Refunds will be issued to the original payment method within 5-7 business days.
          </p>
          <p className="mb-4">
            Please note that original shipping charges are non-refundable unless the return is due to our error.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Non-Returnable Items</h2>
          <p className="mb-4">The following items cannot be returned:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Items that have been worn, washed, or damaged</li>
            <li>Items without original tags or packaging</li>
            <li>Items purchased more than 7 days ago</li>
            <li>Sale items (unless defective)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our return policy, please contact us:
          </p>
          <p className="text-navy">
            Email: <a href="mailto:Lepus4003@gmail.com" className="underline">Lepus4003@gmail.com</a>
            <br />
            Phone: <a href="tel:+923294609497" className="underline">+92 329 4609497</a>
            <br />
            Address: Valencia Town, Commercial Market, H Block, 7/14 Office, Lahore, Pakistan
          </p>
        </section>
      </div>
    </div>
  )
}

export default ReturnPolicy

