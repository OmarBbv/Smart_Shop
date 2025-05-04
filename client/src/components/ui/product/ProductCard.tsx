import { Product } from '@/types/productTypes';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
      <Link to={`/mehsullar/${product.id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-0 left-0 w-full p-3 flex justify-between">
            <div className="flex flex-col gap-2">
              {product.isNew && (
                <span className="inline-flex items-center bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                  Yeni
                </span>
              )}

              {product.stock <= 5 && (
                <span className="inline-flex items-center bg-yellow-500 text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                  Son {product.stock}
                </span>
              )}
            </div>

            {product.discountPrice && (
              <span className="inline-flex items-center bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                %{discountPercentage}
              </span>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-xs font-medium text-blue-600">
              {product.brand}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-end gap-1">
              {product.discountPrice ? (
                <>
                  <span className="text-xl font-bold text-gray-800">
                    {product.discountPrice.toLocaleString()}₺
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.price.toLocaleString()}₺
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-800">
                  {product.price.toLocaleString()}₺
                </span>
              )}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Sepete Ekle
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
