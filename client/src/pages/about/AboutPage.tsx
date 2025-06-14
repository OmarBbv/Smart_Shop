import { Phone, Shield, Users, Award, MapPin, Clock, PhoneCall } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">SMART STORE</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                            Azərbaycanda mobil texnologiyalar sahəsində aparıcı mağaza olaraq, müştərilərimizə ən yaxşı xidməti təqdim
                            edirik
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Bizim Hekayəmiz</h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                2015-ci ildən etibarən Azərbaycan bazarında fəaliyyət göstərən şirkətimiz, mobil telefon və aksesuarlar
                                sahəsində geniş təcrübəyə malikdir.
                            </p>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                İlk günlərdən bu günə qədər məqsədimiz müştərilərimizə yüksək keyfiyyətli məhsullar və peşəkar xidmət
                                təqdim etməkdir. Biz həmişə yenilikləri izləyir və bazarın ən son trendlərini müştərilərimizə
                                çatdırırıq.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Award className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">8+ İl Təcrübə</h3>
                                    <p className="text-gray-600">Mobil texnologiyalar sahəsində</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://www.danfoss.com/media/1928/smart-store-concept-danfoss.jpg"
                                alt="Mağaza görünüşü"
                                className="rounded-lg shadow-xl w-full h-96 object-cover"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">50,000+</div>
                                    <div className="text-gray-600">Məmnun Müştəri</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Missiya və Vizyon</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Gələcəyə doğru addımlarımızı müəyyən edən dəyərlərimiz
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
                            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Missiyamız</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Müştərilərimizə ən yaxşı mobil texnologiyaları əlçatan qiymətlərlə təqdim etmək, keyfiyyətli xidmət və
                                peşəkar məsləhətlərlə onların ehtiyaclarını qarşılamaq.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-xl">
                            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Azərbaycanda mobil texnologiyalar sahəsində lider mağaza olmaq və müştəri məmnuniyyətində ən yüksək
                                standartları təmin etmək.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Xidmətlərimiz</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Müştərilərimizə təqdim etdiyimiz geniş xidmət spektri
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Phone className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Telefon Satışı</h3>
                            <p className="text-gray-600">Ən son model smartfonlar və klassik telefonların geniş çeşidi</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Təmir Xidməti</h3>
                            <p className="text-gray-600">Peşəkar texniki xidmət və sürətli təmir həlləri</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Məsləhət Xidməti</h3>
                            <p className="text-gray-600">Ehtiyaclarınıza uyğun ən yaxşı cihazın seçilməsində kömək</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">8+</div>
                            <div className="text-blue-100">İl Təcrübə</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                            <div className="text-blue-100">Məmnun Müştəri</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                            <div className="text-blue-100">Məhsul Çeşidi</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                            <div className="text-blue-100">Dəstək Xidməti</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bizimlə Əlaqə</h2>
                        <p className="text-lg text-gray-600">Suallarınız üçün bizə müraciət edin</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ünvan</h3>
                            <p className="text-gray-600">
                                Bakı şəhəri, Nəsimi rayonu
                                <br />
                                28 May küçəsi 15
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PhoneCall className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefon</h3>
                            <p className="text-gray-600">
                                +994 12 345 67 89
                                <br />
                                +994 50 123 45 67
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">İş Saatları</h3>
                            <p className="text-gray-600">
                                Bazar ertəsi - Şənbə: 09:00-20:00
                                <br />
                                Bazar: 10:00-18:00
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Bizə Qoşulun!</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Ən yaxşı mobil texnologiyalar və xidmətlər üçün bizə müraciət edin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Mağazaya Gəlin
                        </button>
                        <button className="border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Bizimlə Əlaqə
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
