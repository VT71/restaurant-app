import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    apiStatus: 'idle',
    error: null,
    pendingOrder: {
        food: 'Food 1x255\nFood 2x1',
        comment: '',
    },
};

export const updateCustomerTable = createAsyncThunk(
    'customer/updateCustomerTable',
    async (modifiedTable) => {
        const response = await fetch(
            `http://localhost:3333/tables/${modifiedTable.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(modifiedTable.table),
            }
        );
        return response.json();
    }
);

export const addCustomerOrder = createAsyncThunk(
    'customer/addCustomerOrder',
    async (tableId, pendingOrder) => {
        const response = await fetch(`http://localhost:3333/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                data.food = pendingOrder.food;
                data.comment = pendingOrder.comment;
                updateCustomerTable(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response.json();
    }
);

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
    extraReducers(builder) {
        builder
            .addCase(addCustomerOrder.pending, (state, action) => {
                state.apiStatus = 'loading';
            })
            .addCase(addCustomerOrder.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
            })
            .addCase(updateCustomerTable.pending, (state, action) => {
                state.apiStatus = 'loading';
            })
            .addCase(updateCustomerTable.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
            });
    },
});

export const { addFood, updateFood } = customerSlice.actions;
export default customerSlice.reducer;
