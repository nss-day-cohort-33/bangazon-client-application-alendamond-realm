import { Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { withRouter, Redirect } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Register from "./auth/Register"
import Login from "./auth/Login"
import OrderList from "./orders/Orders"
import OrderHistory from "./orders/OrderHistory"
import OrderDetails from "./orders/OrderDetails"
import CustomerProfile from "./profile/Profile"
import AddPaymentTypes from "./paymenttypes/AddPaymentTypes"
import DeletePaymentTypes from "./paymenttypes/DeletePaymentTypes"
import HomePage from "./home/HomePage"
import ProductTypes from "./productTypes/ProductTypes"
import ProductTypeDetails from "./productTypes/ProductTypeDetails"
import ProductDetail from "./Products/ProductDetail"
import SellProductForm from "./Products/SellProductForm"
import MyProducts from "./Products/MyProducts"
import EditMyProduct from "./Products/EditMyProduct"
import UpdateUser from "./profile/EditProfile"




const ApplicationViews = () => {
    const { isAuthenticated } = useSimpleAuth()

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
                exact path="/orders" render={props => {
                    if(isAuthenticated()) return (
                        <>
                            <OrderList {...props} />
                        </>
                    )
                    else return <Redirect to="/login"/>
                }}
            />
            <Route
                path="/orders/:orderId(\d+)" render={props => {
                    if (isAuthenticated()) {
                        return <OrderDetails {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/orderhistory" render={props => {
                    if (isAuthenticated()) {
                        return <OrderHistory {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                exact path="/myproducts" render={props => {
                    if (isAuthenticated()) {
                        return <MyProducts {...props}  />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />
            <Route
                path="/myproducts/:myproductId(\d+)" render={props => {
                    return (
                        <>
                            <EditMyProduct {...props} />
                        </>
                    )
                }}
            />

            <Route
                exact path="/products" render={props => {
                    return <ProductTypes {...props} />
                }}
            />

            <Route
                exact path="/productlist/:productTypeId(\d+)" render={props => {
                    return <ProductTypeDetails {...props} />
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


            <Route
                path="/editaccount" render={props => {
                    if(isAuthenticated())  return (
                        <>
                            <h1>Edit Account</h1>
                            <UpdateUser {...props} />
                        </>
                    )
                    else return <Redirect to="/login"/>
                }}
            />

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