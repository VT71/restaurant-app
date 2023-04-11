import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function NavigationRail() {
    const customerPage = window.location.pathname;
    const params = useParams();
    const tableId = params.tableid;

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`http://localhost:3333/tables/${tableId}`)
            .then((response) => response.json())
            .then((data) => {
                data.status = 'Waiter Called';
                updateCustomerTable(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        return response;
    };

    const updateCustomerTable = async (modifiedTable) => {
        const response = await fetch(
            `http://localhost:3333/tables/${modifiedTable.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(modifiedTable),
            }
        );
        return response;
    };

    return (
        <div className='nav-rail d-flex flex-column align-items-center justify-content-center'>
            <Link to={`/tables/${tableId}/menu`}>
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
            </Link>
            <Link to={`/tables/${tableId}/order`}>
                <div
                    className={
                        customerPage.includes('order')
                            ? 'nav-rail-item active d-flex align-items-center justify-content-center'
                            : 'nav-rail-item d-flex align-items-center justify-content-center'
                    }
                >
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
            <div
                className='nav-rail-item d-flex align-items-center justify-content-center'
                onClick={() => {
                    fetchCustomerTable(tableId);
                }}
            >
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
    );
}

export default NavigationRail;
