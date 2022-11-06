import {configureStore} from "@reduxjs/toolkit"; 
import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { BasketSlice } from "../../features/basket/BasketSlice";

export const store = configureStore({
    reducer: {
        basket:BasketSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 