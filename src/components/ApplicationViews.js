import { Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import OrderList from "./orders/Orders"
import CustomerProfile from "./profile/Profile"
import AddPaymentTypes from "./paymenttypes/AddPaymentTypes"
import DeletePaymentTypes from "./paymenttypes/DeletePaymentTypes"
import HomePage from "./home/HomePage"
import APIManager from "../modules/APIManager"
import ProductTypes from "./home/ProductTypes"
import ProductTypeDetails from "./home/ProductTypeDetails"
import ProductDetail from "./Products/ProductDetail"
import SellProductForm from "./Products/SellProductForm"
import MyProducts from "./Products/MyProducts"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
    const { isAuthenticated } = useSimpleAuth()

    const [productsList, setProductsList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [paymentTypesList, setPaymentTypesList] = useState([])
    const [customersList, setCustomersList] = useState([])
    const [productTypesList, setProductTypesList] = useState([])
    const [ordersProductsList, setOrdersProductsList] = useState([])

    const getProducts = () => {
        APIManager.getAll("products")
            .then(setProductsList)
    }

    const getProductTypes = () => {
        APIManager.getAll("producttypes")
            .then(setProductTypesList)
    }

    useEffect(() => {
        getProducts()
        getProductTypes()
    }, [])

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

            <Route
                exact path="/addpayment" render={props => {
                    if(isAuthenticated()) return(
                    <AddPaymentTypes {...props} />
                    )
                    else return <Redirect to="/login"/>
                }}
            />

            <Route
                exact path="/deletepayment" render={props => {
                    return <DeletePaymentTypes {...props} />
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

            <Route
                path="/orders" render={props => {
                    if(isAuthenticated()) return (
                        <>
                            <OrderList {...props} />
                        </>
                    )
                    else return <Redirect to="/login"/>
                }}
            />

            <Route
                exact path="/myproducts" render={props => {
                    return <MyProducts {...props}  />
                }}
            />
            <Route
                exact path="/products" render={props => {
                    return <ProductTypes {...props} productTypesList={productTypesList} productsList={productsList} getProductTypes={getProductTypes} getProducts={getProducts} />
                }}
            />

            <Route
                exact path="/productlist/:productTypeId(\d+)" render={props => {
                    return <ProductTypeDetails {...props} productTypesList={productTypesList} productsList={productsList} getProductTypes={getProductTypes} getProducts={getProducts} />
                }}
            />


            <Route
                path="/myaccount" render={props => {
                    if(isAuthenticated())  return (
                        <>
                            <h1>My Account</h1>
                            <CustomerProfile {...props} />
                        </>
                    )
                    else return <Redirect to="/login"/>
                }}
            />


            {/* <Route
                path="/ordersproducts" render={props => {
                    return <OrderProducts {...props}  ordersProductsList={ordersProductsList} />
                }}
            /> */}


            <Route exact path="/products/:productId(\d+)" render={(props) => {
                return <ProductDetail  {...props} />
            }}
            />

            <Route exact path="/products/sell" render={(props) => {
                if(isAuthenticated()) return (
                <SellProductForm  {...props}  />
                )
                else return <Redirect to="/login"/>
            }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)