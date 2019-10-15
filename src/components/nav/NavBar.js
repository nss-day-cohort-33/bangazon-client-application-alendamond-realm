import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow navbar1">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                </li>

                {
                    isAuthenticated() ?
                    <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/myproducts">My Products</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/myaccount">My Account</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link fakeLink logout-link"
                                onClick={() => {
                                    logout()
                                    props.history.push({
                                        pathname: "/"
                                    })
                                }
                                }
                            >Logout</button>
                        </li>
                        </> :
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>

                }
            </ul>
        </nav>
    )
}

export default NavBar