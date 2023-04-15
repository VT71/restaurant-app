import React from 'react';
import FoodSelection from './FoodSelection';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTable,
    updatePendingReservation,
    editTable,
} from '../store/slices/TableSlice';
import FormSelectionPreview from './FormSelectionPreview';

function Form() {
    const dispatch = useDispatch();
    const pendingReservation = useSelector(
        (state) => state.tables.pendingReservation
    );

    const pendingModification = useSelector(
        (state) => state.tables.pendingModification
    );

    const submitOrder = (e) => {
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
                                            value={
                                                pendingModification.status !=
                                                'none'
                                                    ? pendingReservation.name
                                                    : undefined
                                            }
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
