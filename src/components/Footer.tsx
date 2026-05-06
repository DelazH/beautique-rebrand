import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">✨ KC Beautique</h3>
            <p className="text-gray-300">
              Your premier destination for beauty services and products.
              Kaylah and her team are dedicated to making you feel beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services" className="hover:text-pink-400">Services</a></li>
              <li><a href="/products" className="hover:text-pink-400">Products</a></li>
              <li><a href="/about" className="hover:text-pink-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-pink-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <span>info@kcbeautique.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Kansas City, MO</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-pink-400"><Instagram size={20} /></a>
                <a href="#" className="hover:text-pink-400"><Facebook size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 KC Beautique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
