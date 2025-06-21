import Category from "../models/categoryModel.js";

export async function seedCategories() {
    // console.log("🌱 Kategori seed işlemi başlatılıyor...");

    const existingCount = await Category.count();

    if (existingCount > 0) {
        // console.log(`✅ Zaten ${existingCount} kategori mevcut. Seed işlemi atlanıyor.`);
        return;
    }

    const categories = [
        { id: 1, name: 'Mobil telefon və aksesuarlar', parentId: null },
        // Mobil telefonlar
        { id: 101, name: 'Mobil telefonlar', parentId: 1 },
        { id: 10101, name: 'Apple iPhone', parentId: 101 },
        { id: 10102, name: 'Samsung', parentId: 101 },
        { id: 10103, name: 'Xiaomi', parentId: 101 },
        { id: 10104, name: 'Honor', parentId: 101 },
        { id: 10105, name: 'Nokia', parentId: 101 },
        { id: 10106, name: 'Poco', parentId: 101 },
        { id: 10107, name: 'Huawei', parentId: 101 },
        { id: 10108, name: 'Infinix', parentId: 101 },
        { id: 10109, name: 'Tecno', parentId: 101 },
        { id: 10110, name: 'Oppo', parentId: 101 },
        { id: 10111, name: 'Vertu', parentId: 101 },
        { id: 10112, name: 'Realme', parentId: 101 },
        { id: 10113, name: 'Blackberry', parentId: 101 },
        { id: 10114, name: 'ZTE', parentId: 101 },
        { id: 10115, name: 'Motorola', parentId: 101 },
        { id: 10116, name: 'Sony', parentId: 101 },
        { id: 10117, name: 'OnePlus', parentId: 101 },
        { id: 10118, name: 'Vivo', parentId: 101 },
        { id: 10119, name: 'Hoffmann', parentId: 101 },
        { id: 10120, name: 'LG', parentId: 101 },
        { id: 10121, name: 'HTC', parentId: 101 },
        { id: 10122, name: 'Lenovo', parentId: 101 },
        { id: 10123, name: 'Alcatel', parentId: 101 },
        { id: 10124, name: 'Google', parentId: 101 },
        { id: 10125, name: 'Inoi', parentId: 101 },
        { id: 10126, name: 'Fly', parentId: 101 },
        { id: 10128, name: 'Caterpillar', parentId: 101 },
        { id: 10129, name: 'Sagem', parentId: 101 },
        { id: 10130, name: 'Sprint', parentId: 101 },
        { id: 10131, name: 'Datawind', parentId: 101 },
        { id: 10132, name: 'I-Mate', parentId: 101 },
        { id: 10133, name: 'Jiayu', parentId: 101 },
        { id: 10134, name: 'Prestigio', parentId: 101 },
        { id: 10135, name: 'T-Mobile, MDA', parentId: 101 },
        { id: 10136, name: 'Digər mobil telefonlar', parentId: 101 },
        // other
        { id: 102, name: 'Smart saatlar', parentId: 1 },
        { id: 103, name: 'Smart qolbaqlar', parentId: 1 },
        { id: 104, name: 'Kabrolar', parentId: 1 },
        { id: 105, name: 'Kabellər', parentId: 1 },
        { id: 106, name: 'Adapterlər', parentId: 1 },
        { id: 107, name: 'Powerbanklar', parentId: 1 },
        { id: 108, name: 'Qoruyucu plyonka və şüşələr', parentId: 1 },
        { id: 109, name: 'SİM-kartlar', parentId: 1 },
        { id: 110, name: 'Şarj cihazları', parentId: 1 },
        { id: 111, name: 'Telefon ehtiyat hissələri', parentId: 1 },
        { id: 112, name: 'Stiluslar', parentId: 1 },
        { id: 113, name: 'Telefon üçün tripodlar', parentId: 1 },
        { id: 114, name: 'Telefon üçün stabilizatorlar', parentId: 1 },
        { id: 115, name: 'Selfi çubuqları', parentId: 1 },
        { id: 116, name: 'Telefon üçün gamepadlar, triggerlər', parentId: 1 },
        { id: 117, name: 'Telefon üçün soyuducular', parentId: 1 },
        { id: 118, name: 'Mobil telefonlar üçün digər aksesuarlar', parentId: 1 },

        // Kompüter, noutbuk və planşetlər
        { id: 2, name: 'Kompüter, noutbuk və planşetlər', parentId: null },
        // Masaüstü kompüterlər və iş stansiyaları
        { id: 201, name: 'Masaüstü kompüterlər və iş stansiyaları', parentId: 2 },
        // Noutbuk və netbuklar
        { id: 202, name: 'Noutbuk və netbuklar', parentId: 2 },
        { id: 20201, name: 'HP', parentId: 202 },
        { id: 20202, name: 'Apple MacBook', parentId: 202 },
        { id: 20203, name: 'Acer', parentId: 202 },
        { id: 20204, name: 'ASUS', parentId: 202 },
        { id: 20205, name: 'Lenovo Noutbuk', parentId: 202 },
        { id: 20206, name: 'Dell', parentId: 202 },
        { id: 20207, name: 'Toshiba', parentId: 202 },
        { id: 20208, name: 'Samsung Noutbuk', parentId: 202 },
        { id: 20209, name: 'MSI', parentId: 202 },
        { id: 20210, name: 'Huawei Noutbuk', parentId: 202 },
        { id: 20211, name: 'Sony Noutbuk', parentId: 202 },
        { id: 20212, name: 'Nexus', parentId: 202 },
        { id: 20213, name: 'Noutbukların alışı', parentId: 202 },
        { id: 20214, name: 'Digər noutbuklar ve netbuklar', parentId: 202 },
        // Planşetler
        { id: 203, name: 'Planşetler', parentId: 2 },
        { id: 20301, name: 'Apple iPad', parentId: 203 },
        { id: 20302, name: 'Samsung Planşet', parentId: 203 },
        { id: 20303, name: 'Xiaomi', parentId: 203 },
        { id: 20304, name: 'Lenovo', parentId: 203 },
        { id: 20305, name: 'Modio', parentId: 203 },
        { id: 20306, name: 'Digər planşetler', parentId: 203 },
        { id: 204, name: 'Elektron kitablar', parentId: 2 },
        // Kompüter ehtiyyat hissələri
        { id: 205, name: 'Kompüter ehtiyyat hissələri', parentId: 2 },
        { id: 20501, name: 'SSD diskləri', parentId: 205 },
        { id: 20502, name: 'Sərt disklər (HDD)', parentId: 205 },
        { id: 20503, name: 'Videokartlar', parentId: 205 },
        { id: 20504, name: 'Prosessorlar', parentId: 205 },
        { id: 20505, name: 'Operativ yaddaş (RAM)', parentId: 205 },
        { id: 20506, name: 'Ana platalar', parentId: 205 },
        { id: 20507, name: 'Soyutma sistemləri', parentId: 205 },
        { id: 20508, name: 'Qida blokları', parentId: 205 },
        { id: 20509, name: 'Fasiləsiz enerji təchizatı (UPS)', parentId: 205 },
        { id: 20510, name: 'Korpuslar', parentId: 205 },
        { id: 20511, name: 'Termopasta', parentId: 205 },
        { id: 20512, name: 'Digər ehtiyat hissələri', parentId: 205 },
        // Kompüter və noutbuk aksesuarları
        { id: 206, name: 'Kompüter və noutbuk aksesuarları', parentId: 2 },
        { id: 20601, name: 'Noutbuklar üçün örtük və çantalar', parentId: 206 },
        { id: 20602, name: 'Noutbuklar üçün batareyalar', parentId: 206 },
        { id: 20603, name: 'Noutbuklar üçün adapterlər', parentId: 206 },
        { id: 20604, name: 'Dok-stansiya', parentId: 206 },
        { id: 20605, name: 'Səsgücləndiricilər, qulaqlıqlar и mikrofonlar', parentId: 206 },
        { id: 20606, name: 'Mauslar', parentId: 206 },
        { id: 20607, name: 'Klaviaturalar', parentId: 206 },
        { id: 20608, name: 'Flash kartlar', parentId: 206 },
        { id: 20609, name: 'Veb kameralar', parentId: 206 },
        { id: 20610, name: 'Digər kompüter aksesuarları', parentId: 206 },
        // other
        { id: 207, name: 'Serverlər', parentId: 2 },
        { id: 208, name: 'Monitorlar', parentId: 2 },
        { id: 209, name: 'Modemlər və şəbəkə avadanlıqları', parentId: 2 },
        { id: 210, name: 'Printerlər', parentId: 2 },
        { id: 211, name: 'Skanerlər', parentId: 2 },

        // Audio
        { id: 3, name: 'Audio', parentId: null },
        { id: 301, name: 'Qulaqcıqlar', parentId: 3 },
        { id: 302, name: 'Dinamiklər və kolonkalar', parentId: 3 },
        { id: 303, name: 'Mikrofonlar', parentId: 3 },
        { id: 304, name: 'Səs gücləndiriciləri', parentId: 3 },
        { id: 305, name: 'Musiqi mərkəzləri', parentId: 3 },
        { id: 306, name: 'Maqnitofonlar', parentId: 3 },
        { id: 307, name: 'Karaoke', parentId: 3 },
        { id: 308, name: 'Radio', parentId: 3 },
        { id: 309, name: 'Minidisk və disk pleyerlər', parentId: 3 },
        { id: 310, name: 'iPod və MP3 pleyerlər', parentId: 3 },
        { id: 311, name: 'Diktofonlar', parentId: 3 },
        { id: 312, name: 'Digər auditexnika', parentId: 3 },

        // Video oyunlar və konsollar
        { id: 4, name: "Video oyunlar və konsollar", parentId: null },
        { id: 401, name: "Nintendo Switch", parentId: 4 },
        { id: 402, name: "Nintendo 3DS", parentId: 4 },
        { id: 403, name: "Nintendo Wii", parentId: 4 },
        { id: 404, name: "PS2 & PS1 (Sony PlayStation 2 & 1)", parentId: 4 },
        { id: 405, name: "PS3 (Sony PlayStation 3)", parentId: 4 },
        { id: 406, name: "PS4 (Sony Playstation 4)", parentId: 4 },
        { id: 407, name: "PS5 (Sony PlayStation 5)", parentId: 4 },
        { id: 408, name: "PSP (Sony PlayStation Portable)", parentId: 4 },
        { id: 409, name: "PS Vita (Sony Playstation Vita)", parentId: 4 },
        { id: 410, name: "Xbox 360 & Xbox", parentId: 4 },
        { id: 411, name: "Xbox One", parentId: 4 },
        { id: 412, name: "Xbox Series S", parentId: 4 },
        { id: 413, name: "Xbox Series X", parentId: 4 },
        { id: 414, name: "NES Classic", parentId: 4 },
        { id: 415, name: "Oyun diskləri və kartricləri", parentId: 4 },
        { id: 416, name: "Video oyunlar üçün aksesuarlar", parentId: 4 },
        { id: 417, name: "Digər oyun və konsollar", parentId: 4 },

        // Foto və videokameralar
        { id: 5, name: "Foto və videokameralar", parentId: null },
        { id: 501, name: "Fotokameralar", parentId: 5 },
        { id: 502, name: "Videokameralar", parentId: 5 },
        { id: 503, name: "Videomüşahidə", parentId: 5 },

        //Foto və video aksesuarları
        { id: 504, name: "Foto və video aksesuarları", parentId: 5 },
        { id: 50401, name: "Obyektivlər və filtrləri", parentId: 504 },
        { id: 50402, name: "İşıqlandırma", parentId: 504 },
        { id: 50403, name: "Kabellər və adapterlər", parentId: 504 },
        { id: 50404, name: "Çanta və çexollar", parentId: 504 },
        { id: 50405, name: "Enerji qurğuları", parentId: 504 },
        { id: 50406, name: "Yaddaş kartları", parentId: 504 },
        { id: 50407, name: "Digər foto və video aksesuarları", parentId: 504 }
    ]

    for (const categoryData of categories) {
        try {
            const existingCategory = await Category.findOne({
                where: { id: categoryData.id }
            });

            if (existingCategory) {
                console.log(`⚠️ ${categoryData.name} kategorisi zaten mevcut, atlanıyor`);
                continue;
            }
            await Category.create(categoryData);
        } catch (error) {

            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log(`⚠️ ${categoryData.name} kategorisi zaten mevcut (slug duplicate), atlanıyor`);
                continue;
            }

            console.error('❌ Seed işlemi sırasında hata:', error);
            throw error;
        }
    }

    console.log('🎉 Kategori seed işlemi tamamlandı!');
    console.log('Seed data eklendi');
}

if (import.meta.url === process.argv[1] || process.argv[1].endsWith('seedCategories.js')) {
    seedCategories()
        .then(() => process.exit())
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}