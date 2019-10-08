import { Route } from "react-router-dom"
import React,  { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import APIManager from "../modules/APIManager"
import ProductDetail from "./Products/ProductDetail"


const ApplicationViews = () => {


    const [productsList, setProductsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [paymentTypesList, setPaymentTypesList] = useState([])
    const [customersList, setCustomersList] = useState([])
    const [productTypesList, setProductTypesList] = useState([])
    const [ordersProductsList, setOrdersProductsList] = useState([])

    // const getProducts= () => {
    //     APIManager.get("products")
    //     .then(response => response.json())
    //     .then(setProductsList)
    // }

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

<<<<<<< HEAD
    // const getProductTypes= () => {
    //     APIManager.getAll("producttypes")
    //     .then(response => response.json())
    //     .then(setProductTypesList)
    // }

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



    // useEffect(() => {
    //     getProducts()
    //     getOrders()
    //     getCustomers()
    //     getProductTypes()
    //     getPaymentTypes()
    //     getOrderProducts()
    // }, [])
=======
    const getProductTypes= () => {
        APIManager.getAll("producttypes")
        .then(response => response.json())
        .then(setProductTypesList)
    }

    const getPaymentTypes= () => {
        APIManager.getAll("paymenttypes")
        .then(response => response.json())
        .then(setPaymentTypesList)
    }

    const getOrderProducts= () => {
        APIManager.getAll("ordersproducts")
        .then(response => response.json())
        .then(setOrdersProductsList)
    }



    useEffect(() => {
        // getProducts()
        // getOrders()
        // getCustomers()
        // getProductTypes()
        // getPaymentTypes()
        // getOrderProducts()
    }, [])
>>>>>>> master

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

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
                    return <Order {...props}  ordersList={ordersList} />
                }}
            />

            <Route
                path="/paymenttypes" render={props => {
                    return <PaymentTypes {...props}  paymentTypesList={paymentTypesList} />
                }}
            />
            <Route
                path="/customers" render={props => {
                    return <Customers {...props}  customersList={customersList} />
                }}
            />

            <Route
                path="/producttypes" render={props => {
                    return <ProductTypes {...props}  productTypesList={productTypesList} />
                }}
            />


            <Route
                path="/ordersproducts" render={props => {
                    return <OrderProducts {...props}  ordersProductsList={ordersProductsList} />
                }}
            /> */}


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

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)