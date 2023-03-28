import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomerTable } from '../../store/slices/CustomerSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TextField, Button } from '@mui/material';
//import Table from "../Table";

function CustomerPage() {
    const dispatch = useDispatch();
    const [newTable, setNewTable] = useState({
        name: '',
        number: '',
        status: 'Waiter Called',
        food: '',
        comment: '',
        id: nanoid(),
    });

    let navigate = useNavigate();
    const routeChange = (tableId) => {
        let path = `/tables/${tableId}/menu`;
        navigate(path);
    };

    return (
        <div className='customer-page-container'>
            <div className='row'>
                <form>
                    <div className='col col-8 col-sm-6 col-md-4 m-auto text-center'>
                        <h2>Select your Table Number</h2>
                        <div className='my-3'>
                            <TextField
                                required
                                fullWidth
                                id='outlined-basic'
                                label='Your Name'
                                variant='outlined'
                                onChange={(e) =>
                                    setNewTable({
                                        ...newTable,
                                        name: e.target.value,
                                    })
                                }
                            />
                            {/* <label
                                htmlFor='customerNameInput'
                                className='form-label float-start'
                            >
                                Your Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                aria-label='Table Number'
                                id='customerNameInput'
                                required
                                onChange={(e) =>
                                    setNewTable({
                                        ...newTable,
                                        name: e.target.value,
                                    })
                                }
                            /> */}
                        </div>

                        <div className='mb-3'>
                            <TextField
                                required
                                fullWidth
                                id='outlined-basic'
                                label='Table Number'
                                variant='outlined'
                                type='number'
                                onChange={(e) =>
                                    setNewTable({
                                        ...newTable,
                                        number: e.target.value,
                                    })
                                }
                            />
                            {/* <label
                                htmlFor='customerTableNoInput'
                                className='form-label float-start'
                            >
                                Table Number
                            </label>
                            <input
                                id='customerTableNoInput'
                                type='number'
                                className='form-control'
                                aria-label='Table Number'
                                required
                                onChange={(e) =>
                                    setNewTable({
                                        ...newTable,
                                        number: e.target.value,
                                    })
                                }
                            /> */}
                        </div>

                        {/* <button
                            className='btn btn-primary'
                            type='submit'
                            onClick={() => {
                                dispatch(addCustomerTable(newTable));
                                routeChange(newTable.id);
                            }}
                        >
                            Submit form
                        </button> */}
                        <Button variant='contained'>Contained</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerPage;
