import { Route } from "react-router-dom"
import React,  { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import OrderList from "./home/Orders"
import APIManager from "../modules/APIManager"
import ProductDetail from "./ProductDetail"


const ApplicationViews = () => {


    const [productsList, setProductsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [paymentTypesList, setPaymentTypesList] = useState([])
    const [customersList, setCustomersList] = useState([])
    const [productTypesList, setProductTypesList] = useState([])
    const [ordersProductsList, setOrdersProductsList] = useState([])

    const getProducts= () => {
        APIManager.get("products")
        .then(response => response.json())
        .then(setProductsList)
    }

    const getOrders= () => {
        APIManager.getAll("orders")
        .then(response => response.json())
        .then(setOrdersList)
    }

    const getCustomers= () => {
        APIManager.getAll("customers")
        .then(response => response.json())
        .then(setCustomersList)
    }

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
        getProducts()
        getOrders()
        getCustomers()
        getProductTypes()
        getPaymentTypes()
        getOrderProducts()
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
            <Route
                path="/orders" render={props => {
                    return <Login {...props}  ordersList={ordersList} />
                }}
            />

            <Route
                path="/orders" render={props => {
                    return (
                        <>
                            <h1>Orders</h1>
                            <OrderList {...props} />
                        </>
                    )
                }}
            />

            {/* <Route
                path="/attractions" render={props => {
                    return (
                        <>
                            <h1>Attractions</h1>
                            <img className="swings" src={require('./home/swings.jpeg')} alt="My Dog" />
                        </>
                    )
                }}
            />


            <Route
                path="/ordersproducts" render={props => {
                    return <Login {...props}  ordersProductsList={ordersProductsList} />
                }}
            />


            <Route
                path="/products/:id" render={props => {
                    return (
                        <>
                            {/* <h1>Product</h1> */}
                            {/* <ProductDetail {...props}  productsList={productsList} />
                        </>
                    )
                }}
            />   */}

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)