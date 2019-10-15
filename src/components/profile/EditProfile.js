import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../../modules/APIManager";
// import Login.css from "../../"

const UpdateUser = props => {

  const address = useRef();
  const phoneNumber = useRef();
  const lastName = useRef();
  // const { isAuthenticated } = useSimpleAuth();

  //function that updates the customer object in the DB
  //this is called on submit edit button
  const handleUpdate = e => {
    e.preventDefault();

    const updatedUser = {
      id: localStorage.getItem("user_id"),
      user_id: localStorage.getItem("user_id"),
      address: address.current.value,
      phone_number: phoneNumber.current.value,
      last_name: lastName.current.value
    };

    //HTTP request from APIManager to update the customer object in DB
    APIManager.put("customers", updatedUser).then(() => {
      props.history.push("/myaccount")
    })};

    //Edit form that user will use to fill out new information
    return (
        <>
        <main style={{ textAlign: "center" }}>
          <form className="form--login" onSubmit={handleUpdate}>
            <h1 className="h3 mb-3 font-weight-normal">
              Edit Form
            </h1>
            <fieldset>
              <label htmlFor="inputAddress"> Address </label>
              <input
                ref={address}
                type="text"
                name="address"
                className="form-control"
                placeholder="address"
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
            <fieldset>
              <label htmlFor="inputLastName"> Last Name </label>
              <input
                ref={lastName}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                required
              />
            </fieldset>
            <fieldset>
              <button type="submit">Submit Update</button>
            </fieldset>
          </form>
        </main>
      </>
    );
};

export default UpdateUser;
