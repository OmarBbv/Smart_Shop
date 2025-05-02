import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SubcategoryLevel3 {
  name: string;
  slug: string;
}

interface SubcategoryLevel2 {
  name: string;
  slug: string;
  subcategories: SubcategoryLevel3[];
}

interface Category {
  name: string;
  slug: string;
  subcategories: SubcategoryLevel2[];
}

const categories: Category[] = [
  {
    name: 'Elektronik',
    slug: 'elektronik',
    subcategories: [
      {
        name: 'Bilgisayar',
        slug: 'bilgisayar',
        subcategories: [
          { name: 'Dizüstü', slug: 'dizustu' },
          { name: 'Masaüstü', slug: 'masaustu' },
          { name: 'Monitör', slug: 'monitor' },
        ],
      },
      {
        name: 'Telefon',
        slug: 'telefon',
        subcategories: [
          { name: 'Akıllı Telefon', slug: 'akilli-telefon' },
          { name: 'Aksesuarlar', slug: 'aksesuarlar' },
          { name: 'Powerbank', slug: 'powerbank' },
        ],
      },
      {
        name: 'Televizyon',
        slug: 'televizyon',
        subcategories: [
          { name: 'LED TV', slug: 'led-tv' },
          { name: 'OLED TV', slug: 'oled-tv' },
          { name: 'QLED TV', slug: 'qled-tv' },
        ],
      },
      {
        name: 'Ev Aletleri',
        slug: 'ev-aletleri',
        subcategories: [
          { name: 'Elektrikli Süpürge', slug: 'elektrikli-supurge' },
          { name: 'Mikrodalga', slug: 'mikrodalga' },
          { name: 'Çamaşır Makinesi', slug: 'camasir-makinesi' },
        ],
      },
      {
        name: 'Moda',
        slug: 'moda',
        subcategories: [
          { name: 'Kadın Giyim', slug: 'kadin-giyim' },
          { name: 'Erkek Giyim', slug: 'erkek-giyim' },
          { name: 'Aksesuar', slug: 'aksesuar' },
        ],
      },
      {
        name: 'Ayakkabı',
        slug: 'ayakkabi',
        subcategories: [
          { name: 'Spor Ayakkabı', slug: 'spor-ayakkabi' },
          { name: 'Klasik Ayakkabı', slug: 'klasik-ayakkabi' },
          { name: 'Bot', slug: 'bot' },
        ],
      },
      {
        name: 'Spor',
        slug: 'spor',
        subcategories: [
          { name: 'Fitness', slug: 'fitness' },
          { name: 'Kamp Malzemeleri', slug: 'kamp-malzemeleri' },
          { name: 'Bisiklet', slug: 'bisiklet' },
        ],
      },
      {
        name: 'Kitap',
        slug: 'kitap',
        subcategories: [
          { name: 'Roman', slug: 'roman' },
          { name: 'Kişisel Gelişim', slug: 'kisisel-gelisim' },
          { name: 'Edebiyat', slug: 'edebiyat' },
        ],
      },
      {
        name: 'Kozmetik',
        slug: 'kozmetik',
        subcategories: [
          { name: 'Makyaj', slug: 'makyaj' },
          { name: 'Cilt Bakımı', slug: 'cilt-bakimi' },
          { name: 'Parfüm', slug: 'parfum' },
        ],
      },
      {
        name: 'Anne & Bebek',
        slug: 'anne-bebek',
        subcategories: [
          { name: 'Bebek Arabası', slug: 'bebek-arabasi' },
          { name: 'Bebek Bezi', slug: 'bebek-bezi' },
          { name: 'Emzik', slug: 'emzik' },
        ],
      },
      {
        name: 'Ev & Yaşam',
        slug: 'ev-yasam',
        subcategories: [
          { name: 'Mobilya', slug: 'mobilya' },
          { name: 'Dekorasyon', slug: 'dekorasyon' },
          { name: 'Mutfak Gereçleri', slug: 'mutfak-gerecleri' },
        ],
      },
      {
        name: 'Oyun & Konsol',
        slug: 'oyun-konsol',
        subcategories: [
          { name: 'PlayStation', slug: 'playstation' },
          { name: 'Xbox', slug: 'xbox' },
          { name: 'Nintendo', slug: 'nintendo' },
        ],
      },
      {
        name: 'Fotoğraf & Kamera',
        slug: 'fotograf-kamera',
        subcategories: [
          { name: 'DSLR Kamera', slug: 'dslr-kamera' },
          { name: 'Aksiyon Kamerası', slug: 'aksiyon-kamerasi' },
          { name: 'Tripod', slug: 'tripod' },
        ],
      },
      {
        name: 'Ofis & Kırtasiye',
        slug: 'ofis-kirtasiye',
        subcategories: [
          { name: 'Yazıcı', slug: 'yazici' },
          { name: 'Kalemler', slug: 'kalemler' },
          { name: 'Defterler', slug: 'defterler' },
        ],
      },
      {
        name: 'Evcil Hayvan',
        slug: 'evcil-hayvan',
        subcategories: [
          { name: 'Mama', slug: 'mama' },
          { name: 'Oyuncaklar', slug: 'oyuncaklar' },
          { name: 'Köpek Ürünleri', slug: 'kopek-urunleri' },
        ],
      },
      {
        name: 'Hobi & Oyuncak',
        slug: 'hobi-oyuncak',
        subcategories: [
          { name: 'Lego', slug: 'lego' },
          { name: 'Puzzle', slug: 'puzzle' },
          { name: 'Model Setleri', slug: 'model-setleri' },
        ],
      },
    ],
  },
  {
    name: 'Moda',
    slug: 'moda',
    subcategories: [
      {
        name: 'Kadın',
        slug: 'kadin',
        subcategories: [
          { name: 'Elbise', slug: 'elbise' },
          { name: 'Çanta', slug: 'canta' },
          { name: 'Ayakkabı', slug: 'ayakkabi' },
        ],
      },
      {
        name: 'Erkek',
        slug: 'erkek',
        subcategories: [
          { name: 'Tişört', slug: 'tisort' },
          { name: 'Pantolon', slug: 'pantolon' },
          { name: 'Gömlek', slug: 'gomlek' },
        ],
      },
    ],
  },
  {
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    subcategories: [
      {
        name: 'Mobilya',
        slug: 'mobilya',
        subcategories: [
          { name: 'Koltuk Takımı', slug: 'koltuk' },
          { name: 'Yatak Odası', slug: 'yatak-odasi' },
          { name: 'Masa', slug: 'masa' },
        ],
      },
      {
        name: 'Dekorasyon',
        slug: 'dekorasyon',
        subcategories: [
          { name: 'Perde', slug: 'perde' },
          { name: 'Halı', slug: 'hali' },
          { name: 'Aydınlatma', slug: 'aydinlatma' },
        ],
      },
    ],
  },
  {
    name: 'Spor & Outdoor',
    slug: 'spor-outdoor',
    subcategories: [
      {
        name: 'Fitness',
        slug: 'fitness',
        subcategories: [
          { name: 'Dambıl', slug: 'dambil' },
          { name: 'Pilates', slug: 'pilates' },
          { name: 'Koşu Bandı', slug: 'kosu-bandi' },
        ],
      },
      {
        name: 'Kamp',
        slug: 'kamp',
        subcategories: [
          { name: 'Çadır', slug: 'cadir' },
          { name: 'Uyku Tulumu', slug: 'uyku-tulumu' },
          { name: 'Mat', slug: 'mat' },
        ],
      },
    ],
  },
  {
    name: 'Anne & Bebek',
    slug: 'anne-bebek',
    subcategories: [
      {
        name: 'Bebek Giyim',
        slug: 'bebek-giyim',
        subcategories: [
          { name: 'Tulum', slug: 'tulum' },
          { name: 'Body', slug: 'body' },
          { name: 'Çorap', slug: 'corap' },
        ],
      },
      {
        name: 'Bebek Bakımı',
        slug: 'bebek-bakimi',
        subcategories: [
          { name: 'Bez', slug: 'bez' },
          { name: 'Islak Mendil', slug: 'islak-mendil' },
          { name: 'Banyo Ürünleri', slug: 'banyo-urunleri' },
        ],
      },
    ],
  },
  {
    name: 'Kozmetik',
    slug: 'kozmetik',
    subcategories: [
      {
        name: 'Makyaj',
        slug: 'makyaj',
        subcategories: [
          { name: 'Fondöten', slug: 'fondoten' },
          { name: 'Ruj', slug: 'ruj' },
          { name: 'Allık', slug: 'allik' },
        ],
      },
      {
        name: 'Cilt Bakımı',
        slug: 'cilt-bakimi',
        subcategories: [
          { name: 'Nemlendirici', slug: 'nemlendirici' },
          { name: 'Serum', slug: 'serum' },
          { name: 'Güneş Kremi', slug: 'gunes-kremi' },
        ],
      },
    ],
  },
  {
    name: 'Süpermarket',
    slug: 'supermarket',
    subcategories: [
      {
        name: 'Kahvaltılık',
        slug: 'kahvaltilik',
        subcategories: [
          { name: 'Peynir', slug: 'peynir' },
          { name: 'Zeytin', slug: 'zeytin' },
          { name: 'Bal', slug: 'bal' },
        ],
      },
      {
        name: 'İçecekler',
        slug: 'icecekler',
        subcategories: [
          { name: 'Su', slug: 'su' },
          { name: 'Meyve Suyu', slug: 'meyve-suyu' },
          { name: 'Gazlı İçecek', slug: 'gazli-icecek' },
        ],
      },
    ],
  },
  {
    name: 'Kitap & Kırtasiye',
    slug: 'kitap-kirtasiye',
    subcategories: [
      {
        name: 'Roman',
        slug: 'roman',
        subcategories: [
          { name: 'Klasik', slug: 'klasik' },
          { name: 'Fantastik', slug: 'fantastik' },
          { name: 'Polisiye', slug: 'polisiye' },
        ],
      },
      {
        name: 'Kırtasiye',
        slug: 'kirtasiye',
        subcategories: [
          { name: 'Kalem', slug: 'kalem' },
          { name: 'Defter', slug: 'defter' },
          { name: 'Silgi', slug: 'silgi' },
        ],
      },
    ],
  },
  {
    name: 'Oyun & Konsol',
    slug: 'oyun-konsol',
    subcategories: [
      {
        name: 'PlayStation',
        slug: 'playstation',
        subcategories: [
          { name: 'Oyunlar', slug: 'oyunlar' },
          { name: 'Kollar', slug: 'kollar' },
          { name: 'Aksesuarlar', slug: 'aksesuarlar' },
        ],
      },
      {
        name: 'Xbox',
        slug: 'xbox',
        subcategories: [
          { name: 'Oyunlar', slug: 'oyunlar-xbox' },
          { name: 'Kollar', slug: 'kollar-xbox' },
          { name: 'Aksesuarlar', slug: 'aksesuarlar-xbox' },
        ],
      },
    ],
  },
  {
    name: 'Evcil Hayvan',
    slug: 'evcil-hayvan',
    subcategories: [
      {
        name: 'Kedi',
        slug: 'kedi',
        subcategories: [
          { name: 'Mama', slug: 'mama-kedi' },
          { name: 'Oyuncak', slug: 'oyuncak-kedi' },
          { name: 'Kum', slug: 'kum-kedi' },
        ],
      },
      {
        name: 'Köpek',
        slug: 'kopek',
        subcategories: [
          { name: 'Mama', slug: 'mama-kopek' },
          { name: 'Tasma', slug: 'tasma' },
          { name: 'Oyuncak', slug: 'oyuncak-kopek' },
        ],
      },
    ],
  },
  {
    name: 'Otomotiv',
    slug: 'otomotiv',
    subcategories: [
      {
        name: 'Araç Aksesuarları',
        slug: 'arac-aksesuarlari',
        subcategories: [
          { name: 'Navigasyon', slug: 'navigasyon' },
          { name: 'Kamera', slug: 'kamera' },
          { name: 'Koltuk Kılıfı', slug: 'koltuk-kilifi' },
        ],
      },
      {
        name: 'Bakım Ürünleri',
        slug: 'bakim-urunleri',
        subcategories: [
          { name: 'Cila', slug: 'cila' },
          { name: 'Temizlik', slug: 'temizlik' },
          { name: 'Yağlar', slug: 'yaglar' },
        ],
      },
    ],
  },
  {
    name: 'Yapı Market',
    slug: 'yapi-market',
    subcategories: [
      {
        name: 'El Aletleri',
        slug: 'el-aletleri',
        subcategories: [
          { name: 'Tornavida', slug: 'tornavida' },
          { name: 'Çekiç', slug: 'cekic' },
          { name: 'Matkap', slug: 'matkap' },
        ],
      },
      {
        name: 'Bahçe',
        slug: 'bahce',
        subcategories: [
          { name: 'Çim Biçme', slug: 'cim-bicme' },
          { name: 'Sulama', slug: 'sulama' },
          { name: 'Saksı', slug: 'saksi' },
        ],
      },
    ],
  },
  {
    name: 'Takı & Saat',
    slug: 'taki-saat',
    subcategories: [
      {
        name: 'Kadın Takı',
        slug: 'kadin-taki',
        subcategories: [
          { name: 'Kolye', slug: 'kolye' },
          { name: 'Bileklik', slug: 'bileklik' },
          { name: 'Yüzük', slug: 'yuzuk' },
        ],
      },
      {
        name: 'Saat',
        slug: 'saat',
        subcategories: [
          { name: 'Kadın Saat', slug: 'kadin-saat' },
          { name: 'Erkek Saat', slug: 'erkek-saat' },
          { name: 'Akıllı Saat', slug: 'akilli-saat' },
        ],
      },
    ],
  },
  {
    name: 'Ayakkabı & Çanta',
    slug: 'ayakkabi-canta',
    subcategories: [
      {
        name: 'Kadın Ayakkabı',
        slug: 'kadin-ayakkabi',
        subcategories: [
          { name: 'Topuklu', slug: 'topuklu' },
          { name: 'Spor Ayakkabı', slug: 'spor-ayakkabi' },
          { name: 'Babet', slug: 'babet' },
        ],
      },
      {
        name: 'Çanta',
        slug: 'canta',
        subcategories: [
          { name: 'Omuz Çantası', slug: 'omuz-cantasi' },
          { name: 'Sırt Çantası', slug: 'sirt-cantasi' },
          { name: 'Portföy', slug: 'portfoy' },
        ],
      },
    ],
  },
  {
    name: 'Elektrikli Ev Aletleri',
    slug: 'elektrikli-ev-aletleri',
    subcategories: [
      {
        name: 'Küçük Aletler',
        slug: 'kucuk-aletler',
        subcategories: [
          { name: 'Su Isıtıcı', slug: 'su-isitici' },
          { name: 'Tost Makinesi', slug: 'tost-makinesi' },
          { name: 'Mikser', slug: 'mikser' },
        ],
      },
      {
        name: 'Temizlik',
        slug: 'temizlik',
        subcategories: [
          { name: 'Elektrikli Süpürge', slug: 'elektrikli-supurge' },
          { name: 'Buharlı Temizleyici', slug: 'buharli-temizleyici' },
          { name: 'Robot Süpürge', slug: 'robot-supurge' },
        ],
      },
    ],
  },
];

export default function MultiLevelCategory() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<number | null>(
    null
  );
  const [activeSubSubcategory, setActiveSubSubcategory] = useState<
    number | null
  >(null);

  const getSubcategories = () => {
    if (activeCategory === null) return [];
    const category = categories[activeCategory];
    if (!category) return [];
    return category.subcategories || [];
  };

  const getSubSubcategories = () => {
    if (activeCategory === null || activeSubcategory === null) return [];
    const category = categories[activeCategory];
    if (!category) return [];
    const subcategory = category.subcategories[activeSubcategory];
    if (!subcategory) return [];
    return subcategory.subcategories || [];
  };

  const subcategories = getSubcategories();
  const subSubcategories = getSubSubcategories();

  return (
    <div className="hidden lg:grid lg:grid-cols-3 w-full py-3 bg-white">
      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm border-r border-gray-200 max-h-[500px] overflow-y-auto"
      >
        {categories.map((item, index) => (
          <div
            key={item.slug}
            className={`flex items-center justify-between gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeCategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => {
              setActiveCategory(index);
              if (item.subcategories.length > 0) {
                setActiveSubcategory(0);
                if (item.subcategories[0].subcategories.length > 0) {
                  setActiveSubSubcategory(0);
                } else {
                  setActiveSubSubcategory(null);
                }
              } else {
                setActiveSubcategory(null);
                setActiveSubSubcategory(null);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {item.name}
              {item.subcategories.length > 0 && (
                <span className="text-xs text-gray-500">
                  ({item.subcategories.length})
                </span>
              )}
            </div>
            {item.subcategories.length > 0 && (
              <ChevronRight className="text-gray-500" size={16} />
            )}
          </div>
        ))}
      </div>

      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm border-r border-gray-200 max-h-[500px] overflow-y-auto"
      >
        {subcategories.map((subcat, index) => (
          <div
            key={subcat.slug}
            className={`flex items-center justify-between gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeSubcategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => {
              setActiveSubcategory(index);
              if (subcat.subcategories.length > 0) {
                setActiveSubSubcategory(0);
              } else {
                setActiveSubSubcategory(null);
              }
            }}
          >
            <div className="flex items-center gap-2">{subcat.name}</div>
            {subcat.subcategories.length > 0 && (
              <ChevronRight className="text-gray-500" size={16} />
            )}
          </div>
        ))}
      </div>

      <div
        id="custom-scrollbar-thin"
        className="flex flex-col text-sm max-h-[500px] overflow-y-auto"
      >
        {subSubcategories.map((item, index) => (
          <div
            key={item.slug}
            className={`flex items-center gap-2 leading-12 px-5 cursor-pointer hover:bg-slate-100 ${
              activeSubSubcategory === index ? 'bg-slate-100' : ''
            }`}
            onMouseEnter={() => setActiveSubSubcategory(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
