import React, { useEffect } from "react"
import { Link } from 'react-router-dom'

const ProductTypes = props => {

    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

    // Create HTML representation with JSX

    return (
        <>
            <h2>Products</h2>
                <h5 className="sell-link"><a href="/products/sell"> + Sell a Product</a></h5>
                <div className="productTypes">
                {
                    props.productTypesList.map((type) => {
                        const filtered = props.productsList.filter((product) => {
                            return type.id === product.product_type_id})

                        return (
                            <div>
                                <strong>{type.name} ({filtered.length})</strong>
                                {filtered.slice(0, 4).map((product) => {
                                    return (
                                        <Link className="nav-link" to={`/products/${product.id}`}>
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