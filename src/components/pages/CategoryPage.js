import React from 'react';
import FoodCard from '../FoodCard';
import NavigationRail from '../NavigationRail';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { upperCase } from 'lodash';

function CategoryPage() {
    const params = useParams();
    const tableId = params.tableid;
    const foodCategory = params.foodCategory;

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
        <div className='d-flex category-page-container'>
            <NavigationRail />
            <div className='menu-page'>
                <h1 className='mt-4 text-center'>
                    {upperCase(foodCategory.charAt(0)) +
                        foodCategory.substring(1)}
                </h1>
                <div className='menu-container d-flex flex-wrap justify-content-around'>
                    {/* <div className='foodCard'>
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
                    </div> */}
                    <FoodCard
                        props={{
                            type: 'food',
                            location: '',
                            title: 'Eggplant Salad',
                            imgName: 'eggplant-salad-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
