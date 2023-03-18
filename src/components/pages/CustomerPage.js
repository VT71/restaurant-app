import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTable } from '../../store/slices/TableSlice';
import { nanoid } from '@reduxjs/toolkit';
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
        <div>
            <h1 className='mt-4 mb-5 text-center'>Customer Page</h1>
            <div className='row'>
                <form>
                    <div className='col col-sm-6 col-md-4 m-auto text-center'>
                        <h2>Select your table number 🍽</h2>
                        <div className='mb-3'>
                            <label
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
                            />
                        </div>

                        <div className='mb-3'>
                            <label
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
                            />
                        </div>

                        <button
                            className='btn btn-primary'
                            type='submit'
                            onClick={() => {
                                dispatch(addTable(newTable));
                                console.log(
                                    ' newTable: ' + JSON.stringify(newTable)
                                );
                                routeChange(newTable.id);
                            }}
                        >
                            Submit form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerPage;
