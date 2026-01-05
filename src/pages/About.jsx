const About = () => {
  return (
    <div className="pt-40 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium mb-12 text-center">
        About Lepus
      </h1>

      <div className="space-y-8 text-tweed leading-relaxed">
        <section>
          <p className="mb-4 text-lg">
            Lepus represents a philosophy of timeless design and enduring quality. We believe in creating garments that transcend seasons, built with restraint and crafted to last beyond time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Our Vision</h2>
          <p className="mb-4">
            At Lepus, we envision a wardrobe that speaks to quiet confidence and refined elegance. Our collections are designed for those who appreciate minimalism, quality craftsmanship, and garments that become essential parts of their daily lives.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Quality & Craftsmanship</h2>
          <p className="mb-4">
            Every piece in our collection is thoughtfully designed and carefully crafted. We source premium materials—from 100% combed cotton to soft-touch fabrics—ensuring that each garment offers both comfort and durability.
          </p>
          <p className="mb-4">
            Our attention to detail extends to every aspect of production, from the selection of yarns to the final stitch. We believe that true luxury lies in the subtle details that make a garment exceptional.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Seasonless Design</h2>
          <p className="mb-4">
            Our philosophy centers on creating seasonless pieces that work year-round. Whether it's our winter collection's layered essentials or our summer collection's breathable basics, each piece is designed to integrate seamlessly into your wardrobe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Sustainability</h2>
          <p className="mb-4">
            We are committed to responsible production practices. By creating timeless pieces that last, we encourage a more sustainable approach to fashion—one that values quality over quantity and longevity over trends.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Our Collections</h2>
          <p className="mb-4">
            From the Belmont Winter Collection's oversized pullovers and half-zip sweaters to our Summer Collection's premium polos and T-shirts, each collection reflects our commitment to refined simplicity and everyday elegance.
          </p>
          <p className="mb-4">
            Our Headwear Drop offers quiet statements for everyday wear, while our signature perfumes capture the essence of modern sophistication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-navy mb-4">Contact Us</h2>
          <p className="mb-4">
            We'd love to hear from you. Whether you have questions about our products, need assistance with an order, or simply want to connect, we're here to help.
          </p>
          <p className="text-navy">
            <strong>Store Location:</strong><br />
            Valencia Town, Commercial Market<br />
            H Block, 7/14 Office<br />
            Lahore, Pakistan
          </p>
          <p className="text-navy mt-4">
            <strong>Email:</strong> <a href="mailto:orders@lepus.com.pk" className="underline">orders@lepus.com.pk</a>
            <br />
            <strong>Phone:</strong> <a href="tel:+923294609497" className="underline">+92 329 4609497</a>
          </p>
        </section>

        <section className="mt-16 p-8 bg-footer">
          <p className="text-center text-navy">
            Thank you for being part of the Lepus community. We're honored to be part of your journey toward a more refined, intentional wardrobe.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About

