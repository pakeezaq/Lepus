const Terms = () => {
  return (
    <div className="pt-40 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium mb-12">
        Terms & Conditions
      </h1>

      <div className="space-y-8 text-tweed leading-relaxed">
        <section>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            Please read these Terms and Conditions carefully before using the Lepus website and making a purchase. By accessing or using our website, you agree to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Products and Pricing</h2>
          <p className="mb-4">
            We strive to provide accurate product descriptions, images, and pricing. However, we reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
          </p>
          <p className="mb-4">
            All prices are in Pakistani Rupees (PKR) and are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Orders and Payment</h2>
          <p className="mb-4">
            When you place an order, you are making an offer to purchase products at the prices stated. We reserve the right to accept or reject your order for any reason.
          </p>
          <p className="mb-4">
            Payment must be received before we ship your order. We accept cash on delivery, bank transfers, and major credit/debit cards. All payments are processed securely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Shipping and Delivery</h2>
          <p className="mb-4">
            We ship within Pakistan. Shipping times and costs will be provided at checkout. We are not responsible for delays caused by shipping carriers or customs.
          </p>
          <p className="mb-4">
            Risk of loss and title for products pass to you upon delivery to the carrier.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Returns and Refunds</h2>
          <p className="mb-4">
            Please refer to our Return Policy for detailed information about returns and refunds. Returns must be made within 7 days of delivery and items must be in original condition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of Lepus and is protected by copyright and trademark laws. You may not use our content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, Lepus shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Governing Law</h2>
          <p className="mb-4">
            These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms & Conditions, please contact us:
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

export default Terms

