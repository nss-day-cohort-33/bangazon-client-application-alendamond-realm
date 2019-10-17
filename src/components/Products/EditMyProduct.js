import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const MyProducts = props => {
    const [myProducts, setMyProducts] = useState([]);
    const { isAuthenticated } = useSimpleAuth();


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

          }
