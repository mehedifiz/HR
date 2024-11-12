
const Footer = () => {
  return (
    <div>
      <section>
      </section>

      {/* Footer Container */}
      <footer className="footer footer-center text-gray-800 py-8 px-4 bg-gradient-to-r from-gray-200 to-gray-100  ">
        {/* Footer Text and Styles */}
        <aside className="text-center space-y-3">
          {/* Company Name with Unique Styling */}
          <p className="text-lg font-roboto tracking-wide">
            &copy; 2024 - All rights reserved by
               Asset Manage
            
          </p>

          {/* Additional Info */}
          <p className="text-sm font-lato tracking-tight italic">
            Empowering Your Digital Transformation Journey
          </p>

          {/* Decorative Line */}
          <div className="w-1/4 mx-auto border-b-2 border-primary opacity-60"></div>

          {/* Address and Contact Info */}
          <p className="text-xs font-semibold">
            123 Digital Avenue, Tech City, Innovation State, 12345
          </p>
          <p className="text-xs font-semibold">Contact: support@manageasset.com | +1 (123) 456-7890</p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mt-4 text-primary">
            <a href="#facebook" aria-label="Facebook" className="hover:text-white">Facebook</a>
            <a href="#twitter" aria-label="Twitter" className="hover:text-white">Twitter</a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
