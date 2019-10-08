import React, {useState, useEffect } from "react"
import APIManager from "../../modules/APIManager";

const ProductDetail = props => {

    const [singleProduct, setProduct] = useState([]);

    const getSingleProduct = () => {
        APIManager.get("products",props.match.params.productId)
        .then(setProduct)
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    return (
        <>
            {
                <section className="product-details">
                    <h3>{singleProduct.name}</h3>
                    <p>${singleProduct.price}</p>
                    <p>{singleProduct.description}</p>
                    <p>Quantity: {singleProduct.quantity}</p>
                    <br/>
                    <button>Add Order</button>
                </section>
            }
        </>
    )
}

export default ProductDetail