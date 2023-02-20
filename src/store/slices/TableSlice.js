import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

export const initialState = {
    tables: [],
    tablesToDelete: {},
    apiStatus: 'idle',
    error: null,
    pendingReservation: {
        number: 0,
        status: 'Reserved',
        food: '',
        comment: '',
    },
};

export const fetchTables = createAsyncThunk('tables/fetchTables', async () => {
    const response = await fetch('http://localhost:3333/tables')
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err.message);
        });
    return response;
});

export const addTable = createAsyncThunk(
    'tables/addTable',
    async (newTable) => {
        const response = await fetch('http://localhost:3333/tables', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newTable),
        });
        return response.json();
    }
);

export const removeTables = createAsyncThunk(
    'tables/removeTables',
    async (tablesToDelete) => {
        console.log('HMM');
        //let idsString = '';
        // await tablesToDelete.map(
        //     (table) => (idsString = idsString + table.id + '&')
        // );
        //idsString = idsString.slice(1);
        //idsString = idsString.substring(0, idsString.length - 1);

        console.log('tablesToDelete: ' + JSON.stringify(tablesToDelete));
        //console.log('idsString: ' + idsString);
        for (const table in tablesToDelete) {
            if (tablesToDelete[table] === true) {
                await fetch(`http://localhost:3333/tables/${table}`, {
                    method: 'DELETE',
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        }
        //console.log('idsString: ' + idsString);
        //return response;
    }
);

export const removeAllTables = createAsyncThunk(
    'tables/removeAllTables',
    async (tables) => {
        console.log('HMM2');
        console.log('TABLES: ' + tables);
        for (const table of tables) {
            console.log('TABLE: ' + JSON.stringify(table));
            await fetch(`http://localhost:3333/tables/${table['id']}`, {
                method: 'DELETE',
            }).catch((err) => {
                console.log(err.message);
            });
        }
        //let idsString = '';
        // await tablesToDelete.map(
        //     (table) => (idsString = idsString + table.id + '&')
        // );
        //idsString = idsString.slice(1);
        //idsString = idsString.substring(0, idsString.length - 1);

        //console.log('tablesToDelete: ' + tablesToDelete);
        //console.log('idsString: ' + idsString);
        // for (let i = 0; i < tablesToDelete.length; i++) {
        //     await fetch(
        //         `http://localhost:3333/tables/${tablesToDelete[i].id}`,
        //         {
        //             method: 'DELETE',
        //         }
        //     ).catch((err) => {
        //         console.log(err.message);
        //     });
        // }
        //console.log('idsString: ' + idsString);
        //return response;
    }
);

export const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        markToDelete: (state, action) => {
            state.tablesToDelete = action.payload;
            //     const markedToDelete = state.tablesToDelete.find(
            //         (table) => table.id === action.payload
            //     );
            //     if (markedToDelete === undefined) {
            //         const table = state.tables.find(
            //             (table) => table.id === action.payload
            //         );
            //         const tableIndex = state.tables.indexOf(table);
            //         const tableDeleteInfo = { id: table.id, index: tableIndex };
            //         state.tablesToDelete.push(tableDeleteInfo);
            //     } else {
            //         const index = state.tablesToDelete.indexOf(markedToDelete);
            //         state.tablesToDelete.splice(index, 1);
            //     }
            //     console.log(JSON.stringify(state.tablesToDelete));
        },
        updatePendingReservation: (state, action) => {
            console.log('New food: ' + action.payload.data);
            if (action.payload.dataType == 'complete') {
                state.pendingReservation = action.payload.data;
            } else {
                state.pendingReservation[action.payload.dataType] =
                    action.payload.data;
                console.log(
                    'NEw Pending Reservation: ' +
                        JSON.stringify(state.pendingReservation)
                );
            }
        },
        // addTable: {
        //     reducer(state, action) {
        //         state.tables.push(action.payload);
        //     },
        //     prepare(table) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 number: table.number,
        //                 status: table.status,
        //                 food: table.food,
        //                 comment: table.comment,
        //             },
        //         };
        //     },
        // },
        // updateGlobalState: (state, action) => {
        //     let apiKeys = Object.keys(action.payload);
        //     let storeKeys = Object.keys(state);
        //     for (let i = 0; i < apiKeys.length; i++) {
        //         state[apiKeys[i]] = action.payload[apiKeys[i]];
        //     }
        //     for (let i = 0; i < storeKeys.length; i++) {
        //         if (!Object.hasOwn(action.payload, storeKeys[i])) {
        //             delete state[storeKeys[i]];
        //         }
        //     }
        // },
        // addTableNumber: (state, action) => {
        //     state[action.payload] = {};
        // },
        // addTableStatus: (state, action) => {
        //     state[action.payload.number].status = action.payload.status;
        // },
        // addBreakfast: (state, action) => {
        //     if (state[action.payload.number].food === undefined) {
        //         state[action.payload.number].food = action.payload.food;
        //     } else {
        //         state[action.payload.number].food =
        //             state[action.payload.number].food +
        //             '\n' +
        //             action.payload.food;
        //     }
        // },
        // addSalad: (state, action) => {
        //     if (state[action.payload.number].food === undefined) {
        //         state[action.payload.number].food = action.payload.food;
        //     } else {
        //         state[action.payload.number].food =
        //             state[action.payload.number].food +
        //             '\n' +
        //             action.payload.food;
        //     }
        // },
        // addPork: (state, action) => {
        //     if (state[action.payload.number].food === undefined) {
        //         state[action.payload.number].food = action.payload.food;
        //     } else {
        //         state[action.payload.number].food =
        //             state[action.payload.number].food +
        //             '\n' +
        //             action.payload.food;
        //     }
        // },
        // addFish: (state, action) => {
        //     if (state[action.payload.number].food === undefined) {
        //         state[action.payload.number].food = action.payload.food;
        //     } else {
        //         state[action.payload.number].food =
        //             state[action.payload.number].food +
        //             '\n' +
        //             action.payload.food;
        //     }
        // },
        // addDessert: (state, action) => {
        //     if (state[action.payload.number].food === undefined) {
        //         state[action.payload.number].food = action.payload.food;
        //     } else {
        //         state[action.payload.number].food =
        //             state[action.payload.number].food +
        //             '\n' +
        //             action.payload.food;
        //     }
        // },
        // addComment: (state, action) => {
        //     if (state[action.payload.number].comments === undefined) {
        //         state[action.payload.number].comments = action.payload.comment;
        //     } else {
        //         state[action.payload.number].comments =
        //             state[action.payload.number].comments +
        //             '\n' +
        //             action.payload.comment;
        //     }
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTables.pending, (state, action) => {
                state.apiStatus = 'loading';
            })
            .addCase(fetchTables.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
                state.tables = action.payload;
            })
            .addCase(fetchTables.rejected, (state, action) => {
                state.apiStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTable.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
                console.log('Add Table Succeeded');
                console.log(
                    'Add Table Payload: ' + JSON.stringify(action.payload)
                );
                state.tables.push(action.payload);
                state.pendingReservation = {
                    number: 0,
                    status: 'Reserved',
                    food: '',
                    comment: '',
                };
            })
            .addCase(removeTables.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
                // for (let i = 0; i < state.tablesToDelete.length; i++) {
                //     state.tables.splice(state.tablesToDelete[i].index, 1);
                // }

                console.log(' we re here');
                for (const property in state.tablesToDelete) {
                    console.log(' Property: ' + property);
                    if (state.tablesToDelete[property] === true) {
                        console.log('Inside If');
                        const table = state.tables.find(
                            (table) => table.id == property
                        );
                        console.log('Table to delete: ' + table);
                        state.tables.splice(state.tables.indexOf(table), 1);
                    }
                }
                state.tablesToDelete = {};
            })
            .addCase(removeAllTables.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
                state.tables = [];
            });
    },
});

export const {
    markToDelete,
    updatePendingReservation,
    updateGlobalState,
    addTableNumber,
    addTableStatus,
    addBreakfast,
    addSalad,
    addFish,
    addPork,
    addDessert,
    addComment,
} = tableSlice.actions;
export default tableSlice.reducer;
