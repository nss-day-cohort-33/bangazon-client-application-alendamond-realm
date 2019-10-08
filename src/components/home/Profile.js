import APIManager from "../../modules/APIManager";
import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const CustomerProfile = props => {
    const [customerProfile, setProfile] = useState([]);
    const { isAuthenticated } = useSimpleAuth();

const getCustomer = () => {
    if (isAuthenticated()) {
        APIManager.getAll("customers")
        .then(customer => {
            setProfile(customer);
            console.log("customer", customer)
          });
      }
  };

  useEffect(() =>
                   {getCustomer()
                   },  []);

  return (
    <>
      <main className="explorer">
        {customerProfile.map(profile => {
          return (
            <div>
              <ul>
                <li>{profile.address}</li>
              </ul>
            </div>
          );
        })}
      </main>
    </>
  );
};


export default CustomerProfile