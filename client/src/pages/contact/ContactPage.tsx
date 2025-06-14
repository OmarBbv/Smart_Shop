import type React from "react"

import { useState } from "react"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    AlertCircle,
    CheckCircle,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
} from "lucide-react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus("success")
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus("idle")
            }, 5000)
        }, 2000)
    }

    const contactMethods = [
        {
            icon: Phone,
            title: "Telefon",
            primary: "+994 50 123 45 67",
            secondary: "+994 12 345 67 89",
            description: "24/7 müştəri xidməti",
            color: "green",
        },
        {
            icon: Mail,
            title: "Email",
            primary: "info@smartstore.az",
            secondary: "destek@smartstore.az",
            description: "24 saat ərzində cavab",
            color: "blue",
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            primary: "+994 50 123 45 67",
            secondary: "Canlı söhbət",
            description: "Sürətli dəstək",
            color: "green",
        },
        {
            icon: MapPin,
            title: "Ünvan",
            primary: "Bakı şəhəri, Nəsimi rayonu",
            secondary: "28 May küçəsi 15",
            description: "Mağaza mərkəzi",
            color: "purple",
        },
    ]

    const workingHours = [
        { day: "Bazar ertəsi", hours: "09:00 - 20:00" },
        { day: "Çərşənbə axşamı", hours: "09:00 - 20:00" },
        { day: "Çərşənbə", hours: "09:00 - 20:00" },
        { day: "Cümə axşamı", hours: "09:00 - 20:00" },
        { day: "Cümə", hours: "09:00 - 20:00" },
        { day: "Şənbə", hours: "09:00 - 20:00" },
        { day: "Bazar", hours: "10:00 - 18:00" },
    ]

    const departments = [
        { name: "Satış Şöbəsi", phone: "+994 50 123 45 67", email: "satis@smartstore.az" },
        { name: "Texniki Dəstək", phone: "+994 50 123 45 68", email: "destek@smartstore.az" },
        { name: "Qaytarma/Dəyişdirmə", phone: "+994 50 123 45 69", email: "qaytarma@smartstore.az" },
        { name: "Korporativ Satış", phone: "+994 50 123 45 70", email: "korporativ@smartstore.az" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bizimlə Əlaqə</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Suallarınız və təklifləriniz üçün bizə müraciət edin
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => {
                            const IconComponent = method.icon
                            const colorClasses = {
                                green: "bg-green-100 text-green-600",
                                blue: "bg-blue-100 text-blue-600",
                                purple: "bg-purple-100 text-purple-600",
                            }

                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[method.color as keyof typeof colorClasses]}`}
                                    >
                                        <IconComponent className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                                    <p className="text-gray-800 font-medium">{method.primary}</p>
                                    <p className="text-gray-600 text-sm">{method.secondary}</p>
                                    <p className="text-gray-500 text-xs mt-2">{method.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mesaj Göndərin</h2>
                            <p className="text-gray-600 mb-8">
                                Formu dolduraraq bizə mesaj göndərə bilərsiniz. 24 saat ərzində sizinlə əlaqə saxlayacağıq.
                            </p>

                            {submitStatus === "success" && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                        <p className="text-green-800">Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Ad Soyad *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="Adınızı daxil edin"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="+994 50 123 45 67"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mövzu *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Mövzu seçin...</option>
                                        <option value="satis">Satış və Məhsul Məlumatı</option>
                                        <option value="destek">Texniki Dəstək</option>
                                        <option value="qaytarma">Qaytarma və Dəyişdirmə</option>
                                        <option value="sikayet">Şikayət</option>
                                        <option value="teklif">Təklif</option>
                                        <option value="diger">Digər</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mesaj *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Göndərilir...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            Mesaj Göndər
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Store Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mağaza Məlumatları</h2>

                            {/* Working Hours */}
                            <div className="bg-gray-50 p-6 rounded-xl mb-8">
                                <div className="flex items-center mb-4">
                                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                                    <h3 className="text-xl font-semibold text-gray-900">İş Saatları</h3>
                                </div>
                                <div className="space-y-2">
                                    {workingHours.map((schedule, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-gray-700">{schedule.day}</span>
                                            <span className="font-medium text-gray-900">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Departments */}
                            <div className="bg-gray-50 p-6 rounded-xl mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Şöbələr</h3>
                                <div className="space-y-4">
                                    {departments.map((dept, index) => (
                                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                            <p className="text-sm text-gray-600">{dept.phone}</p>
                                            <p className="text-sm text-gray-600">{dept.email}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sosial Şəbəkələr</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg transition-colors">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-lg transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors">
                                        <Youtube className="h-5 w-5" />
                                    </a>
                                </div>
                                <p className="text-sm text-gray-600 mt-3">
                                    Yeniliklər və kampanyalardan xəbərdar olmaq üçün bizi izləyin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mağaza Yeri</h2>
                        <p className="text-lg text-gray-600">Bizə necə gəlmək olar</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ünvan Məlumatları</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Tam Ünvan</h4>
                                            <p className="text-gray-600">Bakı şəhəri, Nəsimi rayonu, 28 May küçəsi 15</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Phone className="h-6 w-6 text-green-600 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Telefon</h4>
                                            <p className="text-gray-600">+994 50 123 45 67</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Clock className="h-6 w-6 text-purple-600 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">İş Saatları</h4>
                                            <p className="text-gray-600">B.e - Ş: 09:00-20:00, Bazar: 10:00-18:00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Nəqliyyat</h4>
                                    <p className="text-blue-800 text-sm">
                                        Metro: 28 May stansiyası (5 dəqiqə piyada)
                                        <br />
                                        Avtobus: 5, 18, 77 nömrəli marşrutlar
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gray-300 h-96 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg">Xəritə Yüklənir...</p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Bakı şəhəri, Nəsimi rayonu
                                        <br />
                                        28 May küçəsi 15
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-16 bg-red-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AlertCircle className="h-16 w-16 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Təcili Yardım</h2>
                    <p className="text-xl mb-8">Təcili hallarda bizə dərhal müraciət edin</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-red-700 p-6 rounded-xl">
                            <Phone className="h-8 w-8 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Təcili Xətt</h3>
                            <p className="text-2xl font-bold">+994 50 911 11 11</p>
                            <p className="text-red-200 text-sm mt-2">24/7 əlçatan</p>
                        </div>

                        <div className="bg-red-700 p-6 rounded-xl">
                            <MessageCircle className="h-8 w-8 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                            <p className="text-2xl font-bold">+994 50 911 11 11</p>
                            <p className="text-red-200 text-sm mt-2">Sürətli cavab</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
