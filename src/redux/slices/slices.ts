import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { genAndTransWords } from "../../utils/features";

const initialState: StateType = {
    loading: false,
    result: [],
    words: [],
    error: "",
};

export const fetchWords = createAsyncThunk("root/fetchWords", genAndTransWords);

const rootSlice = createSlice({
    name: "root",
    initialState: initialState,
    reducers: {
        saveResult: function (state, action: PayloadAction<string[]>) {
            console.log("Yes save result is working");
            state.loading = false;
            state.result = action.payload;
        },
        clearAll: function (state) {
            state.loading = false;
            state.result = [];
            state.words = [];
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWords.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchWords.fulfilled,
            (state, action: PayloadAction<WordType[]>) => {
                console.log("WE NEVER REACH THIS CODE");
                state.loading = false;
                state.words = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchWords.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { saveResult, clearAll } = rootSlice.actions;

export default rootSlice.reducer;
