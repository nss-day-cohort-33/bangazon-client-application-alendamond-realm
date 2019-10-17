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
    return (
        <>
        {myProducts.map(products => {
          if (products.quantity.isnull = False) {
            return (
              <div>
            <fieldset>
              <label htmlFor="inputAddress"> Address </label>
              <input
                ref={address}
                type="text"
                name="address"
                className="form-control"
                defaultValue={profile.address}
                required
              />
            </fieldset>
            </div>
        </>
            )
          }
