import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// //Author: Scott Silver
// //Purpose: Allow a user to view full list of products they have for sale.
// //Methods: GET, DELETE

const MyProducts = props => {
  const [myProducts, setMyProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  // this fetch call gets all the payment types that are specific to this user. It takes a query param of customer id, which we have saved in local storage. That's why it isn't being passed in as an argument

  const getMyProducts = () => {
    if (isAuthenticated()) {
      fetch(
        `http://localhost:8000/products?customer=${localStorage.getItem(
          "user_id"
        )}`,
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
        .then(setMyProducts);
    }
  };

  const deleteMyProduct = id => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }).then(getMyProducts);
    }
  };

  // // Create useEffect()
  useEffect(() => {
    getMyProducts();
  }, []);

  //     // Create HTML representation with JSX

  return (
    <>
      <h1>My Products</h1>
      {myProducts.map(myproduct => {
        return (
          <div className="card">
            <ul>
              <li>{myproduct.name}</li>
              <li>{myproduct.price}</li>
              <li>Description: {myproduct.description}</li>
              <li>Quantity: {myproduct.quantity}</li>
              <br />
              <button onClick={() => deleteMyProduct(myproduct.id)}>
                Delete
              </button>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default MyProducts;
