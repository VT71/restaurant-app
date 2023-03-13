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
        updateFood: (state, action) => {
            state.pendingOrder.food =
                state.pendingOrder.food + '\n' + action.payload + 'x1';
        },
    },
});

export const { updateFood } = customerSlice.actions;
export default customerSlice.reducer;
