import { useState } from "react"
import { Search, ChevronDown, ChevronUp, Phone, Package, CreditCard, Settings, Shield, HelpCircle } from "lucide-react"

interface FAQItem {
    id: number
    question: string
    answer: string
    category: string
}

const faqData: FAQItem[] = [
    // Ümumi Suallar
    {
        id: 1,
        question: "Mağazanızda hansı brendlərin məhsulları satılır?",
        answer:
            "Bizim mağazamızda Apple, Samsung, Xiaomi, Huawei, OPPO, Vivo, Realme və digər məşhur brendlərin ən son modelləri mövcuddur. Həmçinin orijinal aksesuarlar və qoruyucu vasitələr də satışda var.",
        category: "umumi",
    },
    {
        id: 2,
        question: "Məhsulların orijinallığına necə əmin ola bilərəm?",
        answer:
            "Bütün məhsullarımız rəsmi distribyutorlardan alınır və orijinallıq sertifikatı ilə təmin edilir. Hər məhsulun IMEI nömrəsini yoxlaya və brendin rəsmi saytından təsdiq edə bilərsiniz.",
        category: "umumi",
    },
    {
        id: 3,
        question: "Mağazanızın iş saatları necədir?",
        answer:
            "Mağazamız Bazar ertəsi - Şənbə günləri 09:00-20:00, Bazar günləri isə 10:00-18:00 saatları arasında açıqdır. Bayram günlərində xüsusi iş cədvəli tətbiq olunur.",
        category: "umumi",
    },

    // Sifariş və Çatdırılma
    {
        id: 4,
        question: "Online sifariş verə bilərəmmi?",
        answer:
            "Bəli, saytımız vasitəsilə online sifariş verə bilərsiniz. Sifarişiniz 24 saat ərzində hazırlanır və çatdırılma xidməti ilə ünvanınıza çatdırılır.",
        category: "sifaris",
    },
    {
        id: 5,
        question: "Çatdırılma haqqı nə qədərdir?",
        answer:
            "Bakı şəhəri daxilində çatdırılma haqqı 5 AZN-dir. 200 AZN-dən yuxarı alış-verişlərdə çatdırılma pulsuzdur. Rayonlara çatdırılma haqqı məsafəyə görə müəyyən edilir.",
        category: "sifaris",
    },
    {
        id: 6,
        question: "Sifarişim nə vaxt çatdırılacaq?",
        answer:
            "Bakı şəhərində sifarişlər 1-2 iş günü ərzində, rayonlarda isə 2-3 iş günü ərzində çatdırılır. Təcili çatdırılma xidməti də mövcuddur (əlavə ödəniş tələb olunur).",
        category: "sifaris",
    },

    // Ödəniş
    {
        id: 7,
        question: "Hansı ödəniş üsulları qəbul edilir?",
        answer:
            "Nağd pul, bank kartları (Visa, Mastercard), bank köçürməsi və taksitlə ödəniş imkanları mövcuddur. Online sifarişlərdə həmçinin e-manat və digər elektron ödəniş sistemləri də qəbul edilir.",
        category: "odenish",
    },
    {
        id: 8,
        question: "Taksitlə ödəniş necə işləyir?",
        answer:
            "Taksitlə ödəniş üçün şəxsiyyət vəsiqəsi və gəlir arayışı tələb olunur. 3, 6, 12 və 18 aylıq taksit variantları mövcuddur. Faiz dərəcəsi seçilən müddətə görə dəyişir.",
        category: "odenish",
    },

    // Qaytarma və Dəyişdirmə
    {
        id: 9,
        question: "Məhsulu qaytara bilərəmmi?",
        answer:
            "Bəli, alış tarixindən etibarən 14 gün ərzində məhsulu qaytara bilərsiniz. Məhsul orijinal qablaşdırmasında və istifadə edilməmiş vəziyyətdə olmalıdır.",
        category: "qaytarma",
    },
    {
        id: 10,
        question: "Dəyişdirmə pulsuzmu?",
        answer:
            "Eyni kateqoriyada məhsul dəyişdirmə tamamilə pulsuzdur. Qiymət fərqi varsa, əlavə ödəniş və ya geri qaytarma həyata keçirilir.",
        category: "qaytarma",
    },

    // Zəmanət və Təmir
    {
        id: 11,
        question: "Zəmanət müddəti nə qədərdir?",
        answer:
            "Telefonlar üçün 12 ay, aksesuarlar üçün 6 ay zəmanət verilir. Zəmanət müddətində baş verən texniki nasazlıqlar pulsuz təmir edilir və ya məhsul dəyişdirilir.",
        category: "zemanet",
    },
    {
        id: 12,
        question: "Zəmanət xidməti necə işləyir?",
        answer:
            "Zəmanət halında məhsulu mağazamıza gətirin. Texniki ekspertiza aparıldıqdan sonra təmir və ya dəyişdirmə həyata keçirilir. Proses 5-10 iş günü çəkir.",
        category: "zemanet",
    },

    // Texniki Dəstək
    {
        id: 13,
        question: "Telefonumda problem yaranıbsa nə etməliyəm?",
        answer:
            "Əvvəlcə telefonunuzu yenidən başladın və yeniləmələri yoxlayın. Problem davam edərsə, mağazamıza müraciət edin və ya texniki dəstək xəttimizi zəng edin.",
        category: "destek",
    },
    {
        id: 14,
        question: "Məlumatlarımı necə qoruya bilərəm?",
        answer:
            "Telefonunuzda parol, barmaq izi və ya üz tanıma quraşdırın. Mühüm məlumatları ehtiyat nüsxələyin və antivirus proqramı quraşdırın.",
        category: "destek",
    },
]

const categories = [
    { id: "hamisi", name: "Hamısı", icon: HelpCircle },
    { id: "umumi", name: "Ümumi Suallar", icon: Phone },
    { id: "sifaris", name: "Sifariş və Çatdırılma", icon: Package },
    { id: "odenish", name: "Ödəniş", icon: CreditCard },
    { id: "qaytarma", name: "Qaytarma", icon: Settings },
    { id: "zemanet", name: "Zəmanət", icon: Shield },
    { id: "destek", name: "Texniki Dəstək", icon: Settings },
]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("hamisi")
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggleItem = (id: number) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const filteredFAQs = faqData.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "hamisi" || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tez-tez Verilən Suallar</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Ən çox verilən sualların cavablarını burada tapa bilərsiniz
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Sualları axtarın..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => {
                                const IconComponent = category.icon
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span>{category.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-12">
                            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Heç bir nəticə tapılmadı</h3>
                            <p className="text-gray-600">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQs.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                                        {openItems.includes(item.id) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                        )}
                                    </button>

                                    {openItems.includes(item.id) && (
                                        <div className="px-6 pb-4">
                                            <div className="border-t border-gray-200 pt-4">
                                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dəstək Statistikası</h2>
                        <p className="text-lg text-gray-600">Müştəri məmnuniyyətimiz rəqəmlərlə</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">98%</div>
                            <div className="text-gray-600">Məmnun Müştəri</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">24/7</div>
                            <div className="text-gray-600">Dəstək Xidməti</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">2 saat</div>
                            <div className="text-gray-600">Orta Cavab Müddəti</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1000+</div>
                            <div className="text-gray-600">Həll Edilmiş Problem</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Cavabınızı Tapa Bilmədiniz?</h2>
                    <p className="text-xl text-gray-300 mb-8">Bizim dəstək komandamız sizə kömək etməyə hazırdır</p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Telefon Dəstəyi</h3>
                            <p className="text-gray-300 mb-2">+994 50 123 45 67</p>
                            <p className="text-sm text-gray-400">24/7 əlçatan</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Canlı Söhbət</h3>
                            <p className="text-gray-300 mb-2">Saytımızda canlı söhbət</p>
                            <p className="text-sm text-gray-400">09:00-20:00</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Email Dəstəyi</h3>
                            <p className="text-gray-300 mb-2">destek@smartstore.az</p>
                            <p className="text-sm text-gray-400">24 saat ərzində cavab</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Bizimlə Əlaqə
                        </button>
                        <button className="border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Canlı Söhbət Başlat
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
