import { useState } from 'react';
import { useServices } from '../lib/hooks/useServices';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

export function Booking() {
  const { data: services } = useServices();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit booking to Supabase
    alert('Booking submitted! We will contact you shortly to confirm.');
    setFormData({ name: '', email: '', phone: '', serviceId: '', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Book an Appointment</h1>
        <p className="text-center text-gray-600 mb-12">
          Reserve your spot with our expert beauty professionals
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 flex items-center space-x-2"
              />
            </div>

            {/* Service Selection */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Service</h2>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
              >
                <option value="">Choose a service...</option>
                {services?.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price.toFixed(2)} ({service.duration} min)
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Date & Time</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 flex items-center space-x-2"
                >
                  <option value="">Select time...</option>
                  {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
