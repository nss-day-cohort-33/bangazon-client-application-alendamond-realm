import { Route } from "react-router-dom"
import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import APIManager from "../modules/APIManager"
import ProductTypes from "./home/ProductTypes"
// import MyItinerary from "./home/MyItinerary"


const ApplicationViews = () => {

    const [productTypeList, setProductTypeList] = useState([])

    const getProductTypes = () => {
        // Fetch data from localhost:8000/itineraryitems
        APIManager.getAll("producttypes")
        // Store itinerary items in state variable
        .then(setProductTypeList)
    }

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
                path="/products" render={props => {
                    return (
                        <>
                            {/* <h1>Product Types</h1> */}
                            <ProductTypes {...props} getProductTypes={getProductTypes} productTypeList={productTypeList} />
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
                path="/myitinerary" render={props => {
                    return (
                        <>
                            <h1>Itinerary</h1>
                            <img className="swings" src={require('./home/swings.jpeg')} alt="My Dog" />
                            <MyItinerary {...props} />
                        </>
                    )
                }}
            /> */}

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)