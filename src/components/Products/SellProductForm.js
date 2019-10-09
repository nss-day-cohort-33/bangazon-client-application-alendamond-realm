import React, {useRef, useEffect, useState} from 'react';



const SellProductForm = props => {



const name = useRef()
const price = useRef()
const description = useRef()
const quantity = useRef()
const type = useRef()


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
        <label htmlFor="type">Type</label>
        <select
        type="text"
        name="type"
        ref={type}
        required />
        </div>
      <button onClick={addProduct}>Add to product List</button>
    </form>
  </React.Fragment>
  )
}
export default SellProductForm;