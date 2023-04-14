import React from 'react';
import FoodSelection from './FoodSelection';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    updateGlobalState,
    addTableNumber,
    addTableStatus,
    addBreakfast,
    addSalad,
    addComment,
    addTable,
    updatePendingReservation,
    editTable,
} from '../store/slices/TableSlice';
import FormSelectionPreview from './FormSelectionPreview';

function Form() {
    // const [pendingReservation, setReservation] = useState({
    //     number: 0,
    //     status: 'Reserved',
    //     food: '',
    //     comment: '',
    // });
    const dispatch = useDispatch();
    // const tableNumber = useSelector(
    //     (state) => state.tables.pendingReservation.number
    // );
    // const tableStatus = useSelector(
    //     (state) => state.tables.pendingReservation.status
    // );
    const pendingReservation = useSelector(
        (state) => state.tables.pendingReservation
    );

    const pendingModification = useSelector(
        (state) => state.tables.pendingModification
    );
    // const getTables = async (
    //     tableNumber,
    //     tableStatus,
    //     breakfast,
    //     salads,
    //     fish,
    //     pork,
    //     dessert,
    //     comment
    // ) => {
    //     await fetch('http://localhost:3333/tables', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             number: tableNumber,
    //             status: tableStatus,
    //             food:
    //                 breakfast +
    //                 '\n' +
    //                 salads +
    //                 '\n' +
    //                 fish +
    //                 '\n' +
    //                 pork +
    //                 '\n' +
    //                 dessert,
    //             comment: comment,
    //         }),
    //     });
    // };

    const submitOrder = (e) => {
        // const tableNumber = document.getElementById('tableno-input').value;
        // dispatch(addTableNumber(tableNumber));
        // const tableStatus = document.getElementById('status-input').value;
        // dispatch(
        //     addTableStatus({
        //         number: tableNumber,
        //         status: document.getElementById('status-input').value,
        //     })
        // );
        let breakfast = '';
        let salads = '';
        let fish = '';
        let pork = '';
        let dessert = '';
        let comment = '';
        if (
            !(
                document.getElementById('breakfast-selection').value ===
                'unselected'
            )
        ) {
            breakfast = document.getElementById('breakfast-selection').value;
            // dispatch(
            //     addBreakfast({
            //         number: tableNumber,
            //         food: [
            //             document.getElementById('breakfast-selection').value,
            //         ],
            //     })
            // );
        }
        if (
            !(
                document.getElementById('salads-selection').value ===
                'unselected'
            )
        ) {
            salads = document.getElementById('salads-selection').value;
            // dispatch(
            //     addSalad({
            //         number: tableNumber,
            //         food: [document.getElementById('salads-selection').value],
            //     })
            // );
        }
        if (
            !(document.getElementById('fish-selection').value === 'unselected')
        ) {
            fish = document.getElementById('fish-selection').value;
            // dispatch(
            //     addSalad({
            //         number: tableNumber,
            //         food: [document.getElementById('fish-selection').value],
            //     })
            // );
        }
        if (
            !(document.getElementById('pork-selection').value === 'unselected')
        ) {
            pork = document.getElementById('pork-selection').value;
            // dispatch(
            //     addSalad({
            //         number: tableNumber,
            //         food: [document.getElementById('pork-selection').value],
            //     })
            // );
        }
        if (
            !(
                document.getElementById('dessert-selection').value ===
                'unselected'
            )
        ) {
            dessert = document.getElementById('dessert-selection').value;
            // dispatch(
            //     addSalad({
            //         number: tableNumber,
            //         food: [document.getElementById('dessert-selection').value],
            //     })
            // );
        }
        if (!(document.getElementById('comments-input').value === '')) {
            comment = document.getElementById('comments-input').value;
            // dispatch(
            //     addComment({
            //         number: tableNumber,
            //         comment: document.getElementById('comments-input').value,
            //     })
            // );
        }
        console.log(
            'Pending Reservation to be dispatched: ' +
                JSON.stringify(pendingReservation)
        );

        if (pendingModification.status == 'in-progress') {
            dispatch(
                editTable({
                    id: pendingModification.id,
                    table: pendingReservation,
                })
            );
        } else {
            dispatch(addTable(pendingReservation));
        }

        e.target.reset();
    };
    return (
        <div className='container-md mt-5' data-testid='form-container'>
            <div className='container'>
                <div className='row m-auto'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-body'>
                                <h2>Add Entry</h2>
                                <form
                                    data-testid='form'
                                    onSubmit={(e) => {
                                        submitOrder(e);
                                    }}
                                >
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='tableno-input'
                                            className='float-start form-label'
                                        >
                                            Table #
                                        </label>
                                        <input
                                            type='number'
                                            min='1'
                                            max='10'
                                            className='form-control'
                                            id='tableno-input'
                                            data-testid='tableno-input'
                                            required
                                            value={
                                                pendingModification.status !=
                                                'none'
                                                    ? pendingModification.number
                                                    : undefined
                                            }
                                            onChange={(e) => {
                                                dispatch(
                                                    updatePendingReservation({
                                                        dataType: 'number',
                                                        data: e.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='customer-name-input'
                                            className='float-start form-label'
                                        >
                                            Customer Name
                                        </label>
                                        <input
                                            className='form-control'
                                            id='customer-name-input'
                                            data-testid='tableno-input'
                                            required
                                            onChange={(e) => {
                                                dispatch(
                                                    updatePendingReservation({
                                                        dataType: 'name',
                                                        data: e.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='status-input'
                                            className='float-start form-label'
                                        >
                                            Status
                                        </label>
                                        <select
                                            className='form-select'
                                            id='status-input'
                                            data-testid='status-input'
                                            placeholder='unselected'
                                            onChange={(e) =>
                                                dispatch(
                                                    updatePendingReservation({
                                                        dataType: 'status',
                                                        data: e.target.value,
                                                    })
                                                )
                                            }
                                        >
                                            <option>Reserved</option>
                                            <option>Waiter Called</option>
                                            <option>Awaiting Order</option>
                                        </select>
                                    </div>
                                    <FoodSelection foodType='starters' />
                                    <FoodSelection foodType='soups' />
                                    <FoodSelection foodType='salads' />
                                    <FoodSelection foodType='pasta' />
                                    <FoodSelection foodType='mains' />
                                    <FoodSelection foodType='desserts' />
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='comments-input'
                                            className='float-start form-label'
                                        >
                                            Comments
                                        </label>
                                        <textarea
                                            className='form-control'
                                            id='comments-input'
                                            data-testid='comments-input'
                                            onChange={(e) =>
                                                dispatch(
                                                    updatePendingReservation({
                                                        dataType: 'comment',
                                                        data: e.target.value,
                                                    })
                                                )
                                            }
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <button
                                            className='btn btn-primary'
                                            type='submit'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <FormSelectionPreview />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
