import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const SelectPayment = props => {
  const [paymenttypeList, setPaymentTypeList] = useState([]);

  const payment_type = useRef();
//   const accountNumber = useRef();
//   const expireDate = useRef();
//   const createDate = useRef();
  const { isAuthenticated } = useSimpleAuth();

  const addPaymentToOrder = (payment) => {
    // const updatedOrder = {
    //     payment_type_id: payment_type.current.value
    // }
    // console.log(updatedOrder)
    // APIManager.put("orders", updatedOrder)
    fetch(`http://localhost:8000/orders/${payment_type.current.value}`, {
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
            console.log(payment_type.current.value)

        })
        // .then(getItineraryItems)
}

//   const createPayment = () => {
//     const expire = `${expireDate.current.value}-01`;
//     if (isAuthenticated()) {
//       fetch(`http://localhost:8000/paymenttypes`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Token ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({
//           merchant_name: merchant.current.value,
//           acct_number: accountNumber.current.value,
//           expiration_date: expire
//         })
//       })
//         .then(response => response.json())
//         .then(() => {
//           APIManager.getAll("paymenttypes").then(allTheItems => {
//             setPaymentTypeList(allTheItems);
//           });
//         });
//     }
//   };

  const getAllPaymentTypes = () => {
    APIManager.getAll("paymenttypes").then(allTheItems => {
      console.log("from payment types", allTheItems);
      setPaymentTypeList(allTheItems);
    });
  };

  useEffect(getAllPaymentTypes, []);

  return (
    <>
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

    </>
  );
};

export default SelectPayment;