import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";

export const store = configureStore({
	reducer: {
		[goodsApi.reducerPath]: goodsApi.reducer,
	},
	middleware: (getDefaultMiddelware) => getDefaultMiddelware().concat(goodsApi.middleware),
});
