"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { getProducts } from "././lib/api";
import { useDebounce } from "././/hooks/useDebounce";
import { Product } from "./types/product";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductCard from "./components/ProductCard";

const LIMIT = 12;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "price">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const debouncedSearch = useDebounce(search, 500);
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", debouncedSearch, sortBy, order],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        limit: LIMIT,
        skip: pageParam,
        search: debouncedSearch || undefined,
        sortBy,
        order,
        select: "title,price,thumbnail,description,rating,category",
      }),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const products: Product[] = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <>
      {/* Replace logo src with your image path */}
      <Header
        search={search}
        setSearch={setSearch}
        logoSrc="/logo.png"
      />

      <Toolbar
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

      <section className="max-w-6xl mx-auto px-4 pb-10 mt-6">
        {/* Error */}
        {isError && (
          <div className="error-box">
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm opacity-80">{(error as Error).message}</p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products */}
        {!isLoading && !isError && (
          <>
            {products.length === 0 ? (
              <div className="empty-box">
                <p className="font-semibold">No products found</p>
                <p className="text-sm text-slate-500">
                  Try searching with another keyword.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Infinite scroll trigger */}
            <div ref={ref} className="h-14 flex items-center justify-center mt-6">
              {isFetchingNextPage && (
                <div className="loader-pill">Loading more...</div>
              )}

              {!hasNextPage && products.length > 0 && (
                <p className="text-slate-400 text-sm">End of list..</p>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
