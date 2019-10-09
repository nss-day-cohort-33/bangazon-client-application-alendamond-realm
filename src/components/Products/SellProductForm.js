import React, {useRef, useEffect, useState} from 'react';
import APIManager from "../../modules/APIManager"



const SellProductForm = props => {



const name = useRef()
const price = useRef()
const description = useRef()
const quantity = useRef()
const product_type = useRef()
const city = useRef()

  // const [productTypeList, setProductTypesList] = useState([])

  // const [name, setName] = useState("")
  // const [price, setPrice] = useState("")
  // const [description, setDescription] = useState("")
  // const [quantity, setQuantity] = useState("")
  const [productType, setProductType] = useState([])


//   const handleOnChangeName = event => {
//     setName(event.target.value)
// }

// const handleOnChangePrice = event => {
//   setPrice(event.target.value)
// }

// const handleOnChangeDescription = event => {
//   setDescription(event.target.value)
// }

// const handleOnChangeQuantity = event => {
//   setQuantity(event.target.value)
// }

// const handleOnChangeProductType = event => {
//   setProductType(event.target.value)
// }

// const handleOnClickAddProduct = () => {
//     if (name === "" || price === "" || description === "" || quantity === "" || productType === "") {
//         window.alert("Please fill in all fields")
//     } else {
//         const newProductInfo = {
//             name: name,
//             price: price,
//             description: description,
//             quantity: quantity,
//             productType: productType
//         }

//         APIManager.post("products", newProductInfo)
//                 .then((allTheItems) => {
//                     setProductType(allTheItems)
//                 })
//         }
//     }


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
      // .then(response => response.json())
      .then(() => {
          console.log("Added")
          props.history.push("/products")
      })
}

    const getProductTypes = () => {
      APIManager.getAll("producttypes")
          .then(setProductType)
  }



  useEffect(() => {
    getProductTypes()
    // console.log(productType)
}, [])



  return (
  <React.Fragment>
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
        type="text"
        name="name"
        ref={name}
        // value = {name}
        placeholder = "Name"
        // onChange={handleOnChangeName}
         />
        </div>
        <div>
        <label htmlFor="price">Price</label>
        <input
        type="text"
        name="price"
        ref={price}
        // value = {price}
        placeholder = "Price"
        // onChange={handleOnChangePrice}
         />
        </div>
        <div>
        <label htmlFor="description">Description</label>
        <input
        type="text"
        name="description"
        ref={description}
        // value = {description}
        placeholder = "description"
        // onChange={handleOnChangeDescription}
         />
        </div>
        <div>
        <label htmlFor="quantity">Quantity</label>
        <input
        type="number"
        name="quantity"
        ref={quantity}
        // value = {quantity}
        placeholder = "quantity"
        // onChange={handleOnChangeQuantity}
         />
         </div>
        <div>
        <label htmlFor="city">City</label>
        <input
        type="text"
        name="city"
        ref={city}
        // value = {quantity}
        placeholder = "city"
        // onChange={handleOnChangeQuantity}
         />
        </div>
        <div>
        <label htmlFor="product_type">Type</label>
        <select
        type="product_type"
        name="product_type"
        ref={product_type}
        // onChange={handleOnChangeProductType}
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