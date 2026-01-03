const PrivacyPolicy = () => {
  return (
    <div className="pt-40 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium mb-12">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-tweed leading-relaxed">
        <section>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            At Lepus, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Name, email address, phone number, and shipping address</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Order history and preferences</li>
            <li>Communication preferences</li>
          </ul>
          <p className="mb-4">
            We also automatically collect certain information when you visit our website, such as your IP address, browser type, and browsing behavior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and our products</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and customer experience</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Information Sharing</h2>
          <p className="mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Service providers who help us operate our business (shipping companies, payment processors)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access and update your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Cookies</h2>
          <p className="mb-4">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy

