import { CheckCircle, XCircle, Clock, Package, RefreshCw, AlertTriangle, Phone, Mail } from "lucide-react"

export default function ReturnExchangePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Qaytarma və Dəyişdirmə</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">Məhsullarınızı asanlıqla qaytarın və ya dəyişdirin</p>
                    </div>
                </div>
            </section>

            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">14 Gün Müddət</h3>
                            <p className="text-gray-600">Alış tarixindən etibarən 14 gün ərzində qaytarma imkanı</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RefreshCw className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pulsuz Dəyişdirmə</h3>
                            <p className="text-gray-600">Eyni kateqoriyada məhsul dəyişdirmə tamamilə pulsuzdur</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Orijinal Qablaşdırma</h3>
                            <p className="text-gray-600">Məhsul orijinal qablaşdırmasında və zədəsiz olmalıdır</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Qaytarma Şərtləri</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Məhsulları qaytarmaq üçün aşağıdakı şərtlər yerinə yetirilməlidir
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                Qaytarıla Bilən Məhsullar
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Mobil Telefonlar</h4>
                                        <p className="text-gray-600 text-sm">Orijinal qablaşdırmasında, istifadə edilməmiş</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Aksesuarlar</h4>
                                        <p className="text-gray-600 text-sm">Qoruyucu, şarj cihazları, qulaqlıqlar</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Texniki Cihazlar</h4>
                                        <p className="text-gray-600 text-sm">Planşetlər, smart saatlar və digər cihazlar</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Qəbz və Zəmanət</h4>
                                        <p className="text-gray-600 text-sm">Alış qəbzi və zəmanət kartı ilə birlikdə</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <XCircle className="h-6 w-6 text-red-600 mr-3" />
                                Qaytarıla Bilməyən Məhsullar
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Zədəli Məhsullar</h4>
                                        <p className="text-gray-600 text-sm">Fiziki zədəsi olan və ya düşmüş cihazlar</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">İstifadə Edilmiş</h4>
                                        <p className="text-gray-600 text-sm">Açılmış və istifadə edilmiş məhsullar</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Fərdi Məhsullar</h4>
                                        <p className="text-gray-600 text-sm">Xüsusi sifariş ilə hazırlanmış məhsullar</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Müddət Keçmiş</h4>
                                        <p className="text-gray-600 text-sm">14 günlük müddət keçmiş məhsullar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Qaytarma Prosesi</h2>
                        <p className="text-lg text-gray-600">Addım-addım qaytarma prosesi</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Əlaqə</h3>
                            <p className="text-gray-600 text-sm">Bizimlə əlaqə saxlayın və qaytarma səbəbini bildirin</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hazırlıq</h3>
                            <p className="text-gray-600 text-sm">Məhsulu orijinal qablaşdırmasında hazırlayın</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gətirin</h3>
                            <p className="text-gray-600 text-sm">Məhsulu mağazamıza gətirin və ya kargo ilə göndərin</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geri Ödəmə</h3>
                            <p className="text-gray-600 text-sm">3-5 iş günü ərzində pulunuz geri qaytarılır</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Dəyişdirmə Siyasəti</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                Məhsulunuzu eyni kateqoriyada başqa məhsulla dəyişdirmək istəyirsinizsə, bu xidmət tamamilə pulsuzdur.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                    <p className="text-gray-700">Eyni kateqoriyada dəyişdirmə pulsuz</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                    <p className="text-gray-700">Qiymət fərqi ödənilir</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                    <p className="text-gray-700">14 gün ərzində dəyişdirmə imkanı</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                    <p className="text-gray-700">Orijinal qablaşdırma tələb olunur</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Dəyişdirmə Nümunələri</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">iPhone 14 → iPhone 15</h4>
                                    <p className="text-sm text-gray-600">Qiymət fərqi ödənilir, dəyişdirmə haqqı yoxdur</p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Samsung A54 → Samsung A34</h4>
                                    <p className="text-sm text-gray-600">Qiymət fərqi geri qaytarılır</p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Qulaqlıq → Qulaqlıq</h4>
                                    <p className="text-sm text-gray-600">Eyni qiymətdə dəyişdirmə pulsuz</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="flex items-start space-x-4">
                            <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vacib Qeydlər</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Məhsul orijinal qablaşdırmasında olmalıdır</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Bütün aksesuarlar və sənədlər daxil olmalıdır</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Alış qəbzi mütləq tələb olunur</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Məhsulda heç bir zədə olmamalıdır</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>14 günlük müddət keçdikdən sonra qaytarma mümkün deyil</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Geri ödəmə 3-5 iş günü çəkir</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sualınız Var?</h2>
                        <p className="text-xl text-gray-300">Qaytarma və dəyişdirmə ilə bağlı bizimlə əlaqə saxlayın</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                            <p className="text-gray-300">+994 50 123 45 67</p>
                            <p className="text-gray-300">Bazar ertəsi - Şənbə: 09:00-20:00</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Email</h3>
                            <p className="text-gray-300">qaytarma@smartstore.az</p>
                            <p className="text-gray-300">24 saat ərzində cavab veririk</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Mağaza</h3>
                            <p className="text-gray-300">Bakı şəhəri, Nəsimi rayonu</p>
                            <p className="text-gray-300">28 May küçəsi 15</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4">
                            Qaytarma Müraciəti
                        </button>
                        <button className="border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Dəyişdirmə Müraciəti
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
