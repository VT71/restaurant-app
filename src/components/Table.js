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
} from '../store/slices/TableSlice';
import store from '../store/store';
import { nanoid } from '@reduxjs/toolkit';

function Table({ props }) {
    const [tableToEdit, setTableToEdit] = useState({});

    // When Using Checkboxes
    const [tablesToDelete, setTablesToDelete] = useState({});
    const [anyTablesToDelete, setNoTablesToDelete] = useState(0);

    const dispatch = useDispatch();
    const apiStatus = useSelector((state) => state.tables.apiStatus);
    const tables = useSelector((state) => state.tables.tables);
    //const tablesToDelete = useSelector((state) => state.tables.tablesToDelete);

    // When using checkboxes
    const addTableToDelete = (e, newId) => {
        if (e.target.checked === true) {
            setNoTablesToDelete(anyTablesToDelete + 1);
        } else {
            setNoTablesToDelete(anyTablesToDelete - 1);
        }
        setTablesToDelete({ ...tablesToDelete, [newId]: e.target.checked });
        // if (tablesToDelete.includes(newId)) {
        //     console.log('ALREADY INCLUDES');
        //     setTablesToDelete([tablesToDelete.filter((id) => id !== newId)]);
        // } else {
        //     console.log('NOT INCLUDES');
        //     setTablesToDelete([...tablesToDelete, newId]);
        // }
    };

    // const getTables = async () => {
    //     await fetch('http://localhost:3333/tables')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setTables(data);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // };

    useEffect(() => {
        if (apiStatus === 'idle') {
            console.log('preparing to dispatch fetch tables');
            dispatch(fetchTables());
        }
    }, [apiStatus, dispatch]);

    //console.log(anyTablesToDelete);

    // let temp;
    // tables.map((table) => {
    //     try {
    //         temp = table.number;
    //     } catch (err) {
    //         console.log(
    //             JSON.stringify('!!!TABLE!!!: ' + JSON.stringify(table))
    //         );
    //         console.log(
    //             '!!!!!!!!!!!!!!!!!!!!!!!!' +
    //                 err.message +
    //                 '!!!!!!!!!!!!!!!!!!!!!!!!'
    //         );
    //     }
    // });
    //console.log('Preparing to dispatch tables: ' + { tables });
    //dispatch(updateGlobalState(tables));
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
                                            <th className='text-center'>
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
                                                            type='radio'
                                                            id={
                                                                'radioInput-' +
                                                                table.id
                                                            }
                                                            onClick={() => {
                                                                console.log(
                                                                    'onClick Triggered'
                                                                );
                                                                if (
                                                                    Object.keys(
                                                                        tableToEdit
                                                                    )[0] ==
                                                                    table.id
                                                                ) {
                                                                    console.log(
                                                                        'IF 1'
                                                                    );
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
                                                                }
                                                            }}
                                                            onChange={() => {
                                                                console.log(
                                                                    'onChange Triggered'
                                                                );
                                                                if (
                                                                    Object.keys(
                                                                        tableToEdit
                                                                    )[0] !=
                                                                    table.id
                                                                ) {
                                                                    console.log(
                                                                        'IF 2'
                                                                    );
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
                                                                }
                                                                console.log(
                                                                    'tableToEdit After: ' +
                                                                        JSON.stringify(
                                                                            tableToEdit
                                                                        )
                                                                );
                                                            }}
                                                            checked={
                                                                tableToEdit[
                                                                    table.id
                                                                ]
                                                            }
                                                        />

                                                        {/* FOR DELETING MULTIPLE TABLES USING CHECKBOXES */}
                                                        {/* <input
                                                        type="checkbox"
                                                        className={
                                                            props.forWaiter
                                                                ? ""
                                                                : "row hidden-element"
                                                        }
                                                        onChange={
                                                            (e) => {
                                                                addTableToDelete(
                                                                    e,
                                                                    table.id
                                                                );
                                                            }

                                                            // console.log(
                                                            //     'clicked'
                                                            // );
                                                            // dispatch(
                                                            //     markToDelete(
                                                            //         table.id
                                                            //     )
                                                            // );
                                                        }
                                                        checked={
                                                            tablesToDelete[
                                                                table.id
                                                            ]
                                                        }
                                                    ></input> */}
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
                                                    <td className='text-center'>
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
                        // disabled={!anyTablesToDelete}
                        type='button'
                        className='btn btn-primary'
                        data-testid='delete-btn'
                        onClick={() => {
                            dispatch(markToDelete(tableToEdit));
                            dispatch(removeTables(tableToEdit));
                            setTableToEdit({});

                            //WHEN USING CHECKBOXES
                            // if (anyTablesToDelete) {
                            //     dispatch(markToDelete(tablesToDelete));
                            //     dispatch(removeTables(tablesToDelete));
                            //     setTablesToDelete({});
                            //     setNoTablesToDelete(0);
                            // }
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
                                            console.log(
                                                'TABLES TO DELETE ALL: ' +
                                                    tables
                                            );
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
            {/* <button
                onClick={() =>
                    console.log(
                        'Local State: ' + JSON.stringify(tablesToDelete)
                    )
                }
            >
                Check Local State
            </button> */}
        </div>
    );
}

export default Table;
