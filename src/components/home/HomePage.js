import React, { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'

// This creates
const HomePage = props => {
    const [products, setProducts] = useState([])
    const city = useRef()


    const getQuantity = () => {
        fetch(`http://localhost:8000/products?quantity=20&order_by=created_at&direction=desc`, {
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
        <input onKeyDown={(e) => searchProducts(e)} className="search-bar" type="text" name="city" ref={city} placeholder="Search by city" />
        <br /><br />
        {products.length > 0 ?
            <div>
                {
                    products.map(item => {
                        return(<div key={item.id} className={`productId-${item.id}`}>
                            <Link className="nav-link" to={`/products/${item.id}`}>
                            <p>{item.name}</p>
                            </Link>
                            </div>
                            )
                        })
                }
            </div>
        :   <div>
                <p>Sorry, there are no products currently being sold here.</p>
            </div>}
    </>
 )
}
export default HomePage
