import { Route } from "react-router-dom"
import React,  { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import APIManager from "../modules/APIManager"
import ProductTypes from "./home/ProductTypes"
import ProductTypeDetails from "./home/ProductTypeDetails"
import ProductDetail from "./Products/ProductDetail"
import SellProductForm from "./Products/SellProductForm"
import { get } from "https"


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

    const getProductTypes= () => {
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
                exact path="/products" render={props => {
                    return <ProductTypes {...props} productTypesList={productTypesList} productsList={productsList} getProductTypes={getProductTypes} getProducts={getProducts} />
                }}
            />

            <Route
                exact path="/productlist/:productTypeId(\d+)" render={props => {
                    return <ProductTypeDetails {...props} productTypesList={productTypesList} productsList={productsList} getProductTypes={getProductTypes} getProducts={getProducts} />
                }}
            />

            <Route exact path="/products/:productId(\d+)" render={(props) => {
                return <ProductDetail  {...props} />
            }}
            />

            <Route exact path="/products/sell" render={(props) => {
                return <SellProductForm  {...props} productTypesList={productTypesList} getProductTypes={getProductTypes} />
            }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)