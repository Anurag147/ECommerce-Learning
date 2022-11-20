import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";

interface AccountState {
    user: User | null;
}

const initialState: AccountState  = {
    user: null
}

export const signInUser = createAsyncThunk<User,FieldValues>(
    'account/signInUser',
    async(data,thunkApi) => {
        try{
                const user = await agent.Account.login(data);
                localStorage.setItem('user',JSON.stringify(user));
                return user;
        }
        catch(e){
            return thunkApi.rejectWithValue({error:e});
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/signInUser',
    async(_,thunkApi) => {
        try{
                const user = await agent.Account.currentUser();
                localStorage.setItem('user',JSON.stringify(user));
                return user;
        }
        catch(e){
            return thunkApi.rejectWithValue({error:e});
        }
    }
);

export const accountSlice = createSlice({
    name:'Account',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
            state.user=action.payload;
        });
    }
})