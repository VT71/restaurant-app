import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch } from 'react-redux';
import {
    fetchTables,
    markToDelete,
    removeTables,
    removeAllTables,
    updatePendingReservation,
    updatePendingModification,
} from '../store/slices/TableSlice';
import { nanoid } from '@reduxjs/toolkit';

function Table({ props }) {
    const [tableToEdit, setTableToEdit] = useState({});

    const dispatch = useDispatch();
    const apiStatus = useSelector((state) => state.tables.apiStatus);
    const tables = useSelector((state) => state.tables.tables);

    useEffect(() => {
        if (apiStatus === 'idle') {
            dispatch(fetchTables());
        }
    }, [apiStatus, dispatch]);

    return (
        <div className='container-md' data-testid='table-container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card mb-5'>
                        <div className='card-body'>
                            <fieldset>
                                <table
                                    className='table table-hover'
                                    data-testid='table'
                                >
                                    <thead className='table-dark'>
                                        <tr>
                                            <th className='text-center'></th>
                                            <th className='text-center'>
                                                Table #
                                            </th>
                                            <th
                                                className={
                                                    props.forWaiter
                                                        ? 'text-center'
                                                        : 'text-center hidden-element'
                                                }
                                            >
                                                Customer Name
                                            </th>
                                            <th className='text-center'>
                                                Status
                                            </th>
                                            <th className='text-center'>
                                                Ordered
                                            </th>
                                            <th className='text-center'>
                                                Comments
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tables.map((table) => {
                                            return (
                                                <tr key={nanoid()}>
                                                    <td>
                                                        <input
                                                            className={
                                                                props.forWaiter
                                                                    ? ''
                                                                    : 'hidden-element'
                                                            }
                                                            type='radio'
                                                            id={
                                                                'radioInput-' +
                                                                table.id
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    Object.keys(
                                                                        tableToEdit
                                                                    )[0] ==
                                                                    table.id
                                                                ) {
                                                                    const key =
                                                                        Object.keys(
                                                                            tableToEdit
                                                                        )[0];
                                                                    setTableToEdit(
                                                                        {
                                                                            key: false,
                                                                        }
                                                                    );
                                                                    setTableToEdit(
                                                                        {}
                                                                    );
                                                                    dispatch(
                                                                        updatePendingReservation(
                                                                            {
                                                                                dataType:
                                                                                    'complete',
                                                                                data: {
                                                                                    number: 0,
                                                                                    status: 'Reserved',
                                                                                    food: '',
                                                                                    comment:
                                                                                        '',
                                                                                },
                                                                            }
                                                                        )
                                                                    );
                                                                    dispatch(
                                                                        updatePendingModification(
                                                                            {
                                                                                status: 'none',
                                                                                id: '',
                                                                                number: '',
                                                                            }
                                                                        )
                                                                    );
                                                                    document.getElementById(
                                                                        'tableno-input'
                                                                    ).readOnly = false;
                                                                    document.getElementById(
                                                                        'tableno-input'
                                                                    ).value =
                                                                        '';
                                                                }
                                                            }}
                                                            onChange={() => {
                                                                if (
                                                                    Object.keys(
                                                                        tableToEdit
                                                                    )[0] !=
                                                                    table.id
                                                                ) {
                                                                    const key =
                                                                        Object.keys(
                                                                            tableToEdit
                                                                        )[0];
                                                                    setTableToEdit(
                                                                        {
                                                                            key: false,
                                                                        }
                                                                    );
                                                                    setTableToEdit(
                                                                        {
                                                                            [table.id]: true,
                                                                        }
                                                                    );
                                                                    dispatch(
                                                                        updatePendingReservation(
                                                                            {
                                                                                dataType:
                                                                                    'complete',
                                                                                data: table,
                                                                            }
                                                                        )
                                                                    );
                                                                    dispatch(
                                                                        updatePendingModification(
                                                                            {
                                                                                status: 'in-progress',
                                                                                id: table.id,
                                                                                number: table.number,
                                                                            }
                                                                        )
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            'tableno-input'
                                                                        )
                                                                        .setAttribute(
                                                                            'readonly',
                                                                            'true'
                                                                        );
                                                                }
                                                            }}
                                                            checked={
                                                                tableToEdit[
                                                                    table.id
                                                                ]
                                                            }
                                                        />
                                                    </td>
                                                    <td className='text-center'>
                                                        <label
                                                            htmlFor={
                                                                'radioInput-' +
                                                                table.id
                                                            }
                                                        >
                                                            {table.number}
                                                        </label>
                                                    </td>
                                                    <td
                                                        className={
                                                            props.forWaiter
                                                                ? 'text-center'
                                                                : 'text-center hidden-element'
                                                        }
                                                    >
                                                        {table.name}
                                                    </td>
                                                    <td className='text-center'>
                                                        {table.status}
                                                    </td>
                                                    <td className='newline text-center'>
                                                        {table.food}
                                                    </td>
                                                    <td className='text-center'>
                                                        {table.comment}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

            <div className={props.forWaiter ? 'row' : 'row hidden-element'}>
                <div className='col-12 d-flex justify-content-between px-5'>
                    <button
                        disabled={!Object.keys(tableToEdit).length > 0}
                        type='button'
                        className='btn btn-primary'
                        data-testid='delete-btn'
                        onClick={() => {
                            dispatch(markToDelete(tableToEdit));
                            dispatch(removeTables(tableToEdit));
                            setTableToEdit({});
                        }}
                    >
                        Delete
                    </button>
                    <button
                        type='button'
                        className={
                            Object.keys(tableToEdit).length == 1
                                ? 'btn btn-warning'
                                : 'btn btn-warning hidden-element'
                        }
                        onClick={() => {
                            const key = Object.keys(tableToEdit)[0];
                            setTableToEdit({
                                key: false,
                            });
                            setTableToEdit({});
                            dispatch(
                                updatePendingReservation({
                                    dataType: 'complete',
                                    data: {
                                        number: 0,
                                        status: 'Reserved',
                                        food: '',
                                        comment: '',
                                    },
                                })
                            );
                            dispatch(
                                updatePendingModification({
                                    status: 'none',
                                    id: '',
                                    number: '',
                                })
                            );
                            document.getElementById(
                                'tableno-input'
                            ).readOnly = false;
                            document.getElementById('tableno-input').value = '';
                        }}
                    >
                        Cancel Modification
                    </button>
                    <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModal'
                        data-testid='delete-all-btn'
                    >
                        Delete All
                    </button>

                    {/* MODAL */}
                    <div
                        className='modal fade'
                        id='exampleModal'
                        tabIndex='-1'
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                    >
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5
                                        className='modal-title'
                                        id='exampleModalLabel'
                                    >
                                        Are you sure you want to delete all?
                                    </h5>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        data-bs-dismiss='modal'
                                        aria-label='Close'
                                    ></button>
                                </div>
                                <div className='modal-footer'>
                                    <button
                                        type='button'
                                        className='btn btn-secondary'
                                        data-bs-dismiss='modal'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            dispatch(removeAllTables(tables));
                                        }}
                                        className='btn btn-danger'
                                        data-bs-dismiss='modal'
                                    >
                                        DELETE ALL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
