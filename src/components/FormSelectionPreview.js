import React from 'react';
import { useSelector } from 'react-redux';
import FoodPreview from './FoodPreview';
import { nanoid } from '@reduxjs/toolkit';

function FormSelectionPreview() {
    const tableNumber = useSelector(
        (state) => state.tables.pendingReservation.number
    );
    const customerName = useSelector(
        (state) => state.tables.pendingReservation.name
    );
    const tableStatus = useSelector(
        (state) => state.tables.pendingReservation.status
    );
    const comment = useSelector(
        (state) => state.tables.pendingReservation.comment
    );
    console.log('Checking tableOrder');
    const tableOrder = useSelector(
        (state) => state.tables.pendingReservation.food
    ).split('\n');
    console.log('Table Order: ' + tableOrder);
    return (
        <div className='card'>
            <div className='card-body'>
                <h2>Your Selection:</h2>
                <ol className='list-group list-group-numbered'>
                    <li className='list-group-item d-flex justify-content-between align-items-start'>
                        <div className='text-start ms-2 me-auto'>
                            <div className='fw-bold'>Table Number:</div>
                            {tableNumber}
                        </div>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-start'>
                        <div className='text-start ms-2 me-auto'>
                            <div className='fw-bold'>Customer Name</div>
                            {customerName}
                        </div>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-start'>
                        <div className='text-start ms-2 me-auto'>
                            <div className='fw-bold'>Status</div>
                            {tableStatus}
                        </div>
                    </li>
                    <li className='list-group-item d-flex'>
                        <div className='text-start ms-2 w-100'>
                            <h5>Order</h5>
                            {tableOrder.map((item) => {
                                if (item !== '') {
                                    return (
                                        <FoodPreview
                                            key={nanoid()}
                                            props={{
                                                food: item.replace(/x\d+/, ''),
                                                quantity: item
                                                    .match(/x\d+/)
                                                    .join(),
                                            }}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </li>

                    <li className='list-group-item d-flex justify-content-between align-items-start'>
                        <div className='text-start ms-2 me-auto'>
                            <div className='fw-bold'>Comments</div>
                            {comment}
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default FormSelectionPreview;
