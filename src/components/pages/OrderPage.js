import { nanoid } from '@reduxjs/toolkit';
import React, { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { activeUrl } from '../../api/apiurls';
import NavigationBar from '../NavigationBar';

function OrderPage() {
    const params = useParams();
    const tableId = params.tableid;
    let orderFood;

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`${activeUrl}/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                orderFood = data.pendingOrder.food.split('\n');
                let tempFoodArray = [];
                if (orderFood.length > 0) {
                    orderFood.map((item) => {
                        if (item !== '') {
                            tempFoodArray.push({
                                contents: item,
                                food: item.replace(/x\d+[$]\d+[.]\d+/, ''),
                                foodQuantity: parseInt(
                                    item
                                        .match(/x\d+/)[0]
                                        .substring(
                                            1,
                                            item.match(/x\d+/)[0].length
                                        ),
                                    10
                                ),
                                foodPrice: parseFloat(
                                    item
                                        .match(/[$]\d+[.]\d+/)[0]
                                        .substring(
                                            1,
                                            item.match(/[$]\d+[.]\d+/)[0].length
                                        ),
                                    10
                                ),
                                id: nanoid(),
                            });
                        }
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
            `${activeUrl}/tables/${modifiedTable.id}`,
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
    const [foodTotal, setFoodTotal] = useState(0);

    useEffect(() => {
        fetchCustomerTable(tableId);
    }, []);

    useEffect(() => {
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
            let tempFoodTotal = 0;
            foodList.map((item) => {
                tempFoodTotal += item.foodPrice * item.foodQuantity;
            });
            setFoodTotal(tempFoodTotal);
        }
    }, [foodList]);

    useEffect(() => {
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
                <h2 className='display-medium text-center mt-3'>Your Order</h2>
                <Card
                    sx={{ width: '100%', borderRadius: '12px', shadow: '0' }}
                    elevation={0}
                    className='px-2 pb-3'
                    variant='filled'
                >
                    <CardContent sx={{ paddingBottom: '0' }}>
                        <div className='text-start w-100'>
                            {foodList.map((item, index) => {
                                const food = item.food;
                                const foodId = item.id;
                                const foodQuantity = item.foodQuantity;
                                const foodPrice = item.foodPrice;

                                return (
                                    <div key={nanoid()}>
                                        {index !== 0 ? <Divider /> : null}
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex flex-column py-2'>
                                                <h5 className='headline-small d-inline'>
                                                    {food}
                                                </h5>
                                                <div className='foodQuantityControl d-flex align-items-center'>
                                                    <Button
                                                        disableElevation
                                                        variant='filledTonalIcon'
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
                                                                                    ...item,
                                                                                    contents:
                                                                                        food +
                                                                                        'x' +
                                                                                        (foodQuantity -
                                                                                            1) +
                                                                                        '$' +
                                                                                        foodPrice,
                                                                                    foodQuantity:
                                                                                        foodQuantity -
                                                                                        1,
                                                                                    id: foodId,
                                                                                    key: nanoid(),
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
                                                        <span className='material-symbols-outlined'>
                                                            remove
                                                        </span>
                                                    </Button>
                                                    <h5 className='m-auto'>
                                                        {foodQuantity}
                                                    </h5>
                                                    <Button
                                                        disableElevation
                                                        variant='filledTonalIcon'
                                                        onClick={() => {
                                                            const tempArray =
                                                                foodList.map(
                                                                    (item) => {
                                                                        if (
                                                                            item.id ==
                                                                            foodId
                                                                        ) {
                                                                            return {
                                                                                ...item,
                                                                                contents:
                                                                                    food +
                                                                                    'x' +
                                                                                    (foodQuantity +
                                                                                        1) +
                                                                                    '$' +
                                                                                    foodPrice,
                                                                                foodQuantity:
                                                                                    foodQuantity +
                                                                                    1,
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
                                                        <span className='material-symbols-outlined'>
                                                            add
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <p
                                                    className='headline-small'
                                                    style={{ fontSize: '20px' }}
                                                >
                                                    {'£' + foodPrice}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
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
                            <h2 className='headline-large'>Total:</h2>
                            <h4 className='headline-medium'>£{foodTotal}</h4>
                        </div>
                    </CardContent>

                    <CardActions>
                        <div className='d-flex justify-content-end w-100'>
                            <Button
                                disableElevation
                                variant='contained'
                                color='primary'
                                type='submit'
                                onClick={() => {
                                    if (foodList.length > 0) {
                                        if (
                                            Object.keys(customerTable).length >
                                            0
                                        ) {
                                            let tempArray = [];

                                            for (
                                                let i = 0;
                                                i < foodList.length;
                                                i++
                                            ) {
                                                tempArray.push(
                                                    foodList[i].contents
                                                );
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
                                }}
                            >
                                Place Order
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
            <NavigationBar />
        </div>
    );
}

export default OrderPage;
