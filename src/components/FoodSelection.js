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
                'Eggplant Salad $9.99',
                'Salmon Tartar $9.99',
                'Tomatoes Bruschetta $9.99',
                'Wine Plate $9.99',
                'Eggplant Bruschetta $9.99',
            ];
            break;
        case 'soups':
            id = 'soups';
            food = [
                'Sweet Potato Soup $9.99',
                'Pumpkin Soup $9.99',
                'Tomato Soup $9.99',
                'Pho $9.99',
            ];
            break;
        case 'salads':
            id = 'salads';
            food = [
                'Tuna Salad $9.99',
                'Caesar Salad $9.99',
                'Tomato Mozarella Salad $9.99',
            ];
            break;
        case 'pasta':
            id = 'pasta';
            food = [
                'Spaghetti Bolognese $9.99',
                'Carbonara $9.99',
                'Mussels Pasta $9.99',
            ];
            break;
        case 'mains':
            id = 'mains';
            food = [
                'Beef Steak $9.99',
                'Grilled Sardinhas $9.99',
                'Baked Salmon $9.99',
                'Baked Duck $9.99',
            ];
            break;
        case 'desserts':
            id = 'desserts';
            food = [
                'Chocolate Dessert $9.99',
                'Cheesecake $9.99',
                'Tiramisu $9.99',
            ];
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
            </div>
        </div>
    );
}

export default FoodSelection;
