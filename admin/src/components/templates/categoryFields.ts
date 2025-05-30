export interface FieldConfig {
    type: "text" | "number" | "dropdown" | "checkbox" | "textarea" | 'checkbox';
    label: string;
    name?: string;
    required?: boolean;
    options?: string[];
    placeholder?: string
}

export const categoryFields: Record<string, FieldConfig[] | null> = {
    "Mobil telefonlar": [
        {
            type: "text",
            label: "Model",
            name: "model",
        },
        {
            type: "textarea",
            label: "Rəng",
            name: "color",
        },
        {
            type: "dropdown",
            label: "Operativ yaddaş, RAM (GB)",
            name: "ram",
            options: ["2GB", "4GB", "6GB", "8GB", "16GB", "32GB"],
        },
        {
            type: "dropdown",
            label: "Yaddaş tutumu",
            name: "storage",
            options: [
                "16GB",
                "32GB",
                "64GB",
                "128GB",
                "256GB",
                "512GB",
                "1TB",
                "2TB",
            ],
        },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        {
            type: "checkbox",
            label: "Əlavə olaraq",
            name: "additionally",
            options: ["Barmaq izi", "Qırıq"],
        },
    ],
    "Mobil telefonlar üçün digər aksesuarlar": null,
    "SİM-kartlar": [
        { type: "text", label: "Kod*", name: "code", required: true },
        { type: "text", label: "Nömrə*", name: "number", required: true },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Smart saatlar": [
        {
            type: "dropdown",
            label: "Cins",
            name: "gender",
            options: ["Kişi", "Qadın", "Uniseks", "Uşaq"],
        },
        { type: "text", label: "Brend*", name: "brand", required: true },
        {
            type: "checkbox", label: "Funksiyalar", name: "functions", options: [
                "Addımölçən",
                "Səsli mesaj",
                "Təzyiq",
                "Yuxu monitorinqi",
                "Zəng",
                "İzləmə"
            ]
        },
        {
            type: "checkbox", label: "Xüsusiyyətlər", name: "features", options: [
                "Kamera",
                "Sensor ekran",
                "Sim kart",
                "Suya davamlı",
                "Аnti-lost",
            ]
        },
        {
            type: "dropdown",
            label: "Ekran",
            name: "screen",
            options: [
                "AMOLED",
                "HD",
                "IPS",
                "LCD",
                "LED-monitor",
                "OLED",
                "TFT"
            ]
        },
        {
            type: "dropdown", label: "Daxili yaddaş", name: "internalMemory", options: [
                '< 2 GB',
                '> 2 GB'
            ]
        },
        {
            type: "dropdown", label: "Ekran ölçüsü,düym", name: "screenSize", options: [
                '<1"',
                '1" - 1.5"',
                '1.5" - 2"',
                '2" - 2.5"',
                '2.5" - 3"',
                '3" - 3.5"',
                '3.5" - 4"',
                '4" - 4.5"',
                '>5"'
            ]
        },
        {
            type: "dropdown", label: "Korpusun materialı", name: "caseMaterial", options: [
                'Alüminium',
                'Keramika',
                'Metal',
                'Paslanmayan polad',
                'Plastik',
                'Polad',
                'Rezin',
                'Silikon',
                'Titan',
                'Şüşə',
                'Digər material'
            ]
        },
        {
            type: "dropdown", label: "Rəng", name: "color", options: [
                'Ağ',
                'Bej',
                'Boz',
                'Bənövşəyi',
                'Göy',
                'Gümüşü',
                'Mavi',
                'Narıncı',
                'Qara',
                'Qırmızı',
                'Qızılı',
                'Sarı',
                'Yaşıl',
                'Çəhrayı',
                'Başqa rəng'
            ]
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Powerbanklar: [
        {
            type: "dropdown",
            label: "Batareyanın həcmi*",
            name: "capacity",
            required: true,
            options: [
                "< 5000 mAh",
                "5000 mAh",
                "10000 mAh",
                "20000 mAh",
                "30000 mAh",
                "40000 mAh",
                "50000 mAh",
                "> 50000 mAh"
            ]
        },
        { type: "text", label: "Brend*", name: "brand", required: true },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Telefon üçün gamepadlar, triggerlər": null,
    "Telefon üçün stabilizatorlar": null,
    "Smart qolbaqlar": [
        { type: "text", label: "Korpusun materialı", name: "caseMaterial" },
        {
            type: "dropdown", label: "Ekran", name: "screen", options: [
                "AMOLED",
                "HD",
                "IPS",
                "LCD",
                "LED-monitor"
            ]
        },
        {
            type: "checkbox", label: "Xüsusiyyətlər", name: "features", options: [
                "Bildirişlər",
                "Bluetooth",
                "Sensor ekran",
                "Suya davamlı",
                "Wi-Fi"
            ]
        },
        { type: "checkbox", label: "Funksiyalar", name: "functions", options: ["Addımölçən", "Kalori sayğacı", "Nəbzölçən", "Təzyiq", "Yuxu monitorinqi"] },
        { type: "dropdown", label: "Cins", name: "gender", options: ["Kişi", "Qadın", "Uniseks", "Uşaq"], },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Telefon ehtiyat hissələri": [
        { type: "text", label: "Model*", name: "model", required: true },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Selfi çubuqları": null,
    "Video oyunlar və konsollar": null,
    Kabellər: [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Növ*", name: "type", required: true },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Modemlər və şəbəkə avadanlıqları": [
        { type: "dropdown", label: "Rəng", name: "color", options: ['Ağ', 'Bej', 'Boz', 'Bənövşəyi', 'Göy'] },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Noutbuklar üçün örtük və çantalar": null,
    "Səsgücləndiricilər, qulaqlıqlar и mikrofonlar": null,
    "Flash kartlar": [
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        {
            type: "dropdown", label: "Yaddaş*", name: "storage", required: true, options: [
                "< 2 GB",
                "2 GB",
                "4 GB",
                "8 GB",
                "16 GB",
                "32 GB",
                "64 GB",
                "128 GB",
                "256 GB",
                "512 GB",
                "1 TB",
                "2 TB"
            ]
        },
        {
            type: "dropdown", label: "İnterfeys*", name: "interface", required: true, options: [
                "USB",
                "USB 2.0",
                "USB 3.0",
                "USB 3.1",
                "USB 3.2",
                "USB Micro",
                "USB Mini",
                "USB type C",
                "İşıqlandırma"
            ]
        },
        {
            type: "dropdown", label: "Brend*", name: "brand", required: true, options: [
                "ADATA",
                "HP",
                "Kingston",
                "Lenovo",
                "PNY",
                "Patriot",
                "Samsung",
                "Sandisk",
                "Toshiba",
                "Xiaomi",
                "Digər brend"
            ]
        },
    ],
    "Noutbuklar üçün batareyalar": null,
    "Digər kompüter aksesuarları": null,
    "Dok-stansiya": null,
    Klaviaturalar: null,
    Mauslar: null,
    "Foto və videokameralar": [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Kompüter, noutbuk və planşetlər": [
        { type: "text", label: "Brend", name: "brand" },
        {
            type: "dropdown",
            label: "Nüvələrinin sayı",
            name: "coreCount",
            options: [
                "Up to 2",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "14",
                "16",
                "18",
                "32",
                "64",
            ],
        },
        { type: "text", label: "Rəng", name: "color" },
        {
            type: "dropdown",
            label: "Operativ yaddaşı (GB)",
            name: "ram",
            options: [
                "2-yə qədər",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "14",
                "16",
                "18",
                "20",
                "24",
                "32",
                "36",
                "40",
                "44",
                "48",
                "56",
                "64",
                "64 çox",
            ],
        },
        { type: "text", label: "Prosessoru", name: "processor" },
        {
            type: "dropdown", label: "Təyinatı", name: "purpose", options: [
                "Geymer",
                "Sadə əməliyyatlar üçün",
                "İş üçün"
            ]
        },
        { type: "text", label: "Displeyi (düym)", name: "display" },
        { type: "text", label: "Yığıcı növü", name: "assemblyType" },
        { type: "text", label: "Kompüterin növü", name: "computerType" },
        { type: "text", label: "ƏS", name: "os" },
        { type: "text", label: "Videokartı", name: "videoCard" },
        { type: "text", label: "Yaddaş növü", name: "memoryType" },
    ],
    "Noutbuk və netbuklar": [
        { type: "text", label: "Brend", name: "brand" },
        {
            type: "dropdown",
            label: "Nüvələrinin sayı",
            name: "coreCount",
            options: [
                "Up to 2",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "14",
                "16",
                "18",
                "32",
                "64",
            ],
        },
        { type: "text", label: "Rəng", name: "color" },
        {
            type: "dropdown",
            label: "Operativ yaddaşı (GB)",
            name: "ram",
            options: [
                "2-yə qədər",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "14",
                "16",
                "18",
                "20",
                "24",
                "32",
                "36",
                "40",
                "44",
                "48",
                "56",
                "64",
                "64 çox",
            ],
        },
        { type: "text", label: "Prosessoru", name: "processor" },
        { type: "text", label: "Təyinatı", name: "purpose" },
        { type: "text", label: "Displeyi (düym)", name: "display" },
        { type: "text", label: "Yığıcı növü", name: "assemblyType" },
        { type: "text", label: "Kompüterin növü", name: "computerType" },
        { type: "text", label: "ƏS", name: "os" },
        { type: "text", label: "Videokartı", name: "videoCard" },
        { type: "text", label: "Yaddaş növü", name: "memoryType" },
    ],
    "SSD diskləri": [
        { type: "text", label: "Brend", name: "brand" },
        { type: "text", label: "Yaddaş", name: "storage" },
        { type: "text", label: "Standart", name: "standard" },
        { type: "text", label: "Növ", name: "type" },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        {
            type: "dropdown",
            label: "Kredit",
            name: "credit",
            options: ["Kredit var", "Kredit yoxdur"],
        },
    ],
    "Dinamiklər və kolonkalar": [
        { type: "text", label: "Brend", name: "brand" },
        {
            type: "text",
            label: "Kolonka növü*",
            name: "speakerType",
            required: true,
        },
        { type: "text", label: "Rəng", name: "color" },
        { type: "text", label: "Kanalların sayı", name: "channelCount" },
    ],
    "Səs gücləndiriciləri": null,
    "Musiqi mərkəzləri": [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Maqnitofonlar: [
        {
            type: "text",
            label: "Maqnitofon növü *",
            name: "tapeRecorderType",
            required: true,
        },
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    Diktofonlar: [
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        { type: "text", label: "Brend", name: "brand" },
    ],
    Mikrofonlar: [
        { type: "text", label: "Brend", name: "brand" },
        {
            type: "text",
            label: "Qoşulma növü*",
            name: "connectionType",
            required: true,
        },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Minidisk və disk pleyerlər": null,
    "Digər auditexnika": null,
    "iPod və MP3 pleyerlər": null,
    Qulaqcıqlar: [
        { type: "text", label: "Brend", name: "brand" },
        {
            type: "text",
            label: "Qoşulma növü*",
            name: "connectionType",
            required: true,
        },
        { type: "text", label: "Növü", name: "type" },
        { type: "text", label: "Rəng", name: "color" },
        { type: "text", label: "Konstruksiyasının növü", name: "constructionType" },
        { type: "text", label: "Təyinatı", name: "purpose" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    Radio: [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Karaoke: [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Videokameralar: [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Fotokameralar: [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Yaddaş kartları": null,
    "Çanta və çexollar": null,
    İşıqlandırma: null,
    "Enerji qurğuları": null,
    "Obyektivlər və filtrləri": null,
    "Kabellər və adapterlər": null,
    "Digər foto və video aksesuarları": null,
    Videomüşahidə: [
        { type: "text", label: "Brend", name: "brand" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Korpuslar: [
        { type: "text", label: "Brend *", name: "brand", required: true },
        { type: "text", label: "Rəng", name: "color" },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Digər ehtiyat hissələri": [
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Skanerlər: [
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Prosessorlar: [
        { type: "text", label: "Seriya*", name: "series", required: true },
        { type: "text", label: "Model*", name: "model", required: true },
        {
            type: "dropdown",
            label: "Tezlik",
            name: "frequency",
            options: ["< 2 GHz", "2-3 GHz", "3-4 GHz", "> 4 Ghz"],
        },
        {
            type: "dropdown",
            label: "Nüvələrin sayı",
            name: "coreCount",
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "> 8"],
        },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        {
            type: "dropdown",
            label: "Kredit",
            name: "credit",
            options: ["Kredit var", "Kredit yoxdur"],
        },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Qida blokları": [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Güc*", name: "power", required: true },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Videokartlar: [
        { type: "text", label: "Brend*", name: "brand", required: true },
        {
            type: "text",
            label: "Qrafik prosessor*",
            name: "graphicsProcessor",
            required: true,
        },
        { type: "text", label: "Yaddaş*", name: "memory", required: true },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        {
            type: "dropdown",
            label: "Kredit",
            name: "credit",
            options: ["Kredit var", "Kredit yoxdur"],
        },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Ana platalar": [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Model*", name: "model", required: true },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Printerlər: [
        { type: "text", label: "Rəng", name: "color" },
        // { type: "text", label: "Vəziyyəti*", name: "condition", required: true },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Elektron kitablar": [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Rəng", name: "color" },
        { type: "text", label: "Ekranın diaqonalı (düym)", name: "screenDiagonal" },
        { type: "text", label: "Əlaqə", name: "connection" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    Monitorlar: [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Rəng", name: "color" },
        { type: "text", label: "Ekranın diaqonalı (düym)", name: "screenDiagonal" },
        { type: "text", label: "Əlaqə", name: "connection" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
    ],
    "Sərt disklər (HDD)": [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Yaddaş*", name: "storage", required: true },
        { type: "text", label: "Standart", name: "standard" },
        { type: "text", label: "Əlaqə", name: "connection" },
        { type: "text", label: "Fırlanma sürəti", name: "rotationSpeed" },
        {
            type: "dropdown",
            label: "Kredit",
            name: "credit",
            options: ["Kredit var", "Kredit yoxdur"],
        },
        // { type: "text", label: "Çatdırılma", name: "delive
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    Termopasta: null,
    "Fasiləsiz enerji təchizatı (UPS)": [
        { type: "text", label: "Güc, Vt*", name: "power", required: true },
        {
            type: "text",
            label: "Rozetkaların sayı*",
            name: "socketCount",
            required: true,
        },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Soyutma sistemləri": [
        { type: "text", label: "Brend*", name: "brand", required: true },
        { type: "text", label: "Növ", name: "type" },
        {
            type: "dropdown",
            label: "Zəmanət",
            name: "warranty",
            options: ["Zəmanətli", "Zəmanətsiz"],
        },
        // { type: "text", label: "Çatdırılma", name: "delivery" },
        // { type: "text", label: "Vəziyyəti", name: "condition" },
    ],
    "Noutbuklar üçün adapterlər": null,
};
