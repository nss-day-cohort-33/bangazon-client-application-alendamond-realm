import APIManager from "../../modules/APIManager";
import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const OrderList = props => {
  const [customerOrders, setOrders] = useState([]);
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


  useEffect(getOrders, []);

  return (
    <>
      <main className="explorer">
        {customerOrders.map(order => {
          return (
            <div>
              <ul>
                <li>{order.customer_id}</li>
              </ul>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default OrderList;
