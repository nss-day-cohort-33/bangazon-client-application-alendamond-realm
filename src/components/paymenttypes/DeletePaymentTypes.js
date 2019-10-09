import React, { useEffect, useState, useRef } from "react"
import APIManager from "../../modules/APIManager"


const DeletePaymentTypes = props => {
    const [paymenttypeList, setPaymentTypeList] = useState([])

    const handleOnClickDeletePaymentTypeButton = (idToDelete) => {

        APIManager.delete("paymenttypes", idToDelete).then(() => {
            APIManager.getAll("paymenttypes")
                .then((allTheItems) => {
                    console.log("from payment types", allTheItems)
                    setPaymentTypeList(allTheItems)
                })
        })
    }

    const getAllPaymentTypes = () => {
        APIManager.getAll("paymenttypes")
            .then((allTheItems) => {
                console.log("from payment types--getAll function", allTheItems)
                setPaymentTypeList(allTheItems)
            })
    }

    useEffect(() => {
        getAllPaymentTypes()
    }, []);

    return (
        <>
            <h3>My Payment Types</h3>
            <div className="paymentTypeItems">
                {
                    paymenttypeList.map((item) => {
                        return <div key={item.id}>
                            <p>{item.merchant_name}</p>
                            <div>
                                <button className="btn btn-primary mb-2" onClick={() => handleOnClickDeletePaymentTypeButton(item.id)}>Delete Payment Type</button>
                                {console.log("payment type item id", item.id)}
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
export default DeletePaymentTypes