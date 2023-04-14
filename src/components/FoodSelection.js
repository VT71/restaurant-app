import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePendingReservation } from '../store/slices/TableSlice';

function FoodSelection({ foodType }) {
    let dispatch = useDispatch();
    let pendingReservationFood = useSelector(
        (state) => state.tables.pendingReservation.food
    );
    let id = '';
    let food = [];
    switch (foodType) {
        case 'starters':
            id = 'starters';
            food = [
                'Eggplant Salad',
                'Salmon Tartar',
                'Tomatoes Bruschetta',
                'Wine Plate',
                'Eggplant Bruschetta',
            ];
            break;
        case 'soups':
            id = 'soups';
            food = ['Sweet Potato Soup', 'Pumpkin Soup', 'Tomato Soup', 'Pho'];
            break;
        case 'salads':
            id = 'salads';
            food = ['Tuna Salad', 'Caesar Salad', 'Tomato Mozarella Salad'];
            break;
        case 'pasta':
            id = 'pasta';
            food = ['Spaghetti Bolognese', 'Carbonara', 'Mussels Pasta'];
            break;
        case 'mains':
            id = 'mains';
            food = [
                'Beef Steak',
                'Grilled Sardinhas',
                'Baked Salmon',
                'Baked Duck',
            ];
            break;
        case 'desserts':
            id = 'desserts';
            food = ['Chocolate Dessert', 'Cheesecake', 'Tiramisu'];
            break;
        default:
            id = 'error';
    }
    return (
        <div className='mb-3'>
            <label
                htmlFor={id + '-selection'}
                className='float-start form-label'
            >
                {id.substring(0, 1).toUpperCase() + id.substring(1)}
            </label>
            <div className='input-group'>
                <select
                    className='form-select rounded'
                    id={id + '-selection'}
                    data-testid={id + '-selection'}
                    onChange={(e) => {
                        let newFood = '';
                        if (pendingReservationFood !== '') {
                            newFood = '\n' + e.target.value + 'x1';
                        } else {
                            newFood = e.target.value + 'x1';
                        }
                        dispatch(
                            updatePendingReservation({
                                data: pendingReservationFood + newFood,
                                dataType: 'food',
                            })
                        );
                    }}
                >
                    <option>unselected</option>
                    {food.map((item) => {
                        return (
                            <option key={item + new Date().getTime()}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                {/* <div className='d-flex align-items-center'>
                    <button type='button' className='btn btn-outline-primary'>
                        -
                    </button>
                    <h4 className='my-0 mx-2'>1</h4>
                    <button type='button' className='btn btn-outline-primary'>
                        +
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default FoodSelection;
