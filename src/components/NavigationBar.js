import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { activeUrl } from '../api/apiurls';

function NavigationBar() {
    const customerPage = window.location.href;
    const params = useParams();
    const tableId = params.tableid;

    const fetchCustomerTable = async (tableId) => {
        const response = await fetch(`${activeUrl}/tables/${tableId}`)
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
            `${activeUrl}/tables/${modifiedTable.id}`,
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
        <div className='nav-bar w-100 d-flex align-items-center justify-content-evenly'>
            <Link to={`/tables/${tableId}/menu`}>
                <div
                    className={
                        customerPage.includes('menu')
                            ? 'nav-bar-item active d-flex align-items-center justify-content-center'
                            : 'nav-bar-item d-flex align-items-center justify-content-center'
                    }
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='nav-icon-container d-flex justify-content-center align-items-center'>
                            <div className='nav-icon'>
                                <i className='fa-solid fa-utensils fa-xl'></i>
                            </div>
                        </div>
                        <h2 className='label-medium text-center'>Menu</h2>
                    </div>
                </div>
            </Link>
            <Link to={`/tables/${tableId}/order`}>
                <div
                    className={
                        customerPage.includes('order')
                            ? 'nav-bar-item active d-flex align-items-center justify-content-center'
                            : 'nav-bar-item d-flex align-items-center justify-content-center'
                    }
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='nav-icon-container d-flex justify-content-center align-items-center'>
                            <div className='nav-icon'>
                                <i className='fa-solid fa-cart-shopping fa-xl'></i>
                            </div>
                        </div>
                        <h2 className='label-medium text-center'>My Order</h2>
                    </div>
                </div>
            </Link>
            <div
                className='nav-bar-item d-flex align-items-center justify-content-center'
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
                    <h2 className='label-medium text-center'>Call Waiter</h2>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
