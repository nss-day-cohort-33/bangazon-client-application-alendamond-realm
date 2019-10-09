import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import APIManager from "../../modules/APIManager"

//Author: Amber Gooch
//Purpose: Allow a user to communicate with the Bangazon database to GET PUT POST and DELETE entries.
//Methods: GET PUT(id) POST

const ProductTypes = props => {

    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

    const [productTypesList, setProductTypesList] = useState([])
    const [productsList, setProductsList] = useState([])

    const getProductTypes= () => {
        APIManager.getAll("producttypes")
        .then(setProductTypesList)
    }

    const getProducts= () => {
        APIManager.getAll("products")
        .then(setProductsList)
    }

    useEffect(() => {
        getProductTypes()
        getProducts()
    }, [])

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