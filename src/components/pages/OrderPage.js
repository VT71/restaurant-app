import { nanoid } from '@reduxjs/toolkit';
import React, { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFood, addCustomerOrder } from '../../store/slices/CustomerSlice';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { update } from 'lodash';
import NavigationRail from '../NavigationRail';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CardActions,
    TextField,
    Divider,
} from '@mui/material';

function OrderPage() {
    const params = useParams();
    const tableId = params.tableid;
    let orderFood;

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`http://localhost:3333/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                orderFood = data.pendingOrder.food.split('\n');
                let tempFoodArray = [];
                if (orderFood.length > 0) {
                    orderFood.map((item) => {
                        tempFoodArray.push({ contents: item, id: nanoid() });
                    });
                }
                setFoodList([...tempFoodArray]);
                setCustomerTable({ ...data });
                setCustomerComments(data.pendingOrder.comment);
                return data;
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    };

    const updateCustomerTable = async (modifiedTable) => {
        const response = await fetch(
            `http://localhost:3333/tables/${modifiedTable.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(modifiedTable),
            }
        );
        return response;
    };

    const [customerTable, setCustomerTable] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [customerComments, setCustomerComments] = useState('');

    useEffect(() => {
        console.log('INITIAL USE EFFECT');
        fetchCustomerTable(tableId);
    }, []);

    useEffect(() => {
        console.log('FOOD LIST USE EFFECT');
        let tempString = '';
        if (foodList.length > 0) {
            for (let i = 0; i < foodList.length; i++) {
                if (foodList[i].contents.length > 0) {
                    tempString += foodList[i].contents + '\n';
                }
            }
        }
        if (Object.keys(customerTable).length > 0) {
            updateCustomerTable({
                ...customerTable,
                pendingOrder: {
                    food: tempString,
                    comment: customerTable.pendingOrder.comment,
                },
            });
            setCustomerTable({
                ...customerTable,
                pendingOrder: {
                    food: tempString,
                    comment: customerTable.pendingOrder.comment,
                },
            });
        }
    }, [foodList]);

    useEffect(() => {
        console.log('CUSTOMER COMMENTS USE EFFECT');
        if (Object.keys(customerTable).length > 0) {
            updateCustomerTable({
                ...customerTable,
                pendingOrder: {
                    food: customerTable.pendingOrder.food,
                    comment: customerComments,
                },
            });
            setCustomerTable({
                ...customerTable,
                pendingOrder: {
                    food: customerTable.pendingOrder.food,
                    comment: customerComments,
                },
            });
        }
    }, [customerComments]);

    return (
        <div className='d-flex order-page-container'>
            <NavigationRail />
            <div className='order-page'>
                <h2 className='text-center mt-3'>Your Order</h2>
                {/* <div className='orderCard m-4'>
                    <div className='orderCardBody'>
                        <ul className='list-group list-group-numbered'>
                            <div className='text-start ms-2 w-100'>
                                {foodList.map((item) => {
                                    if (item.contents !== '') {
                                        const food = item.contents.replace(
                                            /x\d+/,
                                            ''
                                        );
                                        const foodId = item.id;
                                        const foodQuantity = parseInt(
                                            item.contents
                                                .match(/x\d+/)[0]
                                                .substring(
                                                    1,
                                                    item.contents.match(
                                                        /x\d+/
                                                    )[0].length
                                                ),
                                            10
                                        );

                                        return (
                                            <div
                                                key={nanoid()}
                                                className='d-flex justify-content-between align-items-center fw-bold py-2'
                                            >
                                                <h5 className='d-inline'>
                                                    {food}
                                                </h5>
                                                <div className='foodQuantityControl d-flex align-items-center'>
                                                    <button
                                                        type='button'
                                                        className='btn btn-outline-primary'
                                                        onClick={() => {
                                                            if (
                                                                foodQuantity ==
                                                                1
                                                            ) {
                                                                setFoodList(
                                                                    foodList.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id !=
                                                                            foodId
                                                                    )
                                                                );
                                                            } else {
                                                                const tempArray =
                                                                    foodList.map(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            if (
                                                                                item.id ==
                                                                                foodId
                                                                            ) {
                                                                                return {
                                                                                    contents:
                                                                                        food +
                                                                                        'x' +
                                                                                        (foodQuantity -
                                                                                            1),
                                                                                    id: foodId,
                                                                                };
                                                                            } else {
                                                                                return item;
                                                                            }
                                                                        }
                                                                    );
                                                                setFoodList(
                                                                    tempArray
                                                                );
                                                            }
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
                                                            const tempArray =
                                                                foodList.map(
                                                                    (item) => {
                                                                        if (
                                                                            item.id ==
                                                                            foodId
                                                                        ) {
                                                                            return {
                                                                                contents:
                                                                                    food +
                                                                                    'x' +
                                                                                    (foodQuantity +
                                                                                        1),
                                                                                id: foodId,
                                                                            };
                                                                        } else {
                                                                            return item;
                                                                        }
                                                                    }
                                                                );
                                                            setFoodList(
                                                                tempArray
                                                            );
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </ul>
                        <div className='form-floating mt-3'>
                            <textarea
                                className='form-control'
                                placeholder='Leave your comments here'
                                id='customerOrderCommentsInput'
                                onChange={(e) =>
                                    setCustomerComments(e.target.value)
                                }
                                value={customerComments}
                            ></textarea>
                            <label htmlFor='customerOrderCommentsInput'>
                                Comments
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    className='btn btn-primary ms-4'
                    onClick={() => {
                        if (foodList.length > 0) {
                            if (Object.keys(customerTable).length > 0) {
                                let tempArray = [];

                                for (let i = 0; i < foodList.length; i++) {
                                    tempArray.push(foodList[i].contents);
                                }

                                updateCustomerTable({
                                    ...customerTable,
                                    food:
                                        customerTable.food +
                                        tempArray.join('\n'),
                                    comment:
                                        customerTable.comment +
                                        ' ' +
                                        customerComments,
                                    pendingOrder: {
                                        food: '',
                                        comment: '',
                                    },
                                });

                                setCustomerTable({
                                    ...customerTable,
                                    food:
                                        customerTable.food +
                                        tempArray.join('\n'),
                                    comment:
                                        customerTable.comment +
                                        ' ' +
                                        customerComments,
                                    pendingOrder: {
                                        food: '',
                                        comment: '',
                                    },
                                });
                                setFoodList([]);
                                setCustomerComments('');
                            }
                        }
                        // console.log(
                        //     'CUSTOMER TABLE: ' + JSON.stringify(customerTable)
                        // );
                        // console.log('CUSTOMER FOOD LIST: ' + foodList);
                        // console.log('CUSTOMER COMMENTS: ' + customerComments);
                    }}
                >
                    Order
                </button> */}

                <Card
                    sx={{ width: '100%', 'border-radius': '12px' }}
                    elevation={false}
                    className='pb-2'
                >
                    <CardContent
                        sx={{ 'padding-bottom': '0' }}
                        className='px-3'
                    >
                        <div className='text-start w-100'>
                            {foodList.map((item, index) => {
                                if (item.contents !== '') {
                                    const food = item.contents.replace(
                                        /x\d+/,
                                        ''
                                    );
                                    const foodId = item.id;
                                    const foodQuantity = parseInt(
                                        item.contents
                                            .match(/x\d+/)[0]
                                            .substring(
                                                1,
                                                item.contents.match(/x\d+/)[0]
                                                    .length
                                            ),
                                        10
                                    );

                                    return (
                                        <div>
                                            {index !== 0 ? <Divider /> : null}
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div
                                                    key={nanoid()}
                                                    className='d-flex flex-column fw-bold py-2'
                                                >
                                                    <h5 className='d-inline'>
                                                        {food}
                                                    </h5>
                                                    <div className='foodQuantityControl d-flex align-items-center'>
                                                        <button
                                                            type='button'
                                                            className='btn btn-outline-primary'
                                                            onClick={() => {
                                                                if (
                                                                    foodQuantity ==
                                                                    1
                                                                ) {
                                                                    setFoodList(
                                                                        foodList.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id !=
                                                                                foodId
                                                                        )
                                                                    );
                                                                } else {
                                                                    const tempArray =
                                                                        foodList.map(
                                                                            (
                                                                                item
                                                                            ) => {
                                                                                if (
                                                                                    item.id ==
                                                                                    foodId
                                                                                ) {
                                                                                    return {
                                                                                        contents:
                                                                                            food +
                                                                                            'x' +
                                                                                            (foodQuantity -
                                                                                                1),
                                                                                        id: foodId,
                                                                                    };
                                                                                } else {
                                                                                    return item;
                                                                                }
                                                                            }
                                                                        );
                                                                    setFoodList(
                                                                        tempArray
                                                                    );
                                                                }
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
                                                                const tempArray =
                                                                    foodList.map(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            if (
                                                                                item.id ==
                                                                                foodId
                                                                            ) {
                                                                                return {
                                                                                    contents:
                                                                                        food +
                                                                                        'x' +
                                                                                        (foodQuantity +
                                                                                            1),
                                                                                    id: foodId,
                                                                                };
                                                                            } else {
                                                                                return item;
                                                                            }
                                                                        }
                                                                    );
                                                                setFoodList(
                                                                    tempArray
                                                                );
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>£5.00</div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <TextField
                            className='my-2 w-100'
                            label='Comments'
                            multiline
                            maxRows={4}
                        />
                        <Divider sx={{ color: 'black' }} />
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <h2>Total:</h2>
                            <h4>£{foodList.length * 5}</h4>
                        </div>

                        {/* <Typography
                            sx={{ fontSize: 14 }}
                            color='text.secondary'
                            gutterBottom
                        >
                            Word of the Day
                        </Typography>
                        <Typography variant='h5' component='div'>
                            benevolent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                            adjective
                        </Typography>
                        <Typography variant='body2'>
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography> */}
                    </CardContent>

                    <CardActions>
                        <div className='d-flex justify-content-end w-100'>
                            <Button
                                disableElevation
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Place Order
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

export default OrderPage;
