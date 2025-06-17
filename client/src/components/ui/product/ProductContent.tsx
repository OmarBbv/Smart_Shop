import { LoadingOrError } from "@/components/Loading";
import FeaturedProductCard from "@/components/ui/home/FeaturedProductCard";
import { productService } from "@/services/product-service";
import { RootState } from "@/stores/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

export const ProductContent = () => {
    const { slug } = useParams();
    const stateFilter = useSelector((state: RootState) => state.filter);

    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    const queryKey = slug
        ? ['get/all/category/product', slug, stateFilter]
        : ['get/all/products', 'all', stateFilter];

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam = 1 }) => {
            const pr = { minPrice: stateFilter.min, maxPrice: stateFilter.max };
            if (slug) {
                if (!slug) return Promise.resolve({ data: [], pagination: { currentPage: 1, totalPages: 1 } });
                return productService.getProductsForCategoryAndSubcategories({ slug, pr, page: pageParam });
            } else {
                return productService.getAllProducts(pageParam, pr);
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: true,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.log("Fetching next page...");
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <LoadingOrError isLoading={true} />;
    if (isError) return <LoadingOrError error={(error as Error).message} />;

    const allProducts = data?.pages.flatMap(page => page.data) ?? [];

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ">
                {allProducts.length > 0 ? (
                    allProducts.map((prod) => (
                        <FeaturedProductCard key={prod.id} product={prod} />
                    ))
                ) : (
                    <div>mehsul yoxdur</div>
                )}
            </div>

            <div ref={ref} className="h-10 flex justify-center items-center">
                {(hasNextPage && !isFetchingNextPage) ? <LoadingOrError isLoading={true} /> : null}
            </div>

        </>
    );
};