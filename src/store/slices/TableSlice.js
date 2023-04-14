import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { activeUrl } from '../../api/apiurls';

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
    pendingModification: { status: 'none', id: '', number: '' },
};

export const fetchTables = createAsyncThunk('tables/fetchTables', async () => {
    const response = await fetch(`${activeUrl}/tables`)
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
        const response = await fetch(`${activeUrl}/tables`, {
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
        console.log('tablesToDelete: ' + JSON.stringify(tablesToDelete));
        for (const table in tablesToDelete) {
            if (tablesToDelete[table] === true) {
                await fetch(`${activeUrl}/tables/${table}`, {
                    method: 'DELETE',
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        }
    }
);

export const removeAllTables = createAsyncThunk(
    'tables/removeAllTables',
    async (tables) => {
        console.log('HMM2');
        console.log('TABLES: ' + tables);
        for (const table of tables) {
            console.log('TABLE: ' + JSON.stringify(table));
            await fetch(`${activeUrl}/tables/${table['id']}`, {
                method: 'DELETE',
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }
);

export const editTable = createAsyncThunk(
    'tables/editTable',
    async (modifiedTable) => {
        const response = await fetch(
            `${activeUrl}/tables/${modifiedTable.id}`,
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

export const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        markToDelete: (state, action) => {
            state.tablesToDelete = action.payload;
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
        updatePendingModification: (state, action) => {
            state.pendingModification = action.payload;
        },
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
            })
            .addCase(removeTables.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';

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
            })
            .addCase(editTable.fulfilled, (state, action) => {
                state.apiStatus = 'succeeded';
            });
    },
});

export const {
    markToDelete,
    updatePendingReservation,
    updatePendingModification,
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
