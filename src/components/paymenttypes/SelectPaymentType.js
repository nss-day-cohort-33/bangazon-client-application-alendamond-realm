import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import useModal from "../../hooks/ui/useModal"

const SelectPayment = props => {
    const [paymenttypeList, setPaymentTypeList] = useState([])
    const [openOrder, setOrder] = useState([])
    const { toggleDialog, modalIsOpen } = useModal("#order-dialog")
    const payment_type = useRef();

    const getOpenOrder = () => {
        fetch(`http://localhost:8000/orders?orderlist=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
        })
        .then(response => response.json())
        .then(setOrder)
    }

    const addPaymentToOrder = () => {
        fetch(`http://localhost:8000/orders/${openOrder.id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            "body": JSON.stringify({
                "payment_type_id": payment_type.current.value
            })
        })
    }

    const getAllPaymentTypes = () => {
        APIManager.getAll("paymenttypes").then(response => {
            setPaymentTypeList(response);
        });
    };

    useEffect(() => {
    getAllPaymentTypes()
    getOpenOrder()
    }, []);

    return (
        <>
            <div>
                <dialog id="order-dialog" className="order-dialog">
                    <h2>Thank you for your order</h2>
                    <h5>Order number: #{openOrder.id}</h5>
                    <p>Your order has been received and is now being processed. Thank you for shopping with Bangazon.</p>
                    <button style={{position: "absolute", top: "0.25em", right: "0.25em"}}
                        id="closeBtn"
                        onClick={() => {toggleDialog(false); props.history.push("/orderhistory")}}>x</button>
                </dialog>
            </div>
            <div>
                <strong>Select an existing payment type to complete your order</strong>
                <br />
                <select
                    type="payment_type"
                    name="payment_type"
                    ref={payment_type}
                >
                    {/* <option>Select a Payment Type</option> */}
                    {paymenttypeList.map(item => {
                    return (
                        <option key={item.id} value={item.id}>
                        {item.merchant_name}
                        </option>
                    );
                    })}
                    </select>
                <button onClick={() => {addPaymentToOrder(); toggleDialog(true)}}>Place order</button>
                <br />
                <Link to="/addpayment">Add a new payment type</Link>
            </div>
        </>
    );
};

export default SelectPayment;