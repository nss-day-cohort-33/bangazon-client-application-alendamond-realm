import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import EditMyProduct from "./EditMyProduct";

// //Author: Scott Silver
// //Purpose: Allow a user to view full list of products they have for sale.
// //Methods: GET, DELETE

const MyProducts = props => {
  const [myProducts, setMyProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth();


  // this fetch call gets all the products that are specific to this user. It takes a query param of customer id, which we have saved in local storage. That's why it isn't being passed in as an argument
  const getMyProducts = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/products`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
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

  const updateMyProduct = (quantity, id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        quantity: quantity
      })
    }).then(getMyProducts);
  };

  // // Create useEffect
  useEffect(() => {
    getMyProducts();
  }, []);

  // Create HTML representation with JSX
  return (
    <>
      <h1>My Products</h1>
      {myProducts.map(myproduct => {
        return (
          <div key={myproduct.id} className="card">
            <ul>
              <li>{myproduct.name}</li>
              <li>${myproduct.price}</li>
              <li>Description: {myproduct.description}</li>
              <li>
                Current Inventory: {myproduct.quantity - myproduct.total_sold}
                <a href={`/myproducts/${myproduct.id}`}> add to stock</a>
              </li>
              <li>Sold: {myproduct.total_sold}</li>
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
