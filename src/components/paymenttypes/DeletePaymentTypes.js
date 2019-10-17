import React, { useEffect, useState } from "react"
import APIManager from "../../modules/APIManager"


const DeletePaymentTypes = props => {
    const [paymenttypeList, setPaymentTypeList] = useState([])

    const handleOnClickDeletePaymentTypeButton = (idToDelete) => {

        APIManager.delete("paymenttypes", idToDelete).then(() => {
            APIManager.getAll("paymenttypes")
                .then((allTheItems) => {

                    setPaymentTypeList(allTheItems)
                })
        })
    }

    const getAllPaymentTypes = () => {
        APIManager.getAll("paymenttypes")
            .then((allTheItems) => {
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
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
export default DeletePaymentTypes