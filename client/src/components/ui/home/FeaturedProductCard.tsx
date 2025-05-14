import { FEATURED_PRODUCTS } from "@/types/featuredProduct";
import { FiHeart, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Props {
    product: FEATURED_PRODUCTS
    id?: number
}

export default function FeaturedProductCard({ product }: Props) {
    return (
        <Link
            key={product.id}
            to={`/mehsullar/${product.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-sm"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FiHeart className="text-gray-600" />
                    </button>
                </div>
                {product.oldPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - product.price / product.oldPrice) * 100)}%
                        İndirim
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-medium mb-1 text-lg line-clamp-2 group-hover:text-red-500">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-400">
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar
                            className={
                                product.rating >= 4.8
                                    ? 'fill-current'
                                    : 'fill-current opacity-30'
                            }
                        />
                    </div>
                    <span className="text-sm text-gray-500">
                        {product.rating}
                    </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold">{product.price} AZN</span>
                    {product.oldPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                            {product.oldPrice} AZN
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm line-clamp-1">
                        {/* {product.installment}  */}
                        {product.description}
                    </span>
                    {/* <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FiShoppingCart />
                    </button> */}
                </div>
            </div>
        </Link>
    )
}
