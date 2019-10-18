import React, { useEffect, useState, useRef } from "react";

const OrderHistory = props => {

  const [allOrders, setOrders] = useState([])

  const getMyOrders = () => {
    fetch("http://localhost:8000/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(setOrders)
  }


  useEffect(getMyOrders, [])

  return (
      <>
        <div className="order-items">
            <h2>Order History</h2>
                {
                    allOrders.filter((order) => {
                        return order.payment_type !== null})
                    .map(order => {
                        return (
                            <div key={order.id}>
                                <a href={`/orders/${order.id}`}><h5>Order #{order.id}</h5></a>
                            </div>
                        )
                    })
                }
        </div>
    </>
  )
}

export default OrderHistory