import React, { useEffect, useState, useRef } from "react"
import APIManager from "../../modules/APIManager"


const AddPaymentTypes = props => {
    const [paymenttypeList, setPaymentTypeList] = useState([])

    const [merchantName, setMerchantName] = useState("")
    const [acctNumber, setAcctNumber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")

    const handleOnChangeMerchantName = event => {
        setMerchantName(event.target.value)
    }

    const handleOnChangeAcctNumber = event => {
        setAcctNumber(event.target.value)
    }

    const handleOnChangeExpirationDate = event => {
        setExpirationDate(event.target.value)
    }

    const handleOnClickAddPaymentTypeButton = () => {
        if (merchantName === "" || acctNumber === "" || expirationDate === "") {
            window.alert("Please fill in all fields")
        } else {
            const newPaymentInfo = {
                merchant_name: merchantName,
                acct_number: acctNumber,
                expiration_date: expirationDate
            }

            APIManager.post("paymenttypes", newPaymentInfo).then(() => {
                APIManager.getAll("paymenttypes")
                    .then((allTheItems) => {
                        console.log("from payment types", allTheItems)
                        setPaymentTypeList(allTheItems)
                    })
            })
        }
    }

    const getAllPaymentTypes = () => {
        APIManager.getAll("paymenttypes")
            .then((allTheItems) => {
                console.log("from payment types", allTheItems)
                setPaymentTypeList(allTheItems)
            })
    }

    useEffect(getAllPaymentTypes, [])

    return (
        <>
            <h3>Existing Payment Types</h3>
            <div className="paymentTypeItems">
                {
                    paymenttypeList.map((item) => {
                        return <div key={item.id}>
                            <p>{item.merchant_name}</p>
                        </div>
                    })
                }
            </div>
            <h3>Add a Payment Type</h3>
            <div className="form-container w-25">
                <div className="form-group">
                    <label htmlFor="add-merchant">Merchant Name</label>
                    <input
                        value={merchantName}
                        className="form-control"
                        id="add-merchant"
                        placeholder="Enter a Merchant"
                        onChange={handleOnChangeMerchantName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="add-acctnumber">Account Number</label>
                    <input
                        value={acctNumber}
                        className="form-control"
                        id="add-acctnumber"
                        placeholder="Enter an Account Number"
                        onChange={handleOnChangeAcctNumber}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="add-expirationdate">Expiration Date</label>
                    <input
                        value={expirationDate}
                        className="form-control"
                        id="add-expirationDate"
                        placeholder="Enter an Expiration Date"
                        onChange={handleOnChangeExpirationDate}
                    />
                </div>
            </div>
            <div className="btn btn-primary mb-2">
                <button onClick={handleOnClickAddPaymentTypeButton}>Add Payment Type</button>
            </div>
        </>
    )
}

export default AddPaymentTypes