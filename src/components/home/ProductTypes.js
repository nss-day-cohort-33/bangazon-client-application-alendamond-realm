import React, { useEffect } from "react"

const ProductTypes = props => {

    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

    // Create HTML representation with JSX
    return (
        <>

            <h2>Product Categories</h2>
                <div className="productTypes">
                {
                    props.productTypesList.map((item) => {
                        for(let i=0; i < props.productTypesList.length; i++) {
                            for (let i=0; i < props.productList.length; i++) {
                                return <div>
                                    {item.product_type.name}
                                    {item.name}
                                </div>

                            }
                        }
                    })
                }
                </div>
        </>
    )
}

export default ProductTypes