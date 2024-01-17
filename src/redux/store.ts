import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./slices/slices";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        root: rootSlice,
    },
});

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
