import React, {useRef, useEffect, useState} from 'react';
import APIManager from "../../modules/APIManager"

// Author - Mary West
// Purpose - Seller is able to add Product to Product Page
// Methods - GET, POST

const SellProductForm = props => {

const name = useRef()
const price = useRef()
const description = useRef()
const quantity = useRef()
const product_type = useRef()
const city = useRef()

const [productType, setProductType] = useState([])


// function that adds a product to the products list on the products page
// this function is being called when you click the add to product button
const addToProducts = (e) => {
  e.preventDefault()
  // object that grabs all the values for new product
  const newProductInfo = {
    name: name.current.value,
    price: price.current.value,
    description: description.current.value,
    quantity: quantity.current.value,
    product_type_id: product_type.current.value,
    city: city.current.value,
    created_at: '',
    customer_id: localStorage.getItem( "customer_id" ),
    image: null

}
// post request from API manager that connects create method on server side to post on client side
  APIManager.post("products", newProductInfo)
      .then(() => {
          props.history.push("/products")
      })
}

// function gets all product types - we need to get all product types because we need to view all of them in our dropdown
    const getProductTypes = () => {
      APIManager.getAll("producttypes")
          .then(setProductType)
  }



  useEffect(() => {
    getProductTypes()
}, [])

// product form that shows in the browser that the user is able to fill out
// in the producttype drop down we have to map through productType and we will get the value of the producttype id
//when we select the producttype we want
  return (
    <React.Fragment>
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
        type="text"
        name="name"
        ref={name}
        placeholder = "Name"
         />
        </div>
        <div>
        <label htmlFor="price">Price</label>
        <input
        type="text"
        name="price"
        ref={price}
        placeholder = "Price"
         />
        </div>
        <div>
        <label htmlFor="description">Description</label>
        <input
        type="text"
        name="description"
        ref={description}
        placeholder = "description"
         />
        </div>
        <div>
        <label htmlFor="quantity">Quantity</label>
        <input
        type="number"
        name="quantity"
        ref={quantity}
        placeholder = "quantity"
         />
         </div>
        <div>
        <label htmlFor="city">City</label>
        <input
        type="text"
        name="city"
        ref={city}
        placeholder = "city"
         />
        </div>
        <div>
        <label htmlFor="product_type">Type</label>
        <select
        type="product_type"
        name="product_type"
        ref={product_type}
       >
        <option>Select Category</option>
        {
          productType.map(producttype => {
            return (
            <option key ={producttype.id} id = {producttype.id} value = {producttype.id}>
              {producttype.name}
            </option>
            )
          })
        }
        </select>
        </div>
      <button onClick={(e) => addToProducts(e)}>Add to product List</button>
    </form>
  </React.Fragment>
  )
}
export default SellProductForm;