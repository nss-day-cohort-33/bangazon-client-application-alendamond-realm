import React, { useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const AddPaymentTypes = props => {

  const merchant = useRef();
  const accountNumber = useRef();
  const expireDate = useRef();
  const createDate = useRef();
  const { isAuthenticated } = useSimpleAuth();

  const createPayment = () => {
    const expire = `${expireDate.current.value}-01`;
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/paymenttypes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          merchant_name: merchant.current.value,
          acct_number: accountNumber.current.value,
          expiration_date: expire
        })
      })
    }
  };

  return (
    <>
      <div>
        <h3>Add a New Payment Type</h3>
        <br />
        <form
          className="payment-type-form"
          onSubmit={e => {
            e.preventDefault();
            createPayment()
            props.history.push("/deletepayment")
          }}
        >
          <fieldset>
            <label htmlFor="merchant">Merchant:</label>
            <input type="text" ref={merchant} name="merchant" required></input>
          </fieldset>
          <fieldset>
            <label htmlFor="account-number">Account Number:</label>
            <input
              type="text"
              ref={accountNumber}
              name="account-number"
              required
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="expire-date">Expiration Date:</label>
            <input
              type="month"
              ref={expireDate}
              name="expire-date"
              min={new Date().toISOString().slice(0, 7)}
              required
            ></input>
          </fieldset>
          <input
            type="date"
            ref={createDate}
            name="expire-date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            hidden
          ></input>
          <br />
          <button type="submit">Add Payment</button>
        </form>
      </div>
    </>
  );
};

export default AddPaymentTypes;
