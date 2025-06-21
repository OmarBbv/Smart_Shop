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
                    <div className="col-span-full flex flex-col items-center justify-center p-8 text-center text-gray-500 select-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mb-4 text-gray-300 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-lg sm:text-xl font-semibold">Mehsul yoxdur</p>
                        <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-xs mx-auto">
                            Üzr istəyirik, uyğun məhsul tapılmadı. Filtirlərinizi yoxlayın və ya yenidən cəhd edin.
                        </p>
                    </div>
                )}
            </div>


            <div ref={ref} className="h-10 flex justify-center items-center">
                {(hasNextPage && !isFetchingNextPage) ? <LoadingOrError isLoading={true} /> : null}
            </div>

        </>
    );
};