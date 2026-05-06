import { Service } from '../types';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook?: () => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-32"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <Clock size={18} />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-pink-600 font-bold">
            <DollarSign size={18} />
            <span>${service.price.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={onBook}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
