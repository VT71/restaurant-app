import React from "react";
import "../../App.css";
import Table from "../Table";
import Form from "../Form";

function WaiterPage() {
    return (
        <div>
            <h1 className="mt-4 mb-5 text-center">Reserved Tables</h1>
            <Table props={{ forWaiter: true }} />
            <Form />
        </div>
    );
}

export default WaiterPage;
