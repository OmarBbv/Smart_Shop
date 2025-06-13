import { useAuthController } from "@/hooks/useAuthController";
import { wishlistService } from "@/services/wishList-service";
import { ProductSeriveType } from "@/types/productServiceType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Props {
    product: ProductSeriveType;
    // refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ProductResponse, Error>>;
}

export default function FeaturedProductCard({ product }: Props) {
    const { token } = useAuthController();

    const { data: wishData, refetch: refetchWishlist } = useQuery({
        queryKey: ['get/wishlist'],
        queryFn: () => wishlistService.allWishlist(),
    });

    const isInWishlist = useMemo(() => {
        return wishData?.some(w => w.product.id === product.id);
    }, [wishData, product.id]);

    const mutateWish = useMutation({
        mutationKey: ['add-to-wishlist'],
        mutationFn: (id: number) => {
            if (isInWishlist) {
                return wishlistService.removeItemFromWishlist(id)
            } else {
                return wishlistService.addItemToWishlist(id)
            }
        },
        onSuccess: () => {
            refetchWishlist();
        },
        onError: () => {
            toast.error("Favorilere eklenirken bir hata oluştu");
        }
    });

    const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (token) mutateWish.mutate(product.id)
        else toast.error("Bu məhsulu Seçilmişlərə əlavə etmək üçün əvvəlcə daxil olun.");
    };

    return (
        <Link
            to={`/mehsullar/${product.id}`}
            className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="relative mx-3 mt-3 h-48 overflow-hidden rounded-xl">
                <img
                    src={product.images?.[0] || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
                <button
                    className={`absolute top-0 right-0 m-2 p-2 rounded-full shadow ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'}`}
                    onClick={handleToggleWishlist}
                >
                    <FiHeart />
                </button>
            </div>

            <div className="mt-3 px-4 pb-4">
                <h5 className="text-base font-medium text-slate-900 line-clamp-2 leading-5 h-8 capitalize">{product.name}</h5>
                <div className="my-2 flex items-center justify-between">
                    <p>
                        <span className="text-lg font-bold text-slate-900">{product.price} AZN</span>
                        <span className="ml-1 text-xs text-slate-500 line-through">
                            {product.price} AZN
                        </span>
                    </p>
                </div>
                <p className="text-xs text-green-600 line-clamp-1">{product.description}</p>
            </div>
        </Link>
    );
}
