import React, { useEffect, useState, useRef } from "react"
// import APIManager from "./modules/APIManager"
// import Attraction from "./Attraction"


const ProductTypes = props => {
//     // Create state variable for itinerary items - useState()
//     const [itineraryList, setItineraryList] = useState([])
//     const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")
//     const [currentItinerary, setCurrentItinerary] = useState({})

//     const getProductTypes = () => {
//         // Fetch data from localhost:8000/itineraryitems
//         APIManager.getAll("producttypes")
//         // Store itinerary items in state variable
//         .then(setProductTypeList)
//     }





    // Create useEffect()
    useEffect(() => {
        // const handler = e => {
        //     // Close all dialogs when ESC is pressed, and close search field
        //     if (e.keyCode === 27) {
        //         if (modalIsOpen) {
        //             toggleDialog(false)
        //         }
        //     }
        // }
        props.getProductTypes()
        // window.addEventListener("keyup", handler)

        // return () => window.removeEventListener("keyup", handler)
    }, [])

    // Create HTML representation with JSX
    return (
        <>

            <h2>Product Categories</h2>
                <div className="productTypes">
                {
                    props.productTypeList.map((item) => {
                    return <div>
                        {item.name}
                        {/* {item.attraction.name} in {item.attraction.area.name} at {item.starttime} */}
                            {/* <button onClick={() => deleteFromItinerary(item.id)}>Delete</button>
                            <button onClick={() => {
                                setCurrentItinerary(item)
                                toggleDialog(true)
                            }}>Edit</button> */}
                    </div>
                    })
                }
                </div>
        </>
    )
}

export default ProductTypes