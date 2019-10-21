import React, {useState, useEffect } from "react"


// Author Mary West
// Purpose - When user clicks on the detail button on the products list, they should see a detailed version
// of the product they selected

const ProductDetail = props => {

    const [singleProduct, setProduct] = useState([]);
    const [confirmation, setConfirmation] = useState("")

    const getSingleProduct = () => {
        fetch(`http://localhost:8000/products/${props.match.params.productId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(response => {
            setProduct(response);
          });
      };


    useEffect(() => {
        getSingleProduct()
    }, [])

    // Only need to send the product id to Django app. The rest of the process will be handled on the server side
    const addToOrder = () => {
        fetch(`http://localhost:8000/orders`, {
          "method": "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({product_id: singleProduct.id})
        })
        .then(() => {
            setConfirmation("Product added to cart")
            setTimeout(() => {
              setConfirmation("")
            }, 2000);
        })
      }

    return (
        <>
            {
              <section className="product-details">
                  <h3>{singleProduct.name}</h3>
                  <p>${singleProduct.price}</p>
                  <p>{singleProduct.description}</p>
                  <p>Quantity: {singleProduct.quantity - singleProduct.total_sold}</p>
                  <p>Average Rating: {singleProduct.average_rating}</p>
                  <br/>
                  <button onClick = {addToOrder}>Add Order</button>
                  <h4 className="orderConfirmation">{confirmation}</h4>
              </section>
            }
        </>
    )
}

export default ProductDetail