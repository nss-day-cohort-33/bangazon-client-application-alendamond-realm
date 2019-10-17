import React, { useState, useEffect } from "react";


//Author: Amber Gooch
//Purpose: Allow a user to view order details
//Methods: GET

const OrderDetails = props => {
    const [singleOrder, setOrder] = useState({line_items: [], payment_type: []});

    //Gets a single order by orderId
    const getOrder = () => {
        fetch(`http://localhost:8000/orders/${props.match.params.orderId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
            }
    })
        .then(response => response.json())
        .then(response => {
        setOrder(response)
        })
    }

    const totalCost = singleOrder.line_items.reduce(function(prev, cur) {
        return (parseFloat(prev) + parseFloat(cur.price)).toFixed(2);
    }, 0);

    useEffect(() => {
        getOrder()
    }, [])

    // Create HTML representation with JSX
    return (
        <>
        <h2>Order #{singleOrder.id}</h2>
        <br />
            <div>
                {singleOrder.line_items.map((item, index) => {
                    return (
                        <table key={index} className="table table-sm table-borderless">
                            <tbody>
                                <tr>
                                    <th style={{width:"30%"}}>{item.name}</th>
                                    <td>${item.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
                <hr />
                <table className="table table-sm table-borderless">
                    <tbody>
                        <tr>
                            <th style={{width:"30%"}}><h4>Total:</h4></th>
                            <td><h5>${totalCost}</h5></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OrderDetails;