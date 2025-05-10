import { useState } from 'react';
import { FEATURED_PRODUCTS } from '@/data/data';
import { FiStar, FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function WislhistPage() {
  const [wishlistItems, setWishlistItems] = useState(FEATURED_PRODUCTS);

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Seçilmişlər</h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FiHeart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 mb-2">
            Seçilmişlər siyahınız boşdur
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Bəyəndiyiniz məhsulları Seçilmişlər siyahınıza əlavə edin,daha sonra
            onlara asanlıqla baxa bilərsiniz.
          </p>
          <Link
            to="/mehsullar"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group relative flex flex-col"
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Favorilerden çıkar"
              >
                <FiTrash2 />
              </button>

              <Link to={`/mehsullar/${product.id}`} className="flex-grow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />
                  {product.oldPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}
                      % İndirim
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 text-lg line-clamp-2 group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-400">
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar
                        className={
                          product.rating >= 4.8
                            ? 'fill-current'
                            : 'fill-current opacity-30'
                        }
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold">
                      {product.price} AZN
                    </span>
                    {product.oldPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.oldPrice} AZN
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm">
                      {product.installment}
                    </span>
                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
