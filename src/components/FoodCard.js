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
                    props.onClickFunction(props.title, props.price);
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
            <div
                className='cardTextContainer'
                style={
                    props.type === 'category'
                        ? { height: '38%' }
                        : { height: '32%' }
                }
            >
                <h5 className='headline-small card-title text-center mb-2'>
                    {props.title}
                </h5>
                <div className='body-medium cardFoodDescription'>
                    {props.description}
                </div>
            </div>

            {props.type === 'food' ? (
                <h5 className='text-center mt-3'>{'£' + props.price}</h5>
            ) : null}

            <Button
                sx={{
                    position: 'absolute',
                    bottom: '13px',
                    left: '50%',
                    transform: 'translate(-50%)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                disableElevation
                variant='filledTonal'
                // onClick={() => {
                //     if (props.type === 'category') {
                //         routeChange();
                //     } else if (props.type === 'food') {
                //         props.onClickFunction(props.title, props.price);
                //         displaySuccessAlert();
                //     }
                // }}
            >
                <p className='label-large' style={{ margin: '0' }}>
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
