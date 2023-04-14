import React from 'react';
import FoodCard from '../FoodCard';
import NavigationRail from '../NavigationRail';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { upperCase } from 'lodash';
import { nanoid } from '@reduxjs/toolkit';
import { Alert } from '@mui/material';
import { activeUrl } from '../../api/apiurls';

function CategoryPage() {
    const params = useParams();
    const tableId = params.tableid;
    const foodCategory = params.foodCategory;

    const [customerTable, setCustomerTable] = useState({});
    const [foodList, setFoodList] = useState([]);

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
        setCustomerTable(modifiedTable);
        return response;
    };

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`${activeUrl}/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                setCustomerTable(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    };

    const fetchFoodList = async (foodCategory) => {
        const response = await fetch(`${activeUrl}/foodList/${foodCategory}`)
            .then((response) => response.json())
            .then((data) => {
                setFoodList(data.list);
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    };

    const updateOrder = (foodName, foodPrice) => {
        updateCustomerTable({
            ...customerTable,
            pendingOrder: {
                ...customerTable.pendingOrder,
                food:
                    customerTable.pendingOrder.food +
                    foodName +
                    ' x1$' +
                    foodPrice +
                    '\n',
            },
        });
    };

    useEffect(() => {
        fetchCustomerTable(tableId);
        fetchFoodList(foodCategory);
    }, []);

    return (
        <div className='d-flex category-page-container'>
            <NavigationRail />
            <div className='mb-5 menu-page'>
                <Alert
                    sx={{
                        opacity: '0',
                        position: 'absolute',
                        zIndex: '1',
                        bottom: '10px',
                        left: '-200px',
                        transition: 'opacity 1.5s linear',
                    }}
                    id='startersFoodAddAlertSuccess'
                    severity='success'
                >
                    Added to your order!
                </Alert>
                <h1 className='display-medium mt-4 mb-2 text-center'>
                    {upperCase(foodCategory.charAt(0)) +
                        foodCategory.substring(1)}
                </h1>
                <div className='menu-container d-flex flex-wrap justify-content-around'>
                    {foodList.map((item) => (
                        <FoodCard
                            key={nanoid()}
                            props={{
                                type: item.type,
                                title: item.title,
                                imgName: item.imgName,
                                price: item.price,
                                description: item.description,
                                onClickFunction: updateOrder,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
