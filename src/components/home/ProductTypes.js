import React, { useEffect } from "react"

const ProductTypes = props => {

    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

    // Create HTML representation with JSX
    return (
        <>
            <h2>Product Categories</h2>
                <div className="productTypes">
                {
                    props.productTypesList.map((type) => {
                        return (
                            <div>
                                <strong>{type.name} ({props.productsList.filter((product) => {
                                    return type.id === product.product_type_id}).length})</strong>
                                {props.productsList.filter((product) => {
                                    return type.id === product.product_type_id})
                                    .slice(0, 4).map((product) => {
                                        console.log(product)
                                        return (
                                           <li>
                                               {product.name}
                                           </li>
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