
export type Product = {
    id: number
    name: string
    price: number
    categoryId: number
    images: string[]
    features: Record<string, string>
    category?: {
        id: number
        name: string
    }
}

export function mockProductData(): Product[] {
    return [
        {
            id: 1,
            name: "iPhone 13 Pro",
            price: 999.99,
            categoryId: 1,
            images: ["https://assets.smartelectronics.az/Assets/cdn-cgi?path=ed0c2bac-cbfb-4c0d-bee5-65b7ca7cd1a5.webp"],
            features: { ram: "6GB", storage: "128GB", battery: "3095mAh" },
            category: { id: 1, name: "Telefonlar" },
        },
        {
            id: 2,
            name: "Samsung Galaxy S22",
            price: 799.99,
            categoryId: 1,
            images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"],
            features: { ram: "8GB", storage: "256GB", battery: "4500mAh" },
            category: { id: 1, name: "Telefonlar" },
        },
        {
            id: 3,
            name: "MacBook Pro M1",
            price: 1299.99,
            categoryId: 2,
            images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"],
            features: { ram: "16GB", storage: "512GB", cpu: "Apple M1" },
            category: { id: 2, name: "Bilgisayarlar" },
        },
        {
            id: 4,
            name: "Dell XPS 15",
            price: 1499.99,
            categoryId: 2,
            images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"],
            features: { ram: "32GB", storage: "1TB", cpu: "Intel i9" },
            category: { id: 2, name: "Bilgisayarlar" },
        },
        {
            id: 5,
            name: "AirPods Pro",
            price: 249.99,
            categoryId: 3,
            images: ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80"],
            features: { type: "Wireless", battery: "24h", anc: "Yes" },
            category: { id: 3, name: "Aksesuarlar" },
        },
        {
            id: 6,
            name: "iPad Air",
            price: 599.99,
            categoryId: 4,
            images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"],
            features: { screen: '10.9"', storage: "64GB", chip: "A14" },
            category: { id: 4, name: "Tabletler" },
        },
        {
            id: 7,
            name: "iPhone 16",
            price: 1199.99,
            categoryId: 1,
            images: [
                "https://kontakt.az/media/catalog/product/cache/a404967cc40694dc557cd869288440a4/t/m/tm-dg-sbp-1105-sm-2888_1-7cd4ea56.webp",
                "https://kontakt.az/media/catalog/product/cache/a404967cc40694dc557cd869288440a4/t/m/tm-dg-sbp-1105-sm-2888_2-eb7cfd8d.webp"
            ],
            features: {
                "Daxili yaddaş": "128 GB",
                "Operativ yaddaş": "8 GB",
                "Əsas kamera": "48 MP + 12 MP",
                "Ön kamera": "12 MP",
                "Nüvə sayı": "6",
                "SIM-kart növü": "Nano SIM / eSIM",
                "SIM-kart sayı": "1",
                "Prosessor": "Apple A18, 4.04 GHz",
                "ƏS": "iOS 18",
                "NFC": "Var",
                "Displey": "Super Retina XDR OLED",
                "Simsiz enerji": "Var",
                "İnfraqırmızı port": "Yox",
                "Göz tanıma": "Var",
                "Üz tanıma": "Var",
                "Sürətli enerji yığma": "Var",
                "Qorunma dərəcəsi": "IP68",
                "Ölçülər": "147.6 × 71.6 × 7.8 mm",
                "Ekran rəng sayı": "1.07 mlrd",
                "Yaddaş kartı dəstəyi": "Yox",
                "Sensorlar": "Barometr, Giroskop, İşıq, Yaxınlıq",
                "Optik sabitləşmə": "Var",
                "Video formatı": "4K / 1080p / 720p",
                "Bluetooth": "5.3",
                "Avtofokus": "Var",
                "Kadr tezliyi": "24-240 kadr/s",
                "Asta çəkiliş": "Var",
                "Rəng": "Teal",
                "Enerji toplama": "USB Type-C"
            },
            category: { id: 4, name: "Tabletler" },
        }
    ]
}