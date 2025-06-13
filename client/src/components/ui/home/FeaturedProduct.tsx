import { FiChevronRight, } from "react-icons/fi";
import { Link } from "react-router-dom";
import { WindowVirtualizer } from 'virtua'
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product-service";
import FeaturedProductCard from "./FeaturedProductCard";

export default function FeaturedProduct() {
    const { data } = useQuery({
        queryKey: ['get/all/products'],
        queryFn: () => productService.getAllProducts(),
    });

    const allProducts = data?.data;
    // const pagination = data?.pagination;

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" >
                    {
                        allProducts?.map(prod => {
                            return <FeaturedProductCard key={prod.id} product={prod} />
                        })
                    }
                </div>
            </WindowVirtualizer>
        </section>

    )
}
