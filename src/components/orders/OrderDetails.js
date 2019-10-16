import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";

//Author: Amber Gooch
//Purpose: Allow a user to view order details
//Methods: GET

const OrderDetails = props => {
  const [singleOrder, setOrder] = useState({line_items: []});

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

  // Create useEffect()
  useEffect(() => {
    getOrder()
  }, [])

  // Create HTML representation with JSX
  console.log(singleOrder)
  return (
    <>
      <h2>Order #{singleOrder.id}</h2>
      <br />
      <div>
          {/* {singleOrder.payment_type.merchant_name} */}
        {singleOrder.line_items.map((item, index) => {
            return (
              <div key={index}>

                  <h4>
                    <strong>{item.name}</strong>
                  </h4>

                <p>
                  ${item.price}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrderDetails;