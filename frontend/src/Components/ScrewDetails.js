import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import {getScrewDetails} from '../Services/Actions/screwAction'
import { addToCart } from '../Services/Actions/cartAction';

const ScrewDetails = () => {
  const dispatch = useDispatch();
  let {_id} = useParams() 
 
  useEffect(()=>{
    dispatch(getScrewDetails(_id))
  },[dispatch])

  const {screw, loading, error} = useSelector((state)=> state.screwdetails)


  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 10; 


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
      Description: product.description,
      Standard:product.Standard,
      Certification:product.certification,
      Brand:product.brand,
      Price: 10,
      Quantity: quantity,
    };
    dispatch(addToCart(cartItem));
    alert(`You added ${quantity} ${product.name} to the cart`);
  };
  console.log(screw.screw);
  let product = screw.screw;
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
        <p>Price for {quantity} quantity: ${quantity * pricePerItem}</p>
        
      </div>
    </div>
  <div class="column">
  <h2>Description</h2>
  {
    product &&<>
    <div><span>Item No : </span><span>{product.partNo}</span> </div><hr/>
    <div><span>Screw Type : </span><span>{product.screwType}</span> </div><hr/>
    <div><span>Description : </span><span>{product.description}</span> </div><hr/>
    <div><span>Length : </span><span>{product.length} mm</span> </div><hr/>
    <div><span>Thread Size : </span><span>{product.threadSize} mm</span> </div><hr/>
    <div><span>Material : </span><span>{product.material}</span> </div><hr/>
    <div><span>CertificationStatus : </span><span>{product.certification}</span> </div><hr/>
    <div><span>SurfaceFinish : </span><span>{product.surfaceFinish}</span> </div><hr/>
    <div><span>Standard : </span><span>{product.industryStandard}</span> </div><hr/>
    <div><span>Rating : </span><span>{product.rating}</span> </div><hr/>
    <div><span>Brand : </span><span>{product.brand}</span> </div><hr/>
    </>
  }
 

   
  </div>
</div>
  )
}




export default ScrewDetails