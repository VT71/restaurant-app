import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
//import { useDispatch } from 'react-redux';
//import { addCustomerTable } from '../../store/slices/CustomerSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TextField, Button } from '@mui/material';
// import { Button } from '@mui/material-next';
//import Table from "../Table";
import { Card } from '@mui/material';
import { activeUrl } from '../../api/apiurls';

function CustomerPage() {
    const addCustomerTable = async (newTable) => {
        const response = await fetch(`${activeUrl}/tables`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newTable),
        });
        return response.json();
    };

    //const dispatch = useDispatch();
    const [newTable, setNewTable] = useState({
        name: 'Not Entered',
        number: '0',
        status: 'Waiter Called',
        food: '',
        comment: '',
        pendingOrder: {
            food: '',
            comment: '',
        },
        id: nanoid(),
    });

    let navigate = useNavigate();
    const routeChange = (tableId) => {
        let path = `/tables/${tableId}/menu`;
        navigate(path);
    };

    return (
        <div className='customer-page-container pt-5'>
            <div className='row'>
                <form
                    onSubmit={() => {
                        addCustomerTable(newTable);
                        routeChange(newTable.id);
                    }}
                >
                    <div className='col col-8 col-sm-6 col-md-4 m-auto text-center'>
                        <Card
                            variant='filled'
                            elevation={0}
                            sx={{
                                borderRadius: '12px',
                                padding: '30px',
                                paddingTop: '50px',
                                paddingBottom: '35px',
                            }}
                        >
                            <h1 className='display-small'>
                                Select your Table Number
                            </h1>
                            <div className='my-3'>
                                <TextField
                                    required
                                    fullWidth
                                    id='outlined-basic'
                                    label='Your Name'
                                    variant='outlined'
                                    error={newTable.name === ''}
                                    // onKeyDown={(e) => handleKey(e)}
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
                                    error={newTable.number === ''}
                                    // onKeyDown={(e) => handleKey(e)}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            setNewTable({
                                                ...newTable,
                                                number: e.target.value,
                                            });
                                        }
                                    }}
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
                            <Button
                                id='customerTableSubmissionButton'
                                disableElevation
                                variant='filled'
                                color='primary'
                                type='submit'
                                className='mt-3'
                            >
                                <p className='label-large m-0'>Go To Menu</p>
                            </Button>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerPage;
