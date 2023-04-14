import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';

function EntryPage() {
    let navigate = useNavigate();
    const routeChange = (direction) => {
        let path = '';
        switch (direction) {
            case 'waiter':
                path = `/waiter`;
                break;
            case 'kitchen':
                path = '/kitchen';
                break;
            case 'customer':
                path = '/customer';
                break;
            default:
                path = '';
        }
        navigate(path);
    };

    return (
        <div className='entry-page-container vh-100 d-flex flex-column justify-content-center'>
            <Card className='m-auto w-75 p-4' variant='filled'>
                <h1 className='display-medium text-center mb-5'>Hello User</h1>
                <div className='d-flex justify-content-around align-items-center mt-5'>
                    <div>
                        <Button
                            variant='disabled'
                            onClick={() => routeChange('waiter')}
                        >
                            <p className='label-large m-0'>Waiter</p>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant='disabled'
                            onClick={() => routeChange('kitchen')}
                        >
                            <p className='label-large m-0'>Kitchen</p>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant='filledTonal'
                            onClick={() => routeChange('customer')}
                        >
                            <p className='label-large m-0'>Customer</p>
                        </Button>
                    </div>
                </div>
                <Card variant='filledTonal' className='p-3 mt-3 d-flex'>
                    <span className='material-symbols-outlined'>info</span>
                    <p className='body-medium ms-2'>
                        <span style={{ fontWeight: 'bold' }}>Please Note:</span>{' '}
                        Adding food to the basket, in the customer section, will
                        not generate any changes on the order page because the
                        app was built using a fake local api.
                        <br />
                        However, the food lists from all categories (customer
                        section) and some reserved tables (waiter section) will
                        be displayed.
                        <br />
                        Kitchen and Waiter sections will soon have an updated
                        design.
                    </p>
                </Card>
            </Card>
        </div>
    );
}
export default EntryPage;
