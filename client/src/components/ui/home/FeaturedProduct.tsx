import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/product-service";
import FeaturedProductCard from "./FeaturedProductCard";
import { useEffect, useRef } from "react";
import { WindowVirtualizer } from 'virtua';
import { LoadingOrError } from "@/components/Loading";

export default function FeaturedProduct() {
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

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: '100px' }
        );

        const el = loadMoreRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const allProducts = data?.pages.flatMap(page => page.data) ?? [];

    if (isLoading) return <LoadingOrError isLoading={true} />;
    if (isError) return <LoadingOrError error={(error as Error).message} />;

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Öne Çıkan Ürünler</h2>
                <Link to="/mehsullar" className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm">
                    Daha çox <FiChevronRight />
                </Link>
            </div>

            <WindowVirtualizer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {allProducts.length > 0 ? (
                        allProducts.map(prod => (
                            <FeaturedProductCard key={prod.id} product={prod} />
                        ))
                    ) : (
                        <div>Ürün bulunamadı</div>
                    )}
                </div>
            </WindowVirtualizer>

            <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <LoadingOrError isLoading={true} />}
            </div>
        </section>
    );
}
