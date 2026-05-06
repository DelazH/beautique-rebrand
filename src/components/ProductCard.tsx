import { Product } from '../types';
import { ShoppingCart, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
          {isOutOfStock ? (
            <span className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <AlertCircle size={16} />
              <span>Out of Stock</span>
            </span>
          ) : (
            <span className="text-green-600 text-sm font-medium">In Stock</span>
          )}
        </div>
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={18} />
          <span>{isOutOfStock ? 'Unavailable' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
