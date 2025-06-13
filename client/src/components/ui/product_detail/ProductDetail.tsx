import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Product } from '@/types/productTypes';
import { FiHeart, FiStar, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '@/data/data';

const demoProduct: Product = {
  id: 1,
  name: 'iPhone 16 Pro Max 256GB',
  description:
    "iPhone 16 Pro Max, A18 Pro işlemci, gelişmiş kamera sistemi, Camera Control özelliği ve uzun pil ömrü ile Apple'ın en güçlü telefonu.",
  price: 69999,
  discountPrice: 67999,
  category: 'Telefon',
  subcategory: 'Apple',
  imageUrl: 'https://placehold.co/600x800',
  rating: 4.8,
  stock: 10,
  brand: 'Apple',
  tags: ['iPhone', '16 Pro Max', 'Apple'],
  isNew: true,
  isFeatured: true,
  colors: ['Siyah', 'Beyaz', 'Titanyum', 'Mavi'],
  sizes: ['128GB', '256GB', '512GB', '1TB'],
};

// Ürün görselleri (demo)
const productImages = [
  'https://placehold.co/600x800',
  'https://placehold.co/600x800/ccc/333',
  'https://placehold.co/600x800/333/ccc',
  'https://placehold.co/600x800/blue/white',
];

export default function ProductDetail() {
  // const { id } = useParams<{ id: string }>();
  const [product] = useState<Product>(demoProduct);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  const discountPercentage = product.discountPrice
    ? Math.round(
      ((product.price - product.discountPrice) / product.price) * 100
    )
    : 0;

  // Sepete ekle fonksiyonu
  const addToCart = () => {
    console.log('Sepete eklendi:', {
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
    // Gerçek uygulamada burada sepete ekleme işlemi yapılacak
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ürün Görselleri */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <img
              src={productImages[activeImage]}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>

          {/* Küçük Resimler */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImage === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200'
                  }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - Görsel ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${product.stock <= 5
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                    }`}
                >
                  {product.stock <= 5
                    ? `Son ${product.stock} Ürün`
                    : 'Stokta Var'}
                </span>
                {product.isNew && (
                  <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    Yeni
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400 mr-2">
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
              <span className="text-sm text-gray-500">
                ({product.rating.toFixed(1)}) - 124 Baxış
              </span>
            </div>

            <div className="mt-1">
              <span className="text-sm font-medium text-blue-600">
                {product.brand}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-end gap-2">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-gray-800">
                    {product.discountPrice.toLocaleString()}₺
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.price.toLocaleString()}₺
                  </span>
                  <span className="ml-2 text-sm font-medium text-red-600">
                    %{discountPercentage} indirim
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">
                  {product.price.toLocaleString()}₺
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">Tüm vergiler dahil</p>
          </div>

          {/* Ürün Açıklaması */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Ürün Açıklaması
            </h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Renk Seçimi */}
          {product.colors && product.colors.length > 0 && (
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
          )}

          {/* Boyut Seçimi */}
          {product.sizes && product.sizes.length > 0 && (
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
          )}

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
              onClick={addToCart}
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
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Ürün Özellikleri
            </button>
          </nav>
        </div>

        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
            <div className="sm:col-span-1">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Marka</dt>
                <dd className="text-sm text-gray-900">{product.brand}</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="text-sm text-gray-900">iPhone 16 Pro Max</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">
                  İşletim Sistemi
                </dt>
                <dd className="text-sm text-gray-900">iOS 18</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">
                  Ekran Boyutu
                </dt>
                <dd className="text-sm text-gray-900">6.7 inç</dd>
              </div>
            </div>
            <div className="sm:col-span-1">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">
                  Dahili Depolama
                </dt>
                <dd className="text-sm text-gray-900">{selectedSize}</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Kamera</dt>
                <dd className="text-sm text-gray-900">48 MP Fusion</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">İşlemci</dt>
                <dd className="text-sm text-gray-900">A18 Pro</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Renk</dt>
                <dd className="text-sm text-gray-900">{selectedColor}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benzer Ürünler */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Benzer Ürünler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={`/mehsullar/${product.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      // Favorilere ekleme işlemi burada yapılabilir
                    }}
                  >
                    <FiHeart className="text-gray-600" />
                  </button>
                </div>
                {product.oldPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.oldPrice) * 100)}%
                    İndirim
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 text-lg line-clamp-2 group-hover:text-red-500">
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
                  <span className="text-xl font-bold">{product.price} AZN</span>
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
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      // Sepete ekleme işlemi burada yapılabilir
                    }}
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
