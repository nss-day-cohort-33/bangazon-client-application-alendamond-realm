import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


//Author: Amber Gooch
//Purpose: Allow a user to view all product categories with a list of 3 products of that type
//Methods: GET POST

const ProductTypes = props => {

    const [productTypesList, setProductTypesList] = useState([])
    const [productsList, setProductsList] = useState([])

    const getProductTypes= () => {
        fetch("http://localhost:8000/producttypes?includeproducts=true", {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then((response) => {
            setProductTypesList(response)
          })
        }
        const getProducts = () => {
            fetch(`http://localhost:8000/products`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(response => {
                setProductsList(response);
              });
          };

    // Create useEffect()
    useEffect(() => {
        getProductTypes()
        getProducts()
    }, [])

    // Create HTML representation with JSX
    return (
        <>
            <h1>Products</h1>
                <h5 className="sell-link"><Link to="/products/sell"> + Sell a Product</Link></h5>
                <div className="productTypes">
                {
                    productTypesList.map((type) => {
                        return (
                            <div key={type.id}>
                                <Link to={`/productlist/${type.id}`}>
                                    <strong>{type.name} ({type.total_products})</strong>
                                </Link>
                                {type.products.map((product) => {
                                    return (
                                        <Link key={product.id} className="nav-link" to={`/products/${product.id}`}>
                                            <li>{product.name}</li>
                                        </Link>
                                    )
                                    })
                               }
                            </div>
                        )
                    })
                }
                </div>
        </>
    )
}

export default ProductTypes