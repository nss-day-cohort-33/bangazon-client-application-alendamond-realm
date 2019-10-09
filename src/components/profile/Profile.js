import APIManager from "../../modules/APIManager";
import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// Author: Curt Cato
// Purpose: To show the User its related information. Provide a link to view and add payment types
// Methods: A getAll to get the customers from DB

const CustomerProfile = props => {
  const [customerProfile, setProfile] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getCustomer = () => {
    if (isAuthenticated()) {
      APIManager.getAll("customers").then(customer => {
        setProfile(customer);
        // console.log("customer", customer);
      });
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      <main className="explorer">
        {customerProfile.map(profile => {
          console.log("profile", profile)
          if (profile.user_id == localStorage.getItem("user_id")) {
            return (
              <div>
                <ul>
                  <li>{profile.user.first_name}</li>
                  <li>{profile.user.last_name}</li>
                  <li>{profile.user.email}</li>
                  <li>{profile.user.phone_number}</li>
                  <li>{profile.address}</li>
                </ul>
                <a href="/addpayment">
                  <h4>View Existing and Add New Payment Types</h4>
                </a>
              </div>
            );
          }
        })}
      </main>
    </>
  );
};

export default CustomerProfile;
