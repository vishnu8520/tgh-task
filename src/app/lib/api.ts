import { ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(params: {
  limit: number;
  skip: number;
  search?: string;
  sortBy?: "title" | "price";
  order?: "asc" | "desc";
  select?: string;
}): Promise<ProductsResponse> {
  const { limit, skip, search, sortBy, order, select } = params;

  const url = new URL(search ? `${BASE_URL}/search` : BASE_URL);

  if (search) url.searchParams.set("q", search);

  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  // selection (optional)
  if (select) url.searchParams.set("select", select);

  // sorting (optional)
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (order) url.searchParams.set("order", order);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
