import React, { useEffect, useState, useRef } from "react"
import useModal from "../../hooks/ui/useModal"
import APIManager from "../../modules/APIManager"

const Product = props => {
    // Create a state variable for itinerary items - useState()
    const [productList, setProductList] = useState([])
    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")
    const [currentProduct, setCurrentproduct] = useState({})

    const getAllProducts = () => {
        APIManager.getAll("products")
            .then((allTheItems) => {
                console.log(allTheItems)
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
            <h2>Product List</h2>
                <div className="productItems">
                {
                   productList.map((item) => {
                        return<div>
                           <p>{item.name}</p>
                            <button onClick={() => {
                                deleteItem(item)
                            }}>Delete Me</button>
                            <button onClick={() => {

                            }}>Edit Me</button>
                        </div>
                    })
                }
                </div>
        </>
    )
}

export default Product