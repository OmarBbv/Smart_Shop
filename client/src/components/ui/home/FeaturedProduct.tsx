import { FEATURED_PRODUCTS } from "@/data/data";
import { FiChevronRight, } from "react-icons/fi";
import { Link } from "react-router-dom";
import FeaturedProductCard from "./FeaturedProductCard";
import { WindowVirtualizer } from 'virtua'

export default function FeaturedProduct() {
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Öne Çıkan Ürünler</h2>
                <Link
                    to="/mehsullar"
                    className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                >
                    Tümünü Gör <FiChevronRight />
                </Link>
            </div>
            <WindowVirtualizer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
                    {FEATURED_PRODUCTS.map((product) => (
                        <FeaturedProductCard product={product} key={product.id} />
                    ))}
                </div>
            </WindowVirtualizer>
        </section>

    )
}
