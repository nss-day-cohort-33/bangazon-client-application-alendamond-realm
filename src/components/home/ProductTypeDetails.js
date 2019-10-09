import React, {useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import APIManager from "../../modules/APIManager";

const ProductTypeDetails = props => {

    const [singleType, setType] = useState([])
    const [productsList, setProductsList] = useState([])

    const getSingleType = () => {
        APIManager.get("producttypes", props.match.params.productTypeId)
        .then(setType)
    }

    const getProducts = () => {
        APIManager.getAll("products")
            .then(setProductsList)
    }

    useEffect(() => {
        getSingleType()
        getProducts()
    }, [])

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

// import React, { useState, useEffect } from "react"
// import { Link } from 'react-router-dom'
// import APIManager from "../../modules/APIManager"

// const ProductTypes = props => {

//     // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

//     const [productTypesList, setProductTypesList] = useState([])
//     const [productsList, setProductsList] = useState([])

//     const getProductTypes= () => {
//         APIManager.getAll("producttypes")
//         .then(setProductTypesList)
//     }

//     const getProducts= () => {
//         APIManager.getAll("products")
//         .then(setProductsList)
//     }

//     useEffect(() => {
//         getProductTypes()
//         getProducts()
//     }, [])

//     return (
//         <>
//             <h2>Products</h2>
//                 <h5 className="sell-link"><a href="/products/sell"> + Sell a Product</a></h5>
//                 <div className="productTypes">
//                 {
//                     productTypesList.map((type) => {
//                         const filtered = productsList.filter((product) => {
//                             return type.id === product.product_type_id})

//                         return (
//                             <div key={type.id}>
//                                 <strong>{type.name} ({filtered.length})</strong>
//                                 {filtered.slice(0, 4).map((product) => {
//                                     return (
//                                         <Link key={product.id} className="nav-link" to={`/products/${product.id}`}>
//                                             <li>{product.name}</li>
//                                         </Link>
//                                     )
//                                     })
//                                }
//                             </div>
//                         )
//                     })
//                 }
//                 </div>
//         </>
//     )
// }

// export default ProductTypes