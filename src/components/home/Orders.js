import APIManager from "../../modules/APIManager";
import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const OrderList = props => {
  const [customerOrders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth();


  const getOrders = () => {
      if (isAuthenticated()) {
          APIManager.getAll("orders")
          .then(allOrders => {
              setOrders(allOrders);
              console.log("orders", allOrders)
            });
        }
    };

  const getOrderProducts = () => {
      if (isAuthenticated()) {
          APIManager.getAll("orderproduct")
          .then(allOrderProducts => {
              setOrderProducts(allOrderProducts)
              console.log("orderProducts", allOrderProducts)
          })
      }
  }


  useEffect(() =>
                   {getOrderProducts()
                   getOrders()
                   },  []);

  return (
    <>
      <main className="explorer">
        {customerOrders.map(order => {
            // console.log(order)
          return (
            <div>
              <ul>
                <li>{order.customer_id}</li>
              </ul>
            </div>
          );
        })}
                        {orderProducts.map(product => {return(
                            <div>
                            <li>
                                <ol>{product.product_id}</ol>
                            </li>
                            </div>
                        )
                        })}
      </main>
    </>
  );
};

export default OrderList;
