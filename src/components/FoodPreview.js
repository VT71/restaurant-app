import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePendingReservation } from '../store/slices/TableSlice';

function FoodPreview({ props }) {
    let quantity = props.quantity.substring(1, props.quantity.length);
    let food = props.food;

    const dispatch = useDispatch();
    const tableOrder = useSelector(
        (state) => state.tables.pendingReservation.food
    ).split('\n');

    const changeQuantity = (op) => {
        const index = tableOrder.indexOf(food + 'x' + quantity);
        if (op === 'decrease') {
            if (quantity == 1) {
                tableOrder.splice(index, 1);
                dispatch(
                    updatePendingReservation({
                        dataType: 'food',
                        data: tableOrder.join('\n'),
                    })
                );
            } else if (quantity > 1) {
                quantity--;
                tableOrder[index] = food + 'x' + quantity;
                dispatch(
                    updatePendingReservation({
                        dataType: 'food',
                        data: tableOrder.join('\n'),
                    })
                );
            }
        }
        if (op === 'increase') {
            quantity++;
            tableOrder[index] = food + 'x' + quantity;
            dispatch(
                updatePendingReservation({
                    dataType: 'food',
                    data: tableOrder.join('\n'),
                })
            );
        }
    };
    return (
        <div className='d-flex justify-content-between align-items-center fw-bold py-2'>
            <h5 className='d-inline'>{food}</h5>
            <div className='foodQuantityControl d-flex align-items-center'>
                <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={() => changeQuantity('decrease')}
                >
                    -
                </button>
                <h5 className='m-auto'>{quantity}</h5>
                <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={() => changeQuantity('increase')}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default FoodPreview;
