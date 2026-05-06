import { useProducts } from '../lib/hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

export function Products() {
  const { data: products, isLoading, error } = useProducts();

  const handleAddToCart = (productId: string) => {
    // TODO: Implement cart functionality
    alert(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Browse our curated collection of premium beauty and skincare products.
          Handpicked for quality and effectiveness.
        </p>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
            Failed to load products. Please try again later.
          </div>
        ) : products && products.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-600">
            No products available. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
