import React, { useEffect, useState } from "react";
import SelectPayment from "../paymenttypes/SelectPaymentType";

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

  const cancelOrder = () => {
    fetch(`http://localhost:8000/orders/${open_order.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(props.history.push("/"))
  }

  const deleteProductFromCart = (item_id) => {
    fetch(`http://localhost:8000/orders/${open_order.id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        payment_type_id: null,
        item_id: item_id
      })
    })
    .then(getOpenOrder)
  }
  let count = 0
  console.log(open_order)
  return (
    <>
     {open_order.line_items.length > 0 ?
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {

            open_order.line_items.map(item => {
                return (<li key={count++}>{item.name}: ${item.price}
                <button onClick={() => deleteProductFromCart(item.id)}>Remove From Cart</button>
                </li>)
              })
          }
        </ul>
        <SelectPayment {...props} open_order={open_order}/>
        <br />
        <button className="btn-danger" onClick={cancelOrder}>Cancel order</button>
      </main>
     : "You don't have any active orders"}
    </>
  )
}

export default OrderList