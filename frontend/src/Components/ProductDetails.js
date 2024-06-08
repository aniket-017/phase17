import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from '../Services/Actions/productAction';
import {useParams} from 'react-router-dom';
import { addToCart } from '../Services/Actions/cartAction';

const ProductDetails = () => {
  const dispatch = useDispatch();
  let {id} = useParams() 
useEffect(()=>{
  dispatch(getProductDetails(id))
},[dispatch,id])

const {product, loading, error} = useSelector((state)=> state.productdetails)
  // State to track the quantity and calculate the total price
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 10; // Change this to the actual price per item

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

//  console.log(product._);

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      Description: product.Description,
      Standard:product.SpecifiedStandard,
      Certification:product.CertificationStatus,
      Brand:product.Brand,
      Price: 10,
      Quantity: quantity,
    };
    dispatch(addToCart(cartItem));
    alert(`You added ${quantity} ${product.name} to the cart`);
  };

  return (
    <div className="row">
      <div className="column">
        <div className="imgsection">
          <img className="productimg" src="https://www.researchgate.net/publication/349966522/figure/fig2/AS:1000106832719873@1615455458133/3D-CAD-models-of-simplified-bottom-and-realistic-top-screws.png" />
        </div>
        <div className="ordersection">
          <h2>Order</h2>
          <div>
            <label htmlFor="quantity">Quantity: </label>
            
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
          {/* <p>Price for {quantity} quantity: ${quantity * pricePerItem}</p> */}
          
        </div>
      </div>
    <div class="column">
    <h2>Description</h2>
    <div><span>Item No : </span><span>{product.ItemNo}</span> </div>
    <hr/>
    <div><span>Description : </span><span>{product.Description}</span> </div><hr/>
    <div><span>Standard : </span><span>{product.standard}</span> </div><hr/>
    <div><span>SpecifiedStandard :</span><span>{product.SpecifiedStandard}</span> </div><hr/>
    <div><span>CertificationStatus : </span><span>{product.CertificationStatus}</span> </div><hr/>
    <div><span>SurfaceFinish : </span><span>{product.SurfaceFinish}</span> </div><hr/>
    <div><span>HotForge : </span><span>{product.HotForge}</span> </div><hr/>
    <div><span>ColdForge : </span><span>{product.ColdForge}</span> </div><hr/>
    <div><span>Shade : </span><span>{product.Shade}</span> </div><hr/>
    <div><span>CoatedMaterial : </span><span>{product.CoatedMaterial}</span> </div><hr/>
    <div><span>MildSteelGrade : </span><span>{product.MildSteelGrade}</span> </div><hr/>
    <div><span>AlloySteelGrade : </span><span>{product.AlloySteelGrade}</span> </div><hr/>
    <div><span>Brand : </span><span>{product.Brand}</span> </div><hr/>
    </div>
  </div>
  )
}

export default ProductDetails



