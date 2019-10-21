import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// //Author: Scott Silver
// //Purpose: Allow a user to update quantity on a product they are selling.
// //Methods: GET, PUT

const MyProduct = props => {
  const [myProduct, setMyProduct] = useState([]);
  const current_inventory = useRef();
  const { isAuthenticated } = useSimpleAuth();

  // fetches one product
  const getMyProduct = () => {
    if (isAuthenticated()) {
      fetch(
        `http://localhost:8000/products/${props.match.params.myproductId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          }
        }
      )
        .then(e => e.json())
        .then(setMyProduct);
    }
  };

  // request to update quantity in product table by adding new quantity to initial value when user adds to stock of a product
  const updateMyProduct = (quantity, id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        quantity: +current_inventory.current.value + +myProduct.quantity
      })
    }).then(() => {
      props.history.push("/myproducts");
    });
  };

  // create useEffect
  useEffect(() => {
    getMyProduct();
  }, []);

  // render for product being edited
  return (
    <>
      <div key={myProduct.id} className="card">
        <ul>
          <li>{myProduct.name}</li>
          <li>${myProduct.price}</li>
          <li>Description: {myProduct.description}</li>
          <li>
            Enter number of new stock: {}
            <input
              ref={current_inventory}
              type="text"
              name="current_inventory"
              required
            ></input>
          </li>
          <li>Sold: {myProduct.total_sold}</li>
          <br />
          <button
            onClick={() => updateMyProduct(myProduct.quantity, myProduct.id)}
          >
            Update Quantity
          </button>
        </ul>
      </div>
    </>
  );
};

export default MyProduct;
