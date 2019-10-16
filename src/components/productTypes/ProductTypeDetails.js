import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";

//Author: Amber Gooch
//Purpose: Allow a user to view full list of products by category
//Methods: GET

const ProductTypeDetails = props => {
  const [singleType, setType] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const getSingleType = () => {
    fetch(`http://localhost:8000/products/${props.match.params.productTypeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setType(response);
      });
  };

  // Gets all products and sets state
  const getProducts = () => {
    fetch(`http://localhost:8000/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setProductsList(response);
      });
  };

  // Create useEffect()
  useEffect(() => {
    getSingleType();
    getProducts();
  }, []);

  // Create HTML representation with JSX
  return (
    <>
      <h1>{singleType.name}</h1>
      <br />
      <div className="product-cards">
        {productsList
          .filter(product => {
            return singleType.id === product.product_type_id;
          })
          .map(product => {
            return (
              <div key={product.id} className="card">
                <Link
                  key={product.id}
                  className="card-title"
                  to={`/products/${product.id}`}
                >
                  <h5>
                    <strong>{product.name}</strong>
                  </h5>
                </Link>
                <p className="card-body">
                  ${product.price}
                  <br />
                  Quantity: <em>{product.quantity}</em>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductTypeDetails;
