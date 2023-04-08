import { lowerCase } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router';

function FoodCard({ props }) {
    const navigate = useNavigate();
    const routeChange = () => {
        let path = props.location + '/categories/' + lowerCase(props.title);
        console.log('path: ' + path);
        navigate(path);
    };

    return (
        <div
            className='foodCard'
            onClick={() => {
                if (props.type === 'category') {
                    routeChange();
                }
            }}
        >
            <div className='cardImgContainer'>
                <img
                    src={require(`../assets/images/${props.imgName}`)}
                    className='card-img-top'
                    alt='...'
                />
            </div>
            <div className='cardTextContainer'>
                <h5 className='card-title text-center mb-2'>{props.title}</h5>
                <div className='cardFoodDescription'>{props.description}</div>
            </div>

            <div
                className={
                    props.type === 'category'
                        ? 'foodCardButton category d-flex justify-content-center align-items-center'
                        : 'foodCardButton d-flex justify-content-center align-items-center'
                }
                onClick={() => {
                    if (props.type === 'category') {
                        routeChange();
                    } else if (props.type === 'food') {
                        props.onClickFunction(props.title);
                    }
                }}
            >
                <p className='fw-bold'>
                    {props === 'category' ? 'More' : 'Order'}
                </p>
            </div>
        </div>
    );
}

export default FoodCard;
