import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getScrews } from "../Services/Actions/screwAction";
import { getPlates } from "../Services/Actions/plateAction.js";
import { getBolts } from "../Services/Actions/boltAction.js";
import { useParams } from "react-router-dom";
import "./Products.css";
import { addToCart } from "../Services/Actions/cartAction";
import { Link } from "react-router-dom"; 

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  let { keyword } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [quantities, setQuantities] = useState({});

  

  
  useEffect(() => {
    dispatch(getPlates(keyword, currentPage));
    dispatch(getScrews(keyword, currentPage));
    dispatch(getBolts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    const positiveQuantity = newQuantity > 0 ? newQuantity : 0; // Ensure quantity is positive
    
    setQuantities({ ...quantities, [productId]: positiveQuantity });
  };
  

  
  const { screws } = useSelector((state) => state.screws);
  const { bolts } = useSelector((state) => state.bolts);
  const { plates } = useSelector((state) => state.plates);

  const filterTypeRedux = useSelector((state) => state.filter.filterType);
  let a;

  if (filterTypeRedux === "plates") {
    a = plates ? plates.plates : [];
  } else if (filterTypeRedux === "bolts") {
    a = bolts ? bolts.bolts : [];
  } else {
    a = screws ? screws.screws : [];
  }

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.partNo,
      Description: product.description,
      Standard: product.industryStandard,
      Certification: product.certification,
      Brand: product.brand,
      Price: 10, // You may need to adjust this based on the actual price of the product
      Quantity: quantities[product._id] || 0,
    };
    dispatch(addToCart(cartItem));
    alert(`You added ${quantities[product._id]} ${product.name} to the cart`);
  };
  

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Description</th>
            {/* <th>Brand</th> */}
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {a &&
            a.map((product, index) => (
              <tr key={index}>
                <td>
                  {/* <a href={`#${product.productNo}`}>{product.partNo}</a> */}
                  <Link to={`/products/${filterTypeRedux}/${product._id}`}>{product.partNo}</Link>

                </td>
                <td>{product.description}</td>
                {/* <td>{product.brand}</td> */}
                <td>
                <input
                  type="number"
                  id={`quantity_${product._id}`}
                  name={`quantity_${product._id}`}
                  value={quantities[product._id] || 0}
                  onChange={(event) => handleQuantityChange(event, product._id)}
                />
                </td>
                <td>
                <button onClick={() => handleAddToCart(product)}>RFQ</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;