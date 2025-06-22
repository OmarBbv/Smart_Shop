import { useState } from "react"
import {
    MapPin,
    Phone,
    Clock,
    Navigation,
    Search,
    Filter,
    Star,
    Wifi,
    CreditCard,
    Settings,
    Users,
    Car,
    Shield,
    Package,
} from "lucide-react"

interface Store {
    id: number
    name: string
    address: string
    phone: string
    email: string
    district: string
    coordinates: { lat: number; lng: number }
    hours: {
        weekdays: string
        saturday: string
        sunday: string
    }
    services: string[]
    features: string[]
    rating: number
    reviews: number
    image: string
    isMain: boolean
}

const stores: Store[] = [
    {
        id: 1,
        name: "Smart Store Mərkəzi Filial",
        address: "Bakı şəhəri, Nəsimi rayonu, 28 May küçəsi 15",
        phone: "+994 50 123 45 67",
        email: "merkezi@smartstore.az",
        district: "Nəsimi",
        coordinates: { lat: 40.3777, lng: 49.892 },
        hours: {
            weekdays: "09:00 - 20:00",
            saturday: "09:00 - 20:00",
            sunday: "10:00 - 18:00",
        },
        services: ["Satış", "Təmir", "Texniki Dəstək", "Zəmanət"],
        features: ["Pulsuz WiFi", "Kart Ödənişi", "Təcili Təmir", "Konsultasiya"],
        rating: 4.8,
        reviews: 245,
        image: "/placeholder.svg?height=200&width=300",
        isMain: true,
    },
    {
        id: 2,
        name: "Smart Store Gənclik Mall",
        address: "Bakı şəhəri, Yasamal rayonu, Gənclik Mall, 2-ci mərtəbə",
        phone: "+994 50 123 45 68",
        email: "genclik@smartstore.az",
        district: "Yasamal",
        coordinates: { lat: 40.3947, lng: 49.8814 },
        hours: {
            weekdays: "10:00 - 22:00",
            saturday: "10:00 - 22:00",
            sunday: "10:00 - 20:00",
        },
        services: ["Satış", "Aksesuarlar", "Konsultasiya"],
        features: ["Mall İçində", "Pulsuz WiFi", "Kart Ödənişi", "Geniş Çeşid"],
        rating: 4.6,
        reviews: 189,
        image: "/placeholder.svg?height=200&width=300",
        isMain: false,
    },
    {
        id: 3,
        name: "Smart Store Nizami",
        address: "Bakı şəhəri, Nizami rayonu, Azadlıq prospekti 125",
        phone: "+994 50 123 45 69",
        email: "nizami@smartstore.az",
        district: "Nizami",
        coordinates: { lat: 40.4093, lng: 49.8671 },
        hours: {
            weekdays: "09:00 - 19:00",
            saturday: "09:00 - 19:00",
            sunday: "10:00 - 17:00",
        },
        services: ["Satış", "Təmir", "Aksesuarlar"],
        features: ["Avtomobil Dayanacağı", "Pulsuz WiFi", "Kart Ödənişi"],
        rating: 4.5,
        reviews: 156,
        image: "/placeholder.svg?height=200&width=300",
        isMain: false,
    },
    {
        id: 4,
        name: "Smart Store Binəqədi",
        address: "Bakı şəhəri, Binəqədi rayonu, Atatürk prospekti 89",
        phone: "+994 50 123 45 70",
        email: "bineqedi@smartstore.az",
        district: "Binəqədi",
        coordinates: { lat: 40.3515, lng: 49.8378 },
        hours: {
            weekdays: "09:00 - 19:00",
            saturday: "09:00 - 19:00",
            sunday: "10:00 - 17:00",
        },
        services: ["Satış", "Aksesuarlar", "Konsultasiya"],
        features: ["Avtomobil Dayanacağı", "Pulsuz WiFi", "Nağd/Kart Ödəniş"],
        rating: 4.4,
        reviews: 98,
        image: "/placeholder.svg?height=200&width=300",
        isMain: false,
    },
]

const districts = ["Hamısı", "Nəsimi", "Yasamal", "Nizami", "Binəqədi"]

export default function StoresPage() {
    const [selectedDistrict, setSelectedDistrict] = useState("Hamısı")
    const [selectedStore, setSelectedStore] = useState<Store | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredStores = stores.filter((store) => {
        const matchesDistrict = selectedDistrict === "Hamısı" || store.district === selectedDistrict
        const matchesSearch =
            store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.address.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesDistrict && matchesSearch
    })

    const getServiceIcon = (service: string) => {
        switch (service) {
            case "Satış":
                return <CreditCard className="h-4 w-4" />
            case "Təmir":
                return <Settings className="h-4 w-4" />
            case "Texniki Dəstək":
                return <Users className="h-4 w-4" />
            case "Zəmanət":
                return <Shield className="h-4 w-4" />
            case "Aksesuarlar":
                return <Package className="h-4 w-4" />
            case "Konsultasiya":
                return <Users className="h-4 w-4" />
            default:
                return <Settings className="h-4 w-4" />
        }
    }

    const getFeatureIcon = (feature: string) => {
        switch (feature) {
            case "Pulsuz WiFi":
                return <Wifi className="h-4 w-4" />
            case "Kart Ödənişi":
                return <CreditCard className="h-4 w-4" />
            case "Avtomobil Dayanacağı":
                return <Car className="h-4 w-4" />
            default:
                return <Star className="h-4 w-4" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mağazalarımız</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Bakı şəhərinin müxtəlif nöqtələrində sizə xidmət edirik
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Mağaza və ya ünvan axtarın..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Mağazalar ({filteredStores.length})</h2>

                            {filteredStores.map((store) => (
                                <div
                                    key={store.id}
                                    className={`bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all hover:shadow-lg ${selectedStore?.id === store.id ? "ring-2 ring-blue-500" : ""
                                        }`}
                                    onClick={() => setSelectedStore(store)}
                                >
                                    {store.isMain && (
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                                            Mərkəzi Filial
                                        </div>
                                    )}

                                    <img
                                        src={store.image || "/placeholder.svg"}
                                        alt={store.name}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                    />

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h3>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex items-start space-x-2">
                                            <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                                            <span>{store.address}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>{store.phone}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span>B.e-Ş: {store.hours.weekdays}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            <span className="text-sm font-medium">{store.rating}</span>
                                            <span className="text-sm text-gray-500">({store.reviews})</span>
                                        </div>

                                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ətraflı →</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                                <div className="h-96">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.4282264493!2d49.70270107812499!3d40.39496505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Smart Store Locations"
                                    />
                                </div>
                            </div>

                            {selectedStore ? (
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStore.name}</h2>
                                            <div className="flex items-center space-x-1 mb-2">
                                                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                                <span className="font-medium">{selectedStore.rating}</span>
                                                <span className="text-gray-500">({selectedStore.reviews} rəy)</span>
                                            </div>
                                        </div>

                                        {selectedStore.isMain && (
                                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Mərkəzi Filial
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Əlaqə Məlumatları</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start space-x-3">
                                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                                    <span className="text-gray-700">{selectedStore.address}</span>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                    <span className="text-gray-700">{selectedStore.phone}</span>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <span className="text-gray-400">@</span>
                                                    <span className="text-gray-700">{selectedStore.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">İş Saatları</h3>
                                            <div className="space-y-2 text-gray-700">
                                                <div className="flex justify-between">
                                                    <span>Bazar ertəsi - Cümə:</span>
                                                    <span className="font-medium">{selectedStore.hours.weekdays}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Şənbə:</span>
                                                    <span className="font-medium">{selectedStore.hours.saturday}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Bazar:</span>
                                                    <span className="font-medium">{selectedStore.hours.sunday}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Xidmətlər</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedStore.services.map((service, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {getServiceIcon(service)}
                                                        <span>{service}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Xüsusiyyətlər</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedStore.features.map((feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {getFeatureIcon(feature)}
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
                                            <Phone className="h-5 w-5 mr-2" />
                                            Zəng Et
                                        </button>

                                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
                                            <Navigation className="h-5 w-5 mr-2" />
                                            Yol Tarifi
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Mağaza Seçin</h3>
                                    <p className="text-gray-600">Ətraflı məlumat üçün sol tərəfdən mağaza seçin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mağaza Statistikası</h2>
                        <p className="text-lg text-gray-600">Bakı şəhərində xidmət göstərdiyimiz rəqəmlər</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stores.length}</div>
                            <div className="text-gray-600">Mağaza</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">6</div>
                            <div className="text-gray-600">Rayon</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50+</div>
                            <div className="text-gray-600">İşçi</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">4.6</div>
                            <div className="text-gray-600">Orta Reytinq</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Yeni Mağaza Açılışı</h2>
                    <p className="text-xl text-gray-300 mb-8">Tezliklə yeni rayonlarda da sizə xidmət etməyə başlayacağıq</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Xəbər Ver
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
