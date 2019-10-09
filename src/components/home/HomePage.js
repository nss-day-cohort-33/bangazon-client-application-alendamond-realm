import React, { useEffect, useState } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from 'react-router-dom'

const HomePage = props => {
    const [products, setProducts] = useState([])

    const get20Products = ()=> {
        APIManager.getAll('products')
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
     products.slice(-20).map(item =>{
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
