import { Route } from "react-router-dom"
import React,  { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import APIManager from "../modules/APIManager"
import ProductTypes from "./home/ProductTypes"
// import MyItinerary from "./home/MyItinerary"
import ProductDetail from "./ProductDetail"


const ApplicationViews = () => {


    const [productsList, setProductsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [paymentTypesList, setPaymentTypesList] = useState([])
    const [customersList, setCustomersList] = useState([])
    const [productTypesList, setProductTypesList] = useState([])
    const [ordersProductsList, setOrdersProductsList] = useState([])

    const getProducts= () => {
        APIManager.getAll("products")
        .then(setProductsList)
    }

    // const getOrders= () => {
    //     APIManager.getAll("orders")
    //     .then(response => response.json())
    //     .then(setOrdersList)
    // }

    // const getCustomers= () => {
    //     APIManager.getAll("customers")
    //     .then(response => response.json())
    //     .then(setCustomersList)
    // }

    const getProductTypes= () => {
        APIManager.getAll("producttypes")
        .then(setProductTypesList)
    }

    // const getPaymentTypes= () => {
    //     APIManager.getAll("paymenttypes")
    //     .then(response => response.json())
    //     .then(setPaymentTypesList)
    // }

    // const getOrderProducts= () => {
    //     APIManager.getAll("ordersproducts")
    //     .then(response => response.json())
    //     .then(setOrdersProductsList)
    // }



    useEffect(() => {
        getProducts()
        // getOrders()
        // getCustomers()
        getProductTypes()
        // getPaymentTypes()
        // getOrderProducts()
    }, [])

    return (
        <React.Fragment>

            {/* <Route
                exact path="/" render={props => {
                    return <ParkExplorer {...props} />
                }}
            /> */}

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />
            {/* <Route
                path="/orders" render={props => {
                    return <Orders {...props}  ordersList={ordersList} />
                }}
            /> */}

            <Route
                path="/products" render={props => {
                    return (
                        <>
                            {/* <h1>Product Types</h1> */}
                            <ProductTypes {...props} productTypesList={productTypesList} productsList={productsList} />
                        </>
                    )
                }}
            />

            <Route
                path="/products/:id" render={props => {
                    return (
                        <>
                            {/* <h1>Product</h1> */}
                            <ProductDetail {...props}  productsList={productsList} />
                        </>
                    )
                }}
            />

            {/* <Route
                path="/paymenttypes" render={props => {
                    return <Login {...props}  paymentTypesList={paymentTypesList} />
                }}
            />
            <Route
                path="/customers" render={props => {
                    return <Login {...props}  customersList={customersList} />
                }}
            />

            <Route
                path="/producttypes" render={props => {
                    return <Login {...props}  productTypesList={productTypesList} />
                }}
            />

            <Route
                path="/ordersproducts" render={props => {
                    return <Login {...props}  ordersProductsList={ordersProductsList} />
                }}
            /> */}

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)