import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
	reducerPath: "goodsApi",
	tagTypes: "Products",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
	endpoints: (build) => ({
		getGoods: build.query({
			query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
			providesTags: (result, error, arg) =>
				result ? [...result.map(({ id }) => ({ type: "Products", id })), "Products"] : ["Products"],
		}),
		addProduct: build.mutation({
			query: (body) => ({
				url: "goods",
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: "Products" }],
		}),
		deleteProduct: build.mutation({
			query: (id) => ({
				url: `goods/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Products" }],
		}),
	}),
});
export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi;
