import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../../modules/APIManager";
// import Login.css from "../../"

const UpdateUser = props => {
  const email = useRef();
  const userName = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const address = useRef();
  const phoneNumber = useRef();
  // const { isAuthenticated } = useSimpleAuth();

  //function that updates the customer object in the DB
  //this is called on submit edit button
  const handleUpdate = e => {
    e.preventDefault();

    const updatedUser = {
      id: localStorage.getItem("user_id"),
      address: address.current.value,
      phone_number: phoneNumber.current.value
    };

    //HTTP request from APIManager to update the customer object in DB
    APIManager.put("customers", updatedUser).then(() => {
      props.history.push("/myaccount");
    })};

    //Edit form that user will use to fill out new information
    return (
        <>
        <main style={{ textAlign: "center" }}>
          <form className="form--login" onSubmit={handleUpdate}>
            <h1 className="h3 mb-3 font-weight-normal">
              Register for Bangazon
            </h1>

            <fieldset>
              <label htmlFor="inputAddress"> Address </label>
              <input
                ref={address}
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputPhoneNumber"> Phone Number </label>
              <input
                ref={phoneNumber}
                type="text"
                name="phoneNumber"
                className="form-control"
                placeholder="Phone number"
                required
              />
            </fieldset>
            {/* <fieldset>
              <label htmlFor="inputPassword"> Password </label>
              <input
                ref={password}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="verifyPassword"> Verify Password </label>
              <input
                ref={verifyPassword}
                type="password"
                name="verifyPassword"
                className="form-control"
                placeholder="Verify password"
                required
              />
            </fieldset> */}
            <fieldset>
              <button type="submit">Submit Update</button>
            </fieldset>
          </form>
        </main>
      </>
    );
};

export default UpdateUser;
