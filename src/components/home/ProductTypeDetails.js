import React, {useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import APIManager from "../../modules/APIManager";

//Author: Amber Gooch
//Purpose: Allow a user to view full list of products by category
//Methods: GET

const ProductTypeDetails = props => {

    const [singleType, setType] = useState([])
    const [productsList, setProductsList] = useState([])

    // Gets a single product type by its product type id and sets state
    const getSingleType = () => {
        APIManager.get("producttypes", props.match.params.productTypeId)
        .then(setType)
    }

    // Gets all products and sets state
    const getProducts = () => {
        APIManager.getAll("products")
            .then(setProductsList)
    }

    // Create useEffect()
    useEffect(() => {
        getSingleType()
        getProducts()
    }, [])

    // Create HTML representation with JSX
    return (
        <>
            <h1>{singleType.name}</h1>
            <br />
            <div className="product-cards">
                {productsList.filter((product) => {
                    return singleType.id === product.product_type_id}).map((product) => {
                        return (
                            <div key={product.id} className="card">
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
            </div>
        </>
    )

}

export default ProductTypeDetails