import React, { useEffect, useState, useRef } from "react"
import APIManager from "../../modules/APIManager"


const AddPaymentTypes = props => {
    const [paymenttypeList, setPaymentTypeList] = useState([])

    const [merchantName, setMerchantName] = useState("")
    const [acctNumber, setAcctNumber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")

    handleOnChangeMerchantName = event => {
        setMerchantName(event.target.value)
    }

    handleOnChangeAcctNumber = event => {
        setAcctNumber(event.target.value)
    }

    handleOnChangeExpirationDate = event => {
        setExpirationDate(event.target.value)
    }

    handleOnClickAddPaymentTypeButton = () => {
        if (merchantName === "" || acctNumber === "" || expirationDate === "") {
            window.alert("Please fill in all fields")
        } else {
            const newPaymentInfo = {
                merchantName: merchantName,
                acctNumber: acctNumber,
                expirationDate: expirationDate
            }

            APIManager.post(newPaymentInfo).then(() => {
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
            <h2>Add a Payment Type</h2>
            <div className="paymentTypeItems">
                {
                    paymenttypeList.map((item) => {
                        return <div>
                            <p key={item.id}>{item.merchant_name}</p>
                        </div>
                    })
                }
            </div>
            {/* <div className="form-container w-25">
                <div className="form-group">
                    <label htmlFor="addaquote">Want to add a quote?</label>
                    <textarea
                        value={this.state.quote}
                        className="form-control"
                        id="addaquote"
                        rows="3"
                        placeholder="(Enter quote here...select if you want it in favorites...and then press the Add Quote button)"
                        onChange={this.handleOnChangeQuote}
                    />
                </div>
            </div>
            <div className="btn btn-primary mb-2">
                <button onClick={() => { addItem(item) }}>Add Payment Type</button>
            </div> */}
        </>
    )
}

export default AddPaymentTypes