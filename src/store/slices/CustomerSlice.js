import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    apiStatus: 'idle',
    error: null,
    customerTable: {
        name: '',
        number: '',
        status: '',
        food: '',
        comment: '',
        id: '',
    },
    pendingOrder: { food: '', comment: '' },
};

export const updateCustomerTable = createAsyncThunk(
    'customer/updateCustomerTable',
    async (modifiedTable) => {
        console.log('updateCustomerTable');
        // TO BE REPLACED WITH http://localhost:3333 WHEN RUNNING LOCALLY
        const response = await fetch(
            `https://my-json-server.typicode.com/vt71/restaurant-app/tables/${modifiedTable.id}`,
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

export const addCustomerTable = createAsyncThunk(
    'customer/addCustomerTable',
    async (newTable) => {
        // TO BE REPLACED WITH http://localhost:3333 WHEN RUNNING LOCALLY
        const response = await fetch(
            'https://my-json-server.typicode.com/vt71/restaurant-app/tables',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newTable),
            }
        );
        return response.json();
    }
);

export const fetchCustomerTable = createAsyncThunk(
    'customer/fetchCustomerTable',
    async (tableId) => {
        // TO BE REPLACED WITH http://localhost:3333 WHEN RUNNING LOCALLY
        const response = await fetch(
            `https://my-json-server.typicode.com/vt71/restaurant-app/tables/${tableId}`
        )
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    }
);

// export const addCustomerOrder = createAsyncThunk(
//     'customer/addCustomerOrder',
//     async ({ tableId, pendingOrder }) => {
//         console.log('LOG1');
//         console.log('ID: ' + tableId);
//         const response = await fetch(`http://localhost:3333/tables/${tableId}`)
//             .then((response) => {
//                 console.log('HERE1');
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('HERE2');
//                 data.food = pendingOrder.food;
//                 data.comment = pendingOrder.comment;
//                 console.log('PREPARING TO CALL updateCutomerTable');
//                 updateCustomerTable(data);
//                 return data;
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             });
//         console.log('HERE3');
//         return response;
//     }
// );

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        addCustomerOrder: (state, action) => {
            if (state.pendingOrder.food != '') {
                state.pendingOrder.food =
                    state.pendingOrder.food + action.payload + 'x1' + '\n';
            } else {
                state.pendingOrder.food = action.payload + 'x1' + '\n';
            }
        },
        updateFood: (state, action) => {
            state.customerTable.food = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            // .addCase(addCustomerOrder.pending, (state, action) => {
            //     state.apiStatus = 'loading';
            // })
            // .addCase(addCustomerOrder.fulfilled, (state, action) => {
            //     //console.log('ACTION: ' + JSON.stringify(action));
            //     state.apiStatus = 'succeeded';
            //     // console.log('PREPARING TO CALL updateCutomerTable');
            //     // updateCustomerTable(action.payload);
            //     //console.log('CALLED customerTable');
            // })
            // .addCase(addCustomerOrder.rejected, (state, action) => {
            //     state.apiStatus = 'rejected';
            // })
            .addCase(addCustomerTable.pending, (state, action) => {
                state.apiStatus = 'loading';
            })
            .addCase(addCustomerTable.fulfilled, (state, action) => {
                console.log(
                    'addCustomerTable fulfilled: ' + JSON.stringify(action)
                );
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

export const { addCustomerOrder, updateFood } = customerSlice.actions;
export default customerSlice.reducer;
