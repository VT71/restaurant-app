import React from 'react';
import '../../App.css';
import { useSearchParams } from 'react-router-dom';

function MenuPage() {
    const [queryParameters] = useSearchParams();

    return (
        <div>
            <div className='menu-page'>
                <h2>Table: {queryParameters.get('table')}</h2>
                <h1 className='mt-4 mb-5 text-center'>Menu</h1>
                <div className='menu-container d-flex flex-wrap justify-content-around'>
                    <div className='customCard'>
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
                    <div className='customCard'>
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
                    <div className='customCard'>
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
