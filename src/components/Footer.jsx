import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-footer py-20 px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-7xl mx-auto">
        <div>
          <h4 className="text-lg font-medium mb-4">Contact Us</h4>
          <p className="text-sm text-navy leading-relaxed">
            Valencia Town, Commercial Market<br />
            H Block, 7/14 Office<br />
            Lahore, Pakistan<br />
            <br />
            +92 329 4609497<br />
            Lepus4003@gmail.com
          </p>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-4">Important Links</h4>
          <div className="flex flex-col gap-3">
            <Link
              to="/about"
              className="text-sm text-navy hover:opacity-70 transition-opacity"
            >
              About Our Brand
            </Link>
            <Link
              to="/faqs"
              className="text-sm text-navy hover:opacity-70 transition-opacity"
            >
              FAQs
            </Link>
            <Link
              to="/return-policy"
              className="text-sm text-navy hover:opacity-70 transition-opacity"
            >
              Return & Exchange
            </Link>
            <Link
              to="/terms"
              className="text-sm text-navy hover:opacity-70 transition-opacity"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-navy hover:opacity-70 transition-opacity"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-tweed mt-20">
        © Lepus. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer

