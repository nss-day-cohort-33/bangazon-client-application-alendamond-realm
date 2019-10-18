import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const MyProduct = props => {
  const [myProduct, setMyProduct] = useState([]);
  const current_inventory = useRef();
  const { isAuthenticated } = useSimpleAuth();

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

    const updateMyProduct = (quantity, id) => {
      fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          quantity: +(current_inventory.current.value) + +(myProduct.quantity)
        })
      }).then(() => {
        props.history.push("/myproducts")
    })
  };

  useEffect(() => {
    getMyProduct();
  }, []);

  return (
    <>
      <form onSubmit={updateMyProduct}>
        <div key={myProduct.id} className="card">
          <ul>
            <li>{myProduct.name}</li>
            <li>${myProduct.price}</li>
            <li>Description: {myProduct.description}</li>

            <li>
              Current Inventory: {}
              <input
                ref={current_inventory}
                type="text"
                name="current_inventory"
                defaultValue={myProduct.quantity}
                required
              ></input>
            </li>

            <li>Sold: {myProduct.total_sold}</li>
            <br />
            <button
              onClick={() =>
                updateMyProduct(myProduct.quantity, myProduct.id).then(
                  props.history.push("/myproducts")
                )
              }
            >
              Update Quantity
            </button>
          </ul>
        </div>
      </form>
      );
    </>
  );
};

export default MyProduct;
