import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
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
                        {/* <Link
                        className='entryGroup-button btn btn-danger'
                        to='/waiter'
                    >
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <p>Waiter</p>
                        </div>
                    </Link> */}
                        <Button
                            variant='filledTonal'
                            onClick={() => routeChange('waiter')}
                        >
                            <p className='label-large m-0'>Waiter</p>
                        </Button>
                    </div>
                    <div>
                        {/* <Link
                        className='entryGroup-button btn btn-warning'
                        to='/kitchen'
                    >
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <p>Kitchen</p>
                        </div>
                    </Link> */}
                        <Button
                            variant='filledTonal'
                            onClick={() => routeChange('kitchen')}
                        >
                            <p className='label-large m-0'>Kitchen</p>
                        </Button>
                    </div>
                    <div>
                        {/* <Link
                        className='entryGroup-button btn btn-primary'
                        to='/customer'
                    >
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <p>Customer</p>
                        </div>
                    </Link> */}
                        <Button
                            variant='filledTonal'
                            onClick={() => routeChange('customer')}
                        >
                            <p className='label-large m-0'>Customer</p>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
export default EntryPage;
