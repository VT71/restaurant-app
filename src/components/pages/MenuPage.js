import React from 'react';
import '../../App.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFood } from '../../store/slices/CustomerSlice';
import { Link } from 'react-router-dom';

function MenuPage() {
    const [queryParameters] = useSearchParams();
    const customerPage = window.location.pathname;
    const pendingOrderFood = useSelector(
        (state) => state.customer.pendingOrder.food
    );
    const dispatch = useDispatch();

    return (
        <div className='d-flex'>
            <div className='nav-rail d-flex flex-column align-items-center justify-content-center'>
                <div
                    className={
                        customerPage.includes('menu')
                            ? 'nav-rail-item active d-flex align-items-center justify-content-center'
                            : 'nav-rail-item d-flex align-items-center justify-content-center'
                    }
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='nav-icon-container d-flex justify-content-center align-items-center'>
                            <div className='nav-icon'>
                                <i className='fa-solid fa-utensils fa-xl'></i>
                            </div>
                        </div>
                        <h2 className='text-center'>Menu</h2>
                    </div>
                </div>
                <Link to='/order'>
                    <div className='nav-rail-item d-flex align-items-center justify-content-center'>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div className='nav-icon-container d-flex justify-content-center align-items-center'>
                                <div className='nav-icon'>
                                    <i className='fa-solid fa-cart-shopping fa-xl'></i>
                                </div>
                            </div>
                            <h2 className='text-center'>My Order</h2>
                        </div>
                    </div>
                </Link>
                <div className='nav-rail-item d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='nav-icon-container d-flex justify-content-center align-items-center'>
                            <div className='nav-icon'>
                                <i className='fa-solid fa-circle-question fa-xl'></i>
                            </div>
                        </div>
                        <h2 className='text-center'>Call Waiter</h2>
                    </div>
                </div>
            </div>
            <div className='menu-page'>
                <h2>Table: {queryParameters.get('table')}</h2>
                <h1 className='mt-4 text-center'>Menu</h1>
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
                                dispatch(addFood('Card Food'));
                            }}
                        >
                            <p className='fw-bold'>Order +</p>
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
