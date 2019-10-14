import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";

// //Author: Scott Silver
// //Purpose: Allow a user to view full list of products they have for sale.
// //Methods: GET, DELETE

const MyProducts = props => {
  const [myProducts, setMyProducts] = useState([]);

//   // Gets a single product type by its product type id and sets state
  const getMyProducts = () => {
    APIManager.getMy("myproducts", props.match.params.myproducts).then(
      setMyProducts
    );
  };

//   // Gets all products and sets state
//   // const getProducts = () => {
//   //     APIManager.getAll("products")
//   //         .then(setProductsList)
// };

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
