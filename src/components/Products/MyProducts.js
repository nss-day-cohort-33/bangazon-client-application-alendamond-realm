import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// //Author: Scott Silver
// //Purpose: Allow a user to view full list of products they have for sale.
// //Methods: GET, DELETE

const MyProducts = props => {
  const [myProducts, setMyProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth()

  // this fetch call gets all the payment types that are specific to this user. It takes a query param of customer id, which we have saved in local storage. That's why it isn't being passed in as an argument

  const getMyProducts = () => {
      if (isAuthenticated()) {
          APIManager.getMy("myproducts")
              .then(setMyProducts)
      }
  }



// // Create useEffect()
useEffect(() => {
  getMyProducts();
  console.log(myProducts)
}, []);

//     // Create HTML representation with JSX
    return (
        <>
            <h1>{myProducts}</h1>
           <br />
            {/* <div className="product-cards">
                 {productsList.filter((product) => {
                    return myProduct.id === user_id}).map((product) => {
                        return (
                             <div key={myProduct.id} className="card">
                                 <Link key={product.id} className="card-title" to={`/products/${product.id}`}>
                                     <h5><strong>{product.name}</strong></h5>
                                 </Link>
                                 <p className="card-body">
                                     ${product.price}
                                     <br />
                                     Quantity: <em>{product.quantity}</em>
                                 </p>

                           </div>
                        )
                    })
               }
             </div> */}
        </>
    )

}

export default MyProducts;
