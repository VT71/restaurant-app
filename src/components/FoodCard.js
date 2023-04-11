import { lowerCase } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';

function FoodCard({ props }) {
    const navigate = useNavigate();
    const routeChange = () => {
        let path = props.location + '/categories/' + lowerCase(props.title);
        console.log('path: ' + path);
        navigate(path);
    };

    const displaySuccessAlert = async () => {
        const foodAddSuccessAlert = document.getElementById(
            'startersFoodAddAlertSuccess'
        );
        if (foodAddSuccessAlert !== null) {
            foodAddSuccessAlert.style.left = '95px';
            foodAddSuccessAlert.style.opacity = '1';
            setTimeout(() => {
                foodAddSuccessAlert.style.opacity = '0';
            }, 3000);
            setTimeout(() => {
                foodAddSuccessAlert.style.left = '-200px';
            }, 4500);
        }
    };

    return (
        <div
            className='foodCard'
            onClick={() => {
                if (props.type === 'category') {
                    routeChange();
                } else if (props.type === 'food') {
                    props.onClickFunction(props.title);
                    displaySuccessAlert();
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

            <Button
                sx={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '50%',
                    transform: 'translate(-50%)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                disableElevation
                variant='filledTonal'
                onClick={() => {
                    if (props.type === 'category') {
                        routeChange();
                    } else if (props.type === 'food') {
                        props.onClickFunction(props.title);
                        displaySuccessAlert();
                    }
                }}
            >
                <p className='fw-bold' style={{ margin: '0' }}>
                    {props.type === 'category' ? 'More' : 'Order'}
                </p>
            </Button>
            {/* <div
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
                        displaySuccessAlert();
                    }
                }}
            >
                <p className='fw-bold'>
                    {props.type === 'category' ? 'More' : 'Order'}
                </p>
            </div> */}
        </div>
    );
}

export default FoodCard;
