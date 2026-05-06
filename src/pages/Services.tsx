import { useState } from 'react';
import { useServices } from '../lib/hooks/useServices';
import { ServiceCard } from '../components/ServiceCard';
import { Loader2 } from 'lucide-react';

export function Services() {
  const { data: services, isLoading, error } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = services
    ? ['All', ...new Set(services.map(s => s.category))]
    : ['All'];

  const filteredServices = services
    ? selectedCategory === 'All'
      ? services
      : services.filter(s => s.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our full range of beauty services, designed to help you look and feel your best.
        </p>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
            Failed to load services. Please try again later.
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-600">
            No services found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => window.location.href = `/booking?serviceId=${service.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
