import APIManager from "../../modules/APIManager";
import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import SelectPayment from "../paymenttypes/SelectPaymentTypes";

// Author: Curt Cato
// Purpose: Provide the user with a view of open orders

const OrderList = props => {
  const [open_order, setOrder] = useState({line_items: []})

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders?orderlist=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      return response.json()
    })
    .then(setOrder)
  }

  useEffect(getOpenOrder, [])

  const confirmOrder = () => {
    props.history.push("/payment")
  }

  const cancelOrder = () => {
    fetch(`http://localhost:8000/orders/${open_order.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(props.history.push("/"))
  }

  return (
    // console.log("open orders", open_order),
    <>
     {open_order.line_items.length > 0 ?
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {
            open_order.line_items.map((item, index) => {
                return <li key={index}>{item.name}: ${item.price}</li>
              })
          }
        </ul>
        {/* <button onClick={confirmOrder}>Add Payment to complete order</button> */}
        <SelectPayment {...props} />
        <br />
        <button className="btn-danger" onClick={cancelOrder}>Cancel order</button>
      </main>
     : "You don't have any active orders"}
    </>
  )
}

export default OrderList