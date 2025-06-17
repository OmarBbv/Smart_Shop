import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialValueType {
    min: string;
    max: string;
    condition?: string[];
    delivery?: string;
}

const initialValue: InitialValueType = {
    min: '',
    max: '',
    condition: [],
    delivery: ''
}

export const productFilterSlice = createSlice({
    name: 'filter',
    initialState: initialValue,
    reducers: {
        addFilter: (state, action: PayloadAction<InitialValueType>) => {
            const { min, max, condition, delivery } = action.payload;
            state.min = min;
            state.max = max;
            state.condition = condition;
            state.delivery = delivery;
        },
        clearFilter: (state) => {
            state.min = '';
            state.max = '';
            state.condition = [];
            state.delivery = '';
        }
    }
});

export const { addFilter, clearFilter } = productFilterSlice.actions;
export default productFilterSlice.reducer;
