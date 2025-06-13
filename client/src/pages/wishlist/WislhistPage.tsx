import { useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishList-service';

export default function WislhistPage() {
  const { data: wishlistItems, refetch } = useQuery({
    queryKey: ['get/all-wishlist'],
    queryFn: () => wishlistService.allWishlist()
  })

  const mutate = useMutation({
    mutationKey: ['delete/wishlist'],
    mutationFn: (id: number) => wishlistService.removeItemFromWishlist(id),
    onSuccess: () => {
      refetch();
    }
  })

  const removeFromWishlist = async (id: number) => {
    mutate.mutate(id);
  }

  useEffect(() => {
    console.log('wishlistItems', wishlistItems);
  }, [wishlistItems])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Seçilmişlər</h1>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FiHeart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 mb-2">
            Seçilmişlər siyahınız boşdur
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Bəyəndiyiniz məhsulları Seçilmişlər siyahınıza əlavə edin, daha sonra
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
          {wishlistItems?.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group relative flex flex-col"
            >
              <button
                onClick={() => removeFromWishlist(product.product.id)}
                className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Favorilerden çıkar"
              >
                <FiTrash2 />
              </button>

              <Link to={`/mehsullar/${product.productId}`} className="flex-grow">
                <div className="relative">
                  <img
                    src={product.product.images[0] || 'placeholder'}
                    alt={product.product.name}
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 text-lg line-clamp-2 group-hover:text-red-500 transition-colors">
                    {product.product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold">
                      {product.product.price} AZN
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm">
                      {product.product.description}
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
