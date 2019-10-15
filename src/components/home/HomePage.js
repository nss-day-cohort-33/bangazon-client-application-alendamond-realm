import React, { useEffect, useState, useRef } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from 'react-router-dom'

// This creates
const HomePage = props => {
    const [products, setProducts] = useState([])
    const city = useRef()

    const getQuantity = () => {
        fetch(`http://localhost:8000/products?quantity=20`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then((response) => {
            setProducts(response.reverse())
        })
    }
    const searchProducts = (e) => {
        if (e.keyCode === 13) {
            let input = city.current.value
            input = input.charAt(0).toUpperCase() + input.slice(1)
            fetch(`http://localhost:8000/products?city=${input}`, {
                "method": "GET",
                "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then((response) => {
                setProducts(response.reverse())
            })
        }
    }

 useEffect(getQuantity, [])

 return (
    <>
        <h1> Welcome to Bangazon</h1>
        <h4> Here are some of our new items</h4>
        <input onKeyDown={(e) => searchProducts(e)} type="text" name="city" ref={city} placeholder="Search by city" />
        {/* <button onClick={(e) => searchProducts(e)}>Search</button> */}
        <br /><br />
        {
        products.map(item =>{
            console.log(item)
            return(<div key={item.id} className={`productId-${item.id}`}>
                <Link className="nav-link" to={`/products/${item.id}`}>
                <p>{item.name}</p>
                </Link>
                </div>
                )
        })
        }
    </>
 )
}
export default HomePage
