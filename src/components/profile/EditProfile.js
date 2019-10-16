import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../../modules/APIManager";
// import Login.css from "../../"

const UpdateUser = props => {

  const [customerEdit, setEditFields] = useState ([])
  const address = useRef();
  const phoneNumber = useRef();
  const lastName = useRef();
  // const { isAuthenticated } = useSimpleAuth();

      // this function gets all customer information so it can be displayed in the input fields
      const getCustomer = () => {
        APIManager.getAll("customers").then(customer => {
          setEditFields(customer);
        });
      }

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

    useEffect(() => {
      getCustomer();
    }, []);

    //Edit form that user will use to fill out new information
    return (
        <>
        <main style={{ textAlign: "center" }}>
          <form className="form--login" onSubmit={handleUpdate}>
            <h1 className="h3 mb-3 font-weight-normal">
              Edit Form
            </h1>
        {customerEdit.map(profile => {
          if (profile.user_id == localStorage.getItem("user_id")) {
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
            <fieldset>
              <label htmlFor="inputPhoneNumber"> Phone Number </label>
              <input
                ref={phoneNumber}
                type="text"
                name="phoneNumber"
                className="form-control"
                defaultValue={profile.phone_number}
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
                defaultValue={profile.user.last_name}
                required
              />
            </fieldset>
            </div>
              );
            }
          })}
            <fieldset>
              <button type="submit">Submit Update</button>
            </fieldset>
          </form>
        </main>
      </>
    );
};

export default UpdateUser;
