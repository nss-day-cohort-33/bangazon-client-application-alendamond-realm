import React, { useState, useEffect, useRef } from "react";
import APIManager from "../../modules/APIManager";

//Author: Curt Cato
//Purpose: Allow a user to rate a product
//Methods: POST

const rateProduct = props => {
  const [singleOrder, setOrder] = useState({
    line_items: [],
    payment_type: []
  });

  const product = useRef();
  const rating = useRef();

  //Gets a single order by orderId
  const getOrder = () => {
    fetch(`http://localhost:8000/orders/${props.match.params.orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setOrder(response);
      });
  };


  useEffect(() => {
    getOrder();
  }, []);

//   const thisProduct = singleOrder.line_items.map((item) => {return(item.id)});

  const rateProduct = (thisProduct, ratingValue) => {


    const newRatingInfo = {
      product: thisProduct,
      customer: parseInt(localStorage.getItem("user_id")),
      rating: ratingValue
    };

    APIManager.post("productratings", newRatingInfo).then(getOrder());
  };

  // Create HTML representation with JSX
  return (
    <>
      <h2>Order #{singleOrder.id}</h2>
      <br />
      <div>
        {singleOrder.line_items.map((item, index) => {
          return (

                  <td>
                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="1"
                          className="form-check-input"
                          onClick={() => {
                            rateProduct(item.id, 1);
                          }}
                        />
                        1 Star
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="2"
                          className="form-check-input"
                          onClick={() => {
                            rateProduct(item.id, 2);
                          }}
                        />
                        2 stars
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="3"
                          className="form-check-input"
                          onClick={() => {
                            rateProduct(item.id, 3);
                          }}
                        />
                        3 Stars
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="4"
                          className="form-check-input"
                          onClick={() => {
                            rateProduct(item.id, 4);
                          }}
                        />
                        4 Stars
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="5"
                          className="form-check-input"
                          onClick={() => {
                            rateProduct(item.id, 5);
                          }}
                        />
                        5 Stars
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
        <hr />
        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <th style={{ width: "30%" }}>
                <h4>Total:</h4>
              </th>
              <td>
                <h5>${totalCost}</h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;