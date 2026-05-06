import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ShoppingBag, Heart } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to KC Beautique</h1>
          <p className="text-xl mb-8 opacity-90">
            Your premier destination for beauty services and exclusive products.
            Discover the art of self-care with Kaylah and her talented team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Explore Services
            </Link>
            <Link
              to="/booking"
              className="bg-purple-800 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity border-2 border-white"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose KC Beautique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-12 h-12" />}
              title="Premium Services"
              description="Expert beauty services tailored to your needs"
            />
            <FeatureCard
              icon={<Heart className="w-12 h-12" />}
              title="Quality Products"
              description="Carefully curated beauty and skincare products"
            />
            <FeatureCard
              icon={<Calendar className="w-12 h-12" />}
              title="Easy Booking"
              description="Schedule appointments at your convenience"
            />
            <FeatureCard
              icon={<ShoppingBag className="w-12 h-12" />}
              title="Exclusive Deals"
              description="Special offers and loyalty rewards"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to feel beautiful?</h2>
          <p className="text-lg mb-6 opacity-90">Book your appointment today and experience the difference</p>
          <Link
            to="/booking"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-pink-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
