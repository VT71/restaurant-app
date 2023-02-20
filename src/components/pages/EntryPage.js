import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

function EntryPage() {
    return (
        <div className="vh-100 d-flex flex-column justify-content-center">
            <h1 className="text-center mb-5">Hello User</h1>
            <div className="vw-100 d-flex justify-content-around align-items-center mt-5">
                <div>
                    <Link
                        className="entryGroup-button btn btn-danger"
                        to="/waiter"
                    >
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <p>Waiter</p>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        className="entryGroup-button btn btn-warning"
                        to="/kitchen"
                    >
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <p>Kitchen</p>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        className="entryGroup-button btn btn-primary"
                        to="/customer"
                    >
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <p>Customer</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default EntryPage;
