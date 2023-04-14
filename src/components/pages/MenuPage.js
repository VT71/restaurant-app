import React from 'react';
import '../../App.css';
import { useParams, useLocation } from 'react-router-dom';
import NavigationRail from '../NavigationRail';
import FoodCard from '../FoodCard';

function MenuPage() {
    const path = useLocation();

    return (
        <div className='d-flex menu-page-container'>
            <NavigationRail />
            <div className='menu-page mb-5'>
                <h1 className='display-medium mt-4 mb-2 text-center'>Menu</h1>
                <div className='menu-container d-flex flex-wrap justify-content-around'>
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Starters',
                            imgName: 'starters-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Soups',
                            imgName: 'soup-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Salads',
                            imgName: 'salads-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Pasta',
                            imgName: 'pasta-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Mains',
                            imgName: 'mains-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                    <FoodCard
                        props={{
                            type: 'category',
                            location: path.pathname,
                            title: 'Desserts',
                            imgName: 'desserts-category-img.jpg',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MenuPage;
