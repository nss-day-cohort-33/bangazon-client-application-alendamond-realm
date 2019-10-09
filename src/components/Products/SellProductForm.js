import React, {useRef, useEffect, useState} from 'react';
import APIManager from "../../modules/APIManager"



const SellProductForm = props => {


  const [addProduct, setProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([]);



const name = useRef()
const price = useRef()
const description = useRef()
const quantity = useRef()
const product_type = useRef()
const city = useRef()

  const [productType, setProductType] = useState([])



const addToProducts = (e) => {
  console.log('Hi')
  e.preventDefault()
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
  APIManager.post("products", newProductInfo)
      .then(() => {
          props.history.push("/products")
      })
}

    const getProductTypes = () => {
      APIManager.getAll("producttypes")
          .then(setProductType)
  }



  useEffect(() => {
    getProductTypes()
}, [])


const getCategories = ()=> {
  APIManager.getAll("producttypes")
      .then((categoryList) => {
        setCategoryList(categoryList)
      })
}

useEffect(() => {
  getCategories()
}, []);

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