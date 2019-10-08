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
                merchantName: setMerchantName(merchantName),
                acctNumber: setAcctNumber(acctNumber),
                expirationDate: setExpirationDate(expirationDate)
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
            <h2>Payment Types List</h2>
            <div className="paymentTypeItems">
                {
                    paymenttypeList.map((item) => {
                        return <div>
                            <p key={item.id}>{item.merchant_name}</p>
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

export default AddPaymentTypes

//TODO: Extra Code to copy from below--------DELETE FROM HERE

import React, { Component } from "react"
import { Button, ButtonGroup } from "reactstrap"
import "./MyQuotes.css"
import QuoteManager from "../../modules/QuoteManager"

export default class MyQuotes extends Component {
    state = {
        quote: "",
        author: "",
        isfavorite: true,
        radioSelected: true
    }

    handleOnChangeQuote = event => {
        this.setState({ quote: event.target.value })
    }

    handleOnChangeAuthor = event => {
        this.setState({ author: event.target.value })
    }

    onRadioBtnClick(radioSelected) {
        this.setState({ isfavorite: radioSelected }) //The value of isfavorite corresponds to what is selected by the radio button
    }

    handleOnClickAddQuoteButton = () => {
        if (this.state.quote === "" || this.state.author === "") {
            window.alert("Please fill in all fields")
        } else {
            const newQuote = {
                userid: this.props.currentUserId,
                quote: this.state.quote,
                author: this.state.author,
                isfavorite: this.state.isfavorite
            }

            QuoteManager.post(newQuote).then(() => {
                this.setState({ quote: "" }) //Clears the field of its values
                this.setState({ author: "" })
                this.props.getMyQuotes()
            })
        }
    }

    componentDidMount() {
        this.props.getMyQuotes()
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="headingMyQuo">My Quotes</h2>
                </div>
                <div className="quote-page-container">
                    <div className="form-container w-25">
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
                            <label htmlFor="addaquote">Author</label>
                            <textarea
                                value={this.state.author}
                                className="form-control"
                                id="addaquote"
                                rows="3"
                                placeholder="(Enter name of author)"
                                onChange={this.handleOnChangeAuthor}
                            />
                        </div>
                        <div>
                            <h5>Favorite?</h5>
                            <ButtonGroup className="mb-3">
                                <Button
                                    color="success"
                                    onClick={() => this.onRadioBtnClick(true)}
                                    active={this.state.radioSelected === true}
                                >
                                    Yes
                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => this.onRadioBtnClick(false)}
                                    active={this.state.radioSelected === false}
                                >
                                    No
                </Button>
                            </ButtonGroup>
                        </div>
                        <button
                            disabled={!this.state.quote}
                            className="btn btn-primary"
                            onClick={this.handleOnClickAddQuoteButton}
                        >
                            Add Quote
            </button>
                    </div>
                    <section className="quote-container w-75">
                        {this.props.quotes.map(eachquote => (
                            <div
                                key={eachquote.id}
                                className="card text-white bg-danger mb-3"
                            >
                                <div className="card-body">
                                    <h5 className="card-title">Quote</h5>
                                    <p>{eachquote.quote}</p>
                                    <p>{eachquote.author}</p>
                                    <a
                                        href="#"
                                        className="btn btn-primary mb-2"
                                        onClick={() => {
                                            this.props.history.push(`/My_Quotes/${eachquote.id}/edit`)
                                        }}
                                    >
                                        Edit
                  </a>
                                    <a
                                        href="#"
                                        className="btn btn-warning"
                                        onClick={() => this.props.deleteQuote(eachquote)}
                                    >
                                        Delete
                  </a>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        )
    }
}


//TODO: Extra Code to copy from above--------DELETE TO HERE