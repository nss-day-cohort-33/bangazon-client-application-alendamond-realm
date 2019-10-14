import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import APIManager from "../../modules/APIManager"

//Author: Amber Gooch
//Purpose: Allow a user to view all product categories with a list of 3 products of that type
//Methods: GET POST

const ProductTypes = props => {

    const [productTypesList, setProductTypesList] = useState([])
    const [productsList, setProductsList] = useState([])

    // Gets all product types and sets state
    const getProductTypes= () => {
        APIManager.getAll("producttypes")
        .then(setProductTypesList)
    }

    // Gets all products and sets state
    const getProducts= () => {
        APIManager.getAll("products")
        .then(setProductsList)
    }

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
                        const filtered = productsList.filter((product) => {
                            return type.id === product.product_type_id})

                        return (
                            <div key={type.id}>
                                <strong>{type.name} </strong>
                                (<Link to={`/productlist/${type.id}`}>
                                    {filtered.length}
                                </Link>)
                                {filtered.slice(0, 3).map((product) => {
                                    return (
                                        <Link key={product.id} className="nav-link" to={`/products/${product.id}`}>
                                            <li>{product.name}</li>
                                            <button>Delete</button>
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