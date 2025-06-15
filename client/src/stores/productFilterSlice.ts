import { createSlice } from "@reduxjs/toolkit"

interface InitialValueType {
    min: string,
    max: string
}

const initialValue: InitialValueType = {
    min: '',
    max: ''
}

export const productFilterSlice = createSlice({
    name: 'filter',
    initialState: initialValue,
    reducers: {
        addFilter: (state, action) => {
            const { min, max } = action.payload;
            state.max = max;
            state.min = min
        },
        clearFilter: (state) => {
            state.min = ''
            state.max = ''
        }
    }
})

export const { addFilter, clearFilter } = productFilterSlice.actions
export default productFilterSlice.reducer