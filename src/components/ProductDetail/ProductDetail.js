import React, { useEffect, useState, useRef } from "react"
import ProductDialog from "./ProductDialog"
import useModal from "../../hooks/ui/useModal"
// import "./MyItinerary.css"


const ProductDetail = props => {
    // Create a state variable for itinerary items - useState()
    const [productDetailItem, setProductDetailItem] = useState([])
    const { toggleDialog, modalIsOpen } = useModal("#dialog--product--detail")
    const [currentProductDetail, setCurrentProductDetail] = useState({})

    const getItems = (id) => {
        // Fetch the data from localhost:8000/itineraryitems
        fetch(`http://localhost:8000/products${id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store itinerary items in state variable
            .then((allTheItems) => {
              setProductDetailItem(allTheItems)
            })
    }

    const deleteItem = item => {
        fetch(`http://localhost:8000/products/${item.id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
            .then(getItems)
    }

    // Create useEffect()
    useEffect(() => {
        getItems()

        const handler = e => {
            if (e.keyCode === 27) {
                console.log(`MyItinerary useEffect() modalIsOpen = ${modalIsOpen}`)
                if (modalIsOpen) {
                    toggleDialog(false)
                }
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [])

    const updateProductDetailItem = (name) => {
        fetch(`http://localhost:8000/prodcuts/${currentProductDetail.id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            },
            "body": JSON.stringify({
                "name": name
            })
        })
            .then(() => {
                console.log("Updated!!!! YAY!!!!  🙌🏼")
                toggleDialog(false)
            })
            .then(getItems)
    }


    // Create HTML representation with JSX
    return (
        <>
            <ProductDialog toggleDialog={toggleDialog} callback={(name)=> {
                updateProductDetailItem(name)
            }} />
            <h2>Product Detail</h2>
                <div className="productDetailItems">
                {
                    productDetailItem.map((item) => {
                        return <div>
                            {item.name}
                            {item.price}
                            {item.description}
                            {item.quantity}
                            {item.city}
                            {item.created_at}
                            {item.image}
                            {item.producttype.id}
                            {item.customer.id}
                            <button onClick={() => {
                                deleteItem(item)
                            }}>Delete Me</button>
                            <button onClick={() => {
                                setProductDetailItem(item)
                                toggleDialog(true)
                            }}>Edit Me</button>
                            <button onClick={() => {
                                setProductDetailItem(item)
                                toggleDialog(true)
                            }}>Add</button>
                        </div>
                    })
                }
                </div>
        </>
    )
}

export default ProductDetail