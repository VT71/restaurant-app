import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFood } from '../../store/slices/CustomerSlice';

function OrderPage() {
    const dispatch = useDispatch();
    const orderFood = useSelector((state) => state.customer.pendingOrder.food);
    const splitOrderFood = orderFood.split('\n');
    console.log(orderFood);

    return (
        <div>
            <p>Order:</p> {orderFood}
            <div className='card'>
                <div className='card-body'>
                    <h2>Your Selection:</h2>
                    <ol className='list-group list-group-numbered'>
                        <li className='list-group-item d-flex'>
                            <div className='text-start ms-2 w-100'>
                                <h5>Order</h5>
                                {splitOrderFood.map((item) => {
                                    const index = splitOrderFood.indexOf(item);
                                    const food = item.replace(/x\d+/, '');
                                    const foodQuantity = parseInt(
                                        item
                                            .match(/x\d+/)
                                            .join()
                                            .substring(
                                                1,
                                                item.match(/x\d+/).join().length
                                            ),
                                        10
                                    );
                                    return (
                                        <div
                                            key={nanoid()}
                                            className='d-flex justify-content-between align-items-center fw-bold py-2'
                                        >
                                            <h5 className='d-inline'>{food}</h5>
                                            <div className='foodQuantityControl d-flex align-items-center'>
                                                <button
                                                    type='button'
                                                    className='btn btn-outline-primary'
                                                    onClick={() => {
                                                        if (foodQuantity == 1) {
                                                            splitOrderFood.splice(
                                                                index,
                                                                1
                                                            );
                                                        } else {
                                                            const newFood =
                                                                food +
                                                                'x' +
                                                                (foodQuantity -
                                                                    1);

                                                            splitOrderFood[
                                                                index
                                                            ] = newFood;
                                                        }

                                                        dispatch(
                                                            updateFood(
                                                                splitOrderFood.join(
                                                                    '\n'
                                                                )
                                                            )
                                                        );
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <h5 className='m-auto'>
                                                    {foodQuantity}
                                                </h5>
                                                <button
                                                    type='button'
                                                    className='btn btn-outline-primary'
                                                    onClick={() => {
                                                        const newFood =
                                                            food +
                                                            'x' +
                                                            (foodQuantity + 1);

                                                        splitOrderFood[index] =
                                                            newFood;
                                                        dispatch(
                                                            updateFood(
                                                                splitOrderFood.join(
                                                                    '\n'
                                                                )
                                                            )
                                                        );
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
