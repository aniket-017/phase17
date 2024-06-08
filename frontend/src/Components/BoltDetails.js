import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import {getBoltDetails} from '../Services/Actions/boltAction';

const BoltDetails = () => {
  const dispatch = useDispatch();
  let {_id} = useParams() 
 
  useEffect(()=>{
    dispatch(getBoltDetails(_id))
  },[dispatch])

  const {bolt, loading, error} = useSelector((state)=> state.boltdetails)
// console.log(bolt);
  let product = bolt.bolt;
  
  console.log(product);
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
          
          {/* <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleAddToCart}>Add to Cart</button> */}
        </div>
        {/* <p>Price for {quantity} quantity: ${quantity * pricePerItem}</p> */}
        
      </div>
    </div>
  <div class="column">
  <h2>Description</h2>
  {
    product &&<>
    <div><span>Item No : </span><span>{product.partNo}</span> </div><hr/>
    <div><span>Bolt Type : </span><span>{product.boltType}</span> </div><hr/>
    <div><span>Description : </span><span>{product.description}</span> </div><hr/>
    <div><span>Length : </span><span>{product.length} mm</span> </div><hr/>
    {/* <div><span>Width : </span><span>{product.width} mm</span> </div><hr/> */}
    {/* <div><span>Thickness : </span><span>{product.thickness} mm</span> </div><hr/> */}
    <div><span>Thread Size : </span><span>{product.threadSize} mm</span> </div><hr/>
    <div><span>Material : </span><span>{product.material}</span> </div><hr/>
    <div><span>CertificationStatus : </span><span>{product.certification}</span> </div><hr/>
    <div><span>SurfaceFinish : </span><span>{product.surfaceFinish}</span> </div><hr/>
    <div><span>Standard : </span><span>{product.industryStandard}</span> </div><hr/>
    {/* <div><span>Rating : </span><span>{product.rating}</span> </div><hr/> */}
    <div><span>Grade : </span><span>{product.grade}</span> </div><hr/>
    {/* <div><span>Usage : </span><span>{product.usage}</span> </div><hr/> */}
    <div><span>Brand : </span><span>{product.brand}</span> </div><hr/>
    </>
  }
 

   
  </div>
</div>
  )
}

export default BoltDetails