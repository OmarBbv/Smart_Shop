import { Truck, Clock, MapPin, Phone, CreditCard, Package, CheckCircle, AlertTriangle } from "lucide-react"

export default function DeliveryPage() {
    const deliveryZones = [
        {
            zone: "Mərkəzi Rayonlar",
            areas: ["Nəsimi", "Yasamal", "Nərimanov", "Səbail"],
            price: "Pulsuz",
            time: "2-4 saat",
            minOrder: "200 AZN",
        },
        {
            zone: "Şəhər Rayonları",
            areas: ["Binəqədi", "Nizami", "Xətai", "Suraxanı", "Sabunçu"],
            price: "5 AZN",
            time: "4-6 saat",
            minOrder: "100 AZN",
        },
        {
            zone: "Kənar Rayonlar",
            areas: ["Pirallahı", "Xəzər", "Qaradağ", "Abşeron"],
            price: "10 AZN",
            time: "1-2 gün",
            minOrder: "150 AZN",
        },
    ]

    const paymentMethods = [
        {
            title: "Nağd Ödəniş",
            description: "Məhsul çatdırıldığı zaman nağd pulla ödəniş",
            icon: CreditCard,
            popular: true,
        },
        {
            title: "Bank Köçürməsi",
            description: "Sifarişdən əvvəl bank hesabımıza köçürmə",
            icon: Package,
            popular: false,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Çatdırılma Xidməti</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Sürətli və etibarlı çatdırılma ilə məhsullarınızı qapınıza çatdırırıq
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Info Cards */}
            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pulsuz Çatdırılma</h3>
                            <p className="text-gray-600 text-sm">200 AZN-dən yuxarı sifarişlər üçün</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sürətli Çatdırılma</h3>
                            <p className="text-gray-600 text-sm">Mərkəzi rayonlarda 2-4 saat</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nağd Ödəniş</h3>
                            <p className="text-gray-600 text-sm">Çatdırılma zamanı ödəniş</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Təhlükəsiz Qablaşdırma</h3>
                            <p className="text-gray-600 text-sm">Məhsullar qorunaqlı şəkildə qablaşdırılır</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Zones */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Çatdırılma Zonları</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bakı şəhərinin müxtəlif rayonlarına çatdırılma xidməti göstəririk
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {deliveryZones.map((zone, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{zone.zone}</h3>
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Çatdırılma haqqı:</span>
                                        <span className="font-semibold text-green-600">{zone.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Çatdırılma müddəti:</span>
                                        <span className="font-semibold text-blue-600">{zone.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Minimum sifariş:</span>
                                        <span className="font-semibold text-purple-600">{zone.minOrder}</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Əhatə olunan rayonlar:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {zone.areas.map((area, areaIndex) => (
                                            <span key={areaIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ödəniş Üsulları</h2>
                        <p className="text-lg text-gray-600">Sizə uyğun ödəniş üsulunu seçin</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {paymentMethods.map((method, index) => {
                            const IconComponent = method.icon
                            return (
                                <div
                                    key={index}
                                    className={`bg-white p-8 rounded-xl shadow-lg border-2 ${method.popular ? "border-green-300 ring-2 ring-green-100" : "border-gray-200"}`}
                                >
                                    {method.popular && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                                            Ən Populyar
                                        </div>
                                    )}

                                    <div className="flex items-center mb-4">
                                        <div className={`p-3 rounded-lg mr-4 ${method.popular ? "bg-green-100" : "bg-blue-100"}`}>
                                            <IconComponent className={`h-6 w-6 ${method.popular ? "text-green-600" : "text-blue-600"}`} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                                    </div>

                                    <p className="text-gray-600 mb-6">{method.description}</p>

                                    {method.title === "Nağd Ödəniş" && (
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                <span>Məhsulu görüb ödəyirsiniz</span>
                                            </div>
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                <span>Əlavə komissiya yoxdur</span>
                                            </div>
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                <span>Dəqiq pul hazırlayın</span>
                                            </div>
                                        </div>
                                    )}

                                    {method.title === "Bank Köçürməsi" && (
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                                                <span>Sürətli proses</span>
                                            </div>
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                                                <span>Təhlükəsiz ödəniş</span>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg mt-3">
                                                <p className="text-xs text-blue-800">
                                                    <strong>Hesab:</strong> AZ21NABZ00000000137010001944
                                                    <br />
                                                    <strong>Bank:</strong> Kapital Bank
                                                    <br />
                                                    <strong>Müəssisə:</strong> Smart Store MMC
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Delivery Process */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Çatdırılma Prosesi</h2>
                        <p className="text-lg text-gray-600">Sifarişinizdən çatdırılmaya qədər addımlar</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sifariş</h3>
                            <p className="text-gray-600 text-sm">Telefon və ya mağazada sifariş verin</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Təsdiq</h3>
                            <p className="text-gray-600 text-sm">Sifarişinizi təsdiq edir və hazırlayırıq</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Çatdırılma</h3>
                            <p className="text-gray-600 text-sm">Kuryer məhsulu ünvanınıza çatdırır</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ödəniş</h3>
                            <p className="text-gray-600 text-sm">Məhsulu yoxlayıb ödəniş edin</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Notes */}
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
                                                <span>Çatdırılma vaxtı hava şəraitindən asılı ola bilər</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Kuryer gəlməzdən əvvəl sizinlə əlaqə saxlayacaq</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Məhsulu qəbul etməzdən əvvəl yoxlayın</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Nağd ödəniş üçün dəqiq pul hazırlayın</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Çatdırılma ünvanını dəqiq göstərin</span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-yellow-600 font-bold">•</span>
                                                <span>Əlaqə nömrəniz aktiv olmalıdır</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact for Delivery */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Çatdırılma üçün Sifariş</h2>
                    <p className="text-xl text-gray-300 mb-8">Sifarişinizi vermək üçün bizimlə əlaqə saxlayın</p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="text-center">
                            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Telefon Sifarişi</h3>
                            <p className="text-gray-300 mb-2">+994 50 123 45 67</p>
                            <p className="text-sm text-gray-400">09:00-20:00 (Bazar ertəsi - Şənbə)</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Mağazada Sifariş</h3>
                            <p className="text-gray-300 mb-2">Bakı şəhəri, Nəsimi rayonu</p>
                            <p className="text-gray-300">28 May küçəsi 15</p>
                        </div>
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg">
                        İndi Sifariş Ver
                    </button>
                </div>
            </section>
        </div>
    )
}
