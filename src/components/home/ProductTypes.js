import React, { useEffect } from "react"

const ProductTypes = props => {

    // const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")

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