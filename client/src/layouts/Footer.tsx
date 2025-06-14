import { FiPhone, FiMail, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi"
import { Link } from "react-router-dom"

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
            <p className="text-sm mb-4">Texnologiya məhsulları üçün ən etibarlı ünvan.</p>
            <div className="flex gap-4 mt-4">
              <Link to="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FiYoutube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Müştəri Xidmətləri</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/elaqe" className="text-sm hover:text-white">
                  Əlaqə
                </Link>
              </li>
              <li>
                <Link to="/suallar" className="text-sm hover:text-white">
                  Tez-tez Verilən Suallar
                </Link>
              </li>
              <li>
                <Link to="/qaytarma-ve-deyisdirme" className="text-sm hover:text-white">
                  Qaytarma və Dəyişdirmə
                </Link>
              </li>
              <li>
                <Link to="/catdirilma" className="text-sm hover:text-white">
                  Kargo və Çatdırılma
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Korporativ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/haqqimizda" className="text-sm hover:text-white">
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link to="/magazalar" className="text-sm hover:text-white">
                  Mağazalarımız
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Əlaqə</h3>
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
          <p>© 2023 Smart Store. Bütün hüquqlar qorunur.</p>
          {/* <div className="flex gap-4 mt-4 md:mt-0 justify-center md:justify-start">
            <Link to="/mexfilik-siyaseti" className="hover:text-white">
              Məxfilik Siyasəti
            </Link>
            <Link to="/istifade-sertleri" className="hover:text-white">
              İstifadə Şərtləri
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
