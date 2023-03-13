import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pendingOrder: {
        food: 'Food 1x255\nFood 2x1',
        comment: '',
    },
};

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        addFood: (state, action) => {
            state.pendingOrder.food =
                state.pendingOrder.food + '\n' + action.payload + 'x1';
        },
        updateFood: (state, action) => {
            state.pendingOrder.food = action.payload;
        },
    },
});

export const { addFood, updateFood } = customerSlice.actions;
export default customerSlice.reducer;
