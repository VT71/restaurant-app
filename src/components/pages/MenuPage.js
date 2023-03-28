import React from 'react';
import '../../App.css';
import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerOrder } from '../../store/slices/CustomerSlice';
import { Link } from 'react-router-dom';
import NavigationRail from '../NavigationRail';

function MenuPage() {
    const customerPage = window.location.pathname;
    const dispatch = useDispatch();
    const params = useParams();
    const tableId = params.tableid;

    const [customerTable, setCustomerTable] = useState({});

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
        setCustomerTable(modifiedTable);
        return response;
    };

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`http://localhost:3333/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                setCustomerTable(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    };

    useEffect(() => {
        fetchCustomerTable(tableId);
    }, []);

    return (
        <div className='d-flex menu-page-container'>
            <NavigationRail />
            <div className='menu-page'>
                <h1 className='mt-4 text-center'>Menu</h1>
                <div className='menu-container d-flex flex-wrap justify-content-around'>
                    <div className='foodCard category'>
                        <div className='cardImgContainer'>
                            <img
                                src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80'
                                className='card-img-top'
                                alt='...'
                            />
                        </div>

                        <div className='cardTextContainer'>
                            <h5 className='card-title'>CardFood</h5>
                            <div>
                                <p>Ingredients</p>
                                <ul>
                                    <li>Ingredient1</li>
                                    <li>Ingredient2</li>
                                    <li>Ingredient3</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className='cardButton d-flex justify-content-center align-items-center'
                            onClick={() => {
                                const modifiedTable = {};
                                console.log(
                                    'BEFORE BEFORE UPDATING API TABLE: ' +
                                        JSON.stringify(customerTable)
                                );
                                // setCustomerTable({
                                //     ...customerTable,
                                //     pendingOrder: {
                                //         ...customerTable.pendingOrder,
                                //         food:
                                //             customerTable.pendingOrder.food +
                                //             'CardFood x1\n',
                                //     },
                                // });
                                console.log(
                                    'BEFORE UPDATING API TABLE: ' +
                                        JSON.stringify(customerTable)
                                );
                                updateCustomerTable({
                                    ...customerTable,
                                    pendingOrder: {
                                        ...customerTable.pendingOrder,
                                        food:
                                            customerTable.pendingOrder.food +
                                            'CardFood x1\n',
                                    },
                                });
                            }}
                        >
                            <p className='fw-bold'>Order +</p>
                        </div>
                    </div>
                    <div className='foodCard category'>
                        <div className='cardImgContainer'>
                            <img
                                src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80'
                                className='card-img-top'
                                alt='...'
                            />
                        </div>

                        <div className='cardTextContainer'>
                            <h5 className='card-title'>Card title</h5>
                            <div>
                                <p>Ingredients</p>
                                <ul>
                                    <li>Ingredient1</li>
                                    <li>Ingredient2</li>
                                    <li>Ingredient3</li>
                                </ul>
                            </div>
                        </div>
                        <div className='cardButton d-flex justify-content-center align-items-center'>
                            <p className='fw-bold'>More</p>
                        </div>
                    </div>
                    <div className='foodCard category'>
                        <div className='cardImgContainer'>
                            <img
                                src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80'
                                className='card-img-top'
                                alt='...'
                            />
                        </div>

                        <div className='cardTextContainer'>
                            <h5 className='card-title'>Card title</h5>
                            <div>
                                <p>Ingredients</p>
                                <ul>
                                    <li>Ingredient1</li>
                                    <li>Ingredient2</li>
                                    <li>Ingredient3</li>
                                </ul>
                            </div>
                        </div>
                        <div className='cardButton d-flex justify-content-center align-items-center'>
                            <p className='fw-bold'>More</p>
                        </div>
                    </div>
                    <div className='foodCard category'>
                        <div className='cardImgContainer'>
                            <img
                                src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80'
                                className='card-img-top'
                                alt='...'
                            />
                        </div>

                        <div className='cardTextContainer'>
                            <h5 className='card-title'>Card title</h5>
                            <div>
                                <p>Ingredients</p>
                                <ul>
                                    <li>Ingredient1</li>
                                    <li>Ingredient2</li>
                                    <li>Ingredient3</li>
                                </ul>
                            </div>
                        </div>
                        <div className='cardButton d-flex justify-content-center align-items-center'>
                            <p className='fw-bold'>More</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuPage;
