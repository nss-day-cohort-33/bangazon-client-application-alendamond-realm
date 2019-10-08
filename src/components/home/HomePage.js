import React, { useEffect, useState } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from 'react-router-dom'

const HomePage = props => {
    const [products, setProducts] = useState([])

    const get20Products = ()=> {
        APIManager.get20items("products")
            .then((productItem) => {
                setProducts(productItem)
            })
    }

 useEffect(get20Products, [])
 return (
     <>
     <h1> Welcome to Bangazon</h1>
     <h4> Here are some of our new items</h4>
     {
     products.map(item =>{
            return(<div key={item.id} className={`productId-${item.id}`}>
                 <p>{item.name}</p> <p>${item.price}</p>
                <Link className="nav-link" to={`/products/${item.id}`}>

                <p>Details</p>
                </Link>
                </div>
                )
        })
    }
     </>
 )
}
export default HomePage
