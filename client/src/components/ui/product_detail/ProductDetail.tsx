import { LoadingImage } from "@/components/LoadingImage";
import { productService } from "@/services/product-service";
import { formatDate } from "@/utils/date-time";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [imgIndex, setImageIndex] = useState(0);

  const handleChangeImage = (str: 'left' | 'right') => {
    if (!product?.images || product.images.length === 0) return;

    setImageIndex(prev => {
      const len = product.images.length;
      if (str === 'right') {
        return (prev + 1) % len;
      } else {
        return (prev - 1 + len) % len;
      }
    });
  }

  const { data: product } = useQuery({
    queryKey: ['get/product_detail', id],
    queryFn: () => productService.getProduct(String(id)),
    enabled: !!id
  });

  const productShareTime = formatDate(product?.createdAt!);

  useEffect(() => {
    setImageIndex(0)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ürün Görselleri */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden flex h-[400px] relative">
            {product?.images ?
              <img
                src={product?.images[imgIndex]}
                alt={product?.name}
                className="w-full h-auto object-contain"
              />
              : <LoadingImage />
            }

            <button
              onClick={() => handleChangeImage('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => handleChangeImage('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto p-3">
            {product?.images ?
              product?.images?.map((image, index) => (
                <button
                  onClick={() => setImageIndex(index)}
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ring-2 ring-offset-2 transition-all ${index === imgIndex ? 'ring-blue-500' : 'ring-transparent'}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Görsel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))
              : <LoadingImage />
            }
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div className="flex justify-between items-center flex-1">
                <div className="text-2xl sm:text-3xl font-bold text-gray-800">{product?.name}</div>
                <span className="text-xs font-medium text-gray-600" >paylaşıldı: {productShareTime}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  Yeni
                </span>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400 mr-2">
                {/* {Array.from({ length: 5 }).map((_, i) => (
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
                ))} */}
              </div>
              <span className="text-sm text-gray-500">
                {/* ({product.rating.toFixed(1)}) - 124 Baxış */}
              </span>
            </div>

            <div className="mt-1">
              <span className="text-sm font-medium text-blue-600">
                {/* {product.brand} */}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 flex items-center">
            <span className="flex items-end gap-2 text text-3xl font-semibold">
              {product?.price} AZN
            </span>

          </div>

          {/* Ürün Açıklaması */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Məhsul haqqında
            </h2>
            <p className="text-gray-600">
              {product?.description}
            </p>
          </div>

          {/* Renk Seçimi */}
          {/* {product.colors && product.colors.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2">Renk</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-full text-sm transition-all ${selectedColor === color
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Boyut Seçimi */}
          {/* {product.sizes && product.sizes.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2">
                Kapasite
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md text-sm transition-all ${selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Miktar */}
          {/* <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Miktar</h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  quantity <= 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                -
              </button>
              <span className="text-gray-700 w-8 text-center">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  quantity >= product.stock
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                +
              </button>
            </div>
          </div> */}

          {/* Sepete Ekle ve Hemen Al Butonları */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              Satıcıya Zəng Et
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors">
              Satıcıya Bildir
            </button>
          </div>

          {/* Ekstra Bilgiler */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Hızlı Teslimat
                </h3>
                <p className="text-xs text-gray-500">
                  3 iş günü içinde kargoya verilir
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Güvenli Ödeme
                </h3>
                <p className="text-xs text-gray-500">
                  256-bit SSL şifreleme ile güvenli ödeme
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ürün Özellikleri ve Sekmeler */}
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
          {/* Sol Kolon */}
          <div className="sm:col-span-1">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <dt className="text-sm font-medium text-gray-500">Marka</dt>
              <dd className="text-sm text-gray-900">{product?.name}</dd>
            </div>

            {product?.features &&
              Object.entries(product.features)
                .slice(0, Math.ceil(Object.entries(product.features).length / 2))
                .map(([key, value], i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                    <dt className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/_/g, ' ')}
                    </dt>
                    <dd className="text-sm text-gray-900 text-right">
                      {typeof value === 'string' || typeof value === 'number' ? (
                        value
                      ) : Array.isArray(value) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : typeof value === 'object' ? (
                        <ul className="space-y-1">
                          {Object.entries(value).map(([subKey, subValue], idx) => (
                            <li key={idx}>
                              <span className="font-medium text-gray-600">{subKey.replace(/_/g, ' ')}:</span>{' '}
                              {typeof subValue === 'string' || typeof subValue === 'number'
                                ? subValue
                                : JSON.stringify(subValue)}
                            </li>
                          ))}
                        </ul>

                      ) : (
                        '-'
                      )}
                    </dd>
                  </div>
                ))}
          </div>

          {/* Sağ Kolon */}
          <div className="sm:col-span-1">
            {product?.features &&
              Object.entries(product.features)
                .slice(Math.ceil(Object.entries(product.features).length / 2))
                .map(([key, value], i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                    <dt className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/_/g, ' ')}
                    </dt>
                    <dd className="text-sm text-gray-900 text-right">
                      {typeof value === 'string' || typeof value === 'number' ? (
                        value
                      ) : Array.isArray(value) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : typeof value === 'object' ? (
                        <ul className="space-y-1">
                          {Object.entries(value).map(([subKey, subValue], idx) => (
                            <li key={idx}>
                              <span className="font-medium text-gray-600">{subKey.replace(/_/g, ' ')}:</span>{' '}
                              {subValue as any}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        '-'
                      )}
                    </dd>
                  </div>
                ))}
          </div>
        </div>
      </div>




    </div >
  );
}
