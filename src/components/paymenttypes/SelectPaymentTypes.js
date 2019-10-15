import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const SelectPayment = props => {
  const [paymenttypeList, setPaymentTypeList] = useState([])
  const [openOrder, setOrder] = useState([])

  const payment_type = useRef();
//   const accountNumber = useRef();
//   const expireDate = useRef();
//   const createDate = useRef();
  const { isAuthenticated } = useSimpleAuth();

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
      console.log('response', response );
      return response.json()
    })
    .then(setOrder)
    // .then(response => response.json())
    // .then(response => {
    //     console.log(response)
    //   setOrder(response);
    // });
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
        .then(() => {
            console.log("Edited")
        })
        // .then(() => {
        //     props.history.push("/products")
        // })
}



  const getAllPaymentTypes = () => {
    APIManager.getAll("paymenttypes").then(allTheItems => {
      console.log("from payment types", allTheItems);
      setPaymentTypeList(allTheItems);
    });
  };

  useEffect(() => {
    getAllPaymentTypes()
    getOpenOrder()
  }, []);

  console.log("order", openOrder)
  return (
      <>
      {!openOrder ?
      <div>
        <strong>Select an existing payment type to complete your order</strong>
        <br />
        <select
          type="payment_type"
          name="payment_type"
          ref={payment_type}
        >
          {/* <option>Select Payment Type</option> */}
          {paymenttypeList.map(item => {
            return (
              <option key={item.id} value={item.id}>
                {item.merchant_name}
              </option>
            );
          })}
          </select>
        <button onClick={addPaymentToOrder}>Select</button>
      <br />
      <Link to="/addpayment">Add a new payment type</Link>
      </div>
      : "You don't have any active orders"}
    </>
  );
};

export default SelectPayment;