import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
} from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-white">SMART STORE</span>
            </div>
            <p className="text-sm mb-4">
              Teknoloji ürünleri için en güvenilir adres.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  İade ve Değişim
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Kargo ve Teslimat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Kariyer
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Mağazalarımız
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">
                  Kurumsal Satış
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FiPhone className="text-red-500" />
                <span className="text-sm">+994 50 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-red-500" />
                <span className="text-sm">info@smartstore.az</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center md:text-left md:flex justify-between items-center">
          <p>© 2023 Smart Store. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-4 md:mt-0 justify-center md:justify-start">
            <a href="#" className="hover:text-white">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-white">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
