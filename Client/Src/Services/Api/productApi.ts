import { baseApi } from "./baseApi";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductResponse {
  data: Product[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ProductQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductQuery | void>({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page || 1,

          limit: params?.limit || 12,

          ...(params?.sort
            ? {
                sort: params.sort,
              }
            : {}),

          ...(params?.search
            ? {
                search: params.search,
              }
            : {}),
        },
      }),

      providesTags: ["Product"],
    }),

    getFeaturedProducts: builder.query<Product[], void>({
      query: () => "/products/featured",

      providesTags: ["Product"],
    }),

    getLatestProducts: builder.query<Product[], void>({
      query: () => "/products/latest",

      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,

      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetLatestProductsQuery,
  useGetProductByIdQuery,
} = productApi;
