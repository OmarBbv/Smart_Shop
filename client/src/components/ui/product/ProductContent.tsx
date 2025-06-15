import { LoadingOrError } from "@/components/Loading";
import FeaturedProductCard from "@/components/ui/home/FeaturedProductCard";
import { productService } from "@/services/product-service";
import { RootState } from "@/stores/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WindowVirtualizer } from "virtua";
import { useEffect, useRef } from "react";

export const ProductContent = () => {
    const { slug } = useParams();
    const stateFilter = useSelector((state: RootState) => state.filter);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ['get/all/category/product', slug, stateFilter],
        queryFn: ({ pageParam = 1 }) => {
            if (!slug) return Promise.resolve({ data: [], pagination: { currentPage: 1, totalPages: 1 } });
            const pr = { minPrice: stateFilter.min, maxPrice: stateFilter.max };
            return productService.getProductsForCategoryAndSubcategories({ slug, pr, page: pageParam });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: !!slug
    });

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: '100px'
            }
        );

        const el = loadMoreRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <LoadingOrError isLoading={true} />;
    if (isError) return <LoadingOrError error={(error as Error).message} />;

    const allProducts = data?.pages.flatMap(page => page.data) ?? [];

    return (
        <>
            <WindowVirtualizer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {allProducts.length > 0 ? (
                        allProducts.map((prod: any) => (
                            <FeaturedProductCard key={prod.id} product={prod} />
                        ))
                    ) : (
                        <div>mehsul yoxdur</div>
                    )}
                </div>
            </WindowVirtualizer>

            <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <LoadingOrError isLoading={true} />}
            </div>
        </>
    );
};
