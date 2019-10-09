import React, {useRef, useEffect, useState} from 'react';
import APIManager from '../../modules/APIManager';



const SellProductForm = props => {


  const [addProduct, setProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([]);



const name = useRef()
const price = useRef()
const description = useRef()
const quantity = useRef()
const producttype_id = useRef()


const createProduct = newProduct => {
  return fetch("http://localhost:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(newProduct)
  }).then(res => res.json());

};

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
        required />
        </div>
        <div>
        <label htmlFor="price">Price</label>
        <input
        type="text"
        name="price"
        ref={price}
        required />
        </div>
        <div>
        <label htmlFor="description">Description</label>
        <input
        type="text"
        name="description"
        ref={description}
        required />
        </div>
        <div>
        <label htmlFor="quantity">Quantity</label>
        <input
        type="number"
        name="quantity"
        ref={quantity}
        required />
        </div>
        <div>
        <label htmlFor="producttype_id">Type</label>
        <select
        type="producttype_id"
        name="producttype_id"
        ref={producttype_id}
        required />
        </div>
      <button >Add to product List</button>
    </form>
  </React.Fragment>
  )
}
export default SellProductForm;