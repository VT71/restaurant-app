import React from 'react';

function FoodCard({ props }) {
    console.log('PROPS.imgPath: ' + typeof props.imgPath);
    return (
        <div className='foodCard'>
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
            >
                <p className='fw-bold'>More</p>
            </div>
        </div>
    );
}

export default FoodCard;
