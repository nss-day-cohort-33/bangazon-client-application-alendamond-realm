import React, { useEffect, useState, useRef } from "react"

import APIManager from "../../modules/APIManager"

const Home = props => {
    const [productList, setProductList] = useState([])

    const getAllProducts = () => {
        APIManager.getAll("products")
            .then((allTheItems) => {
                setProductList(allTheItems)
            })
    }

    useEffect(getAllProducts, [])
    const deleteItem = id => {
        APIManager.deleteItem(id)
            .then(getAllProducts)
    }


    // Create HTML representation with JSX
    return  (
        <>
            <h1> WELCOME TO BANGAZON</h1>
                <div className="productItems">
                {
                   productList.map((item) => {
                        return<div>
                           <p>{item.name} {item.price}</p>

                        </div>
                    })
                }
                </div>
        </>
    )
}

export default Home