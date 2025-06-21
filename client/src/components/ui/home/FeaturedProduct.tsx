import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/product-service";
import FeaturedProductCard from "./FeaturedProductCard";
import { LoadingOrError } from "@/components/Loading";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

export default function FeaturedProduct() {
    const MAX_PRODUCTS = 100;

    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ['get/all/products'],
        queryFn: ({ pageParam = 1 }) => productService.getAllProducts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        }
    });

    useEffect(() => {
        const totalFetched = data?.pages.flatMap(p => p.data).length ?? 0
        if (inView && hasNextPage && !isFetchingNextPage && totalFetched < MAX_PRODUCTS) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <LoadingOrError isLoading={true} />;
    if (isError) return <LoadingOrError error={(error as Error).message} />;

    const allProducts = data?.pages.flatMap(page => page.data) ?? [];
    const totalFetched = allProducts.length;

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bütün məhsullar</h2>
                <Link to="/mehsullar" className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm">
                    Daha çox <FiChevronRight />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {allProducts.length > 0 ? (
                    allProducts.map(prod => (
                        <FeaturedProductCard key={prod.id} product={prod} />
                    ))
                ) : (
                    <div>Ürün bulunamadı</div>
                )}
            </div>
            {totalFetched >= MAX_PRODUCTS && hasNextPage && (
                <div className="flex justify-center mt-6">
                    <Link to='/mehsullar'
                        className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border border-red-500 rounded-full shadow-md hover:text-white"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Daha çoxuna bax
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                            Daha çoxuna bax
                        </span>
                        <span className="relative invisible">Daha çoxuna bax</span>
                    </Link>
                </div>
            )}

            <div ref={ref} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <LoadingOrError isLoading={true} />}
            </div>
        </section>
    );
}
