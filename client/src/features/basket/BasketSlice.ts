import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/Basket";

interface BasketState {
    basket : Basket | null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status:'idle'  
} 

export const getBasketAsync = createAsyncThunk<Basket,void>(
    'basket/getBasketAsync',
    async() => {
        try{
                return await agent.Basket.get();
        }
        catch(e){
            console.log(e);
        }
    }
);

export const addBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity:number}>(
    'basket/addBasketItemAsync',
    async({productId,quantity},thunkApi) => {
        try{
                return await agent.Basket.addItem(productId,quantity);
        }
        catch(e){
            return thunkApi.rejectWithValue({error:e});
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void,{productId:number,quantity:number}>(
    'basket/removeBasketItemAsync',
    async({productId,quantity},thunkApi) => {
        try{
                return await agent.Basket.removeItem(productId,quantity);
        }
        catch(e){
            return thunkApi.rejectWithValue({error:e});
        }
    }
);

export const BasketSlice = createSlice({
    name:'basket',
    initialState,
    reducers:{
        setBasket: (state,action) => {
            state.basket=action.payload
        },
        removeItem: (state,action) => {
            const {productId, quantity} = action.payload;
            const itemIndex= state.basket?.items.findIndex(i=>i.productId===productId);
            if(itemIndex===-1||itemIndex===undefined)return;
            state.basket!.items[itemIndex].quantity-=quantity;
            if(state.basket!.items[itemIndex].quantity===0){
                state.basket!.items.splice(itemIndex,1);
                }
            } 
    },
    extraReducers: (builder) => {
        builder.addCase(getBasketAsync.pending,(state,action)=>{
            state.status='pendingGet';
        });
        builder.addCase(getBasketAsync.fulfilled,(state,action)=>{
            state.status='GotBasket';
            state.basket=action.payload;
        });
        builder.addCase(getBasketAsync.rejected,(state,action)=>{
            state.status='RejectedBasket';
        });
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            state.status='pendingAddItem';
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state,action)=>{
            state.status='GotBasketItem';
            state.basket=action.payload;
        });
        builder.addCase(addBasketItemAsync.rejected,(state,action)=>{
            state.status='RejectedAddBasketItem';
        });
        builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
            state.status='pendingRemoveItem';
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
            state.status='pendingRemoveItem';
            const {productId, quantity} = action.meta.arg;
            const itemIndex= state.basket?.items.findIndex(i=>i.productId===productId);
            if(itemIndex===-1||itemIndex===undefined)return;
            state.basket!.items[itemIndex].quantity-=quantity;
            if(state.basket!.items[itemIndex].quantity===0)
                state.basket!.items.splice(itemIndex,1);

        });
        builder.addCase(removeBasketItemAsync.rejected,(state,action)=>{
            state.status='RejectedRemoveBasketItem';
        });
    }, 
}); 

export const {setBasket,removeItem} = BasketSlice.actions;