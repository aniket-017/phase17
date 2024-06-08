// Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import './Cart.css';
import 'jspdf-autotable';
import Logo from "../Layouts/Header/logo.png"

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);

  const userName = user.user.name ? user.user.name : "Guest";
  const userEmail = user.user.email ? user.user.email : "Guest Mail";


    

  const generateQuotation = () => {
    const doc = new jsPDF();

    // Set properties for the PDF
    doc.setFont('Helvetica-Oblique', 'normal');
    doc.setFontSize(14);

    // Add Logo
    const logoImg = new Image();
    logoImg.src = Logo; // Assuming Logo is the path to your logo image
    doc.addImage(logoImg, 'PNG', 140, 10, 40, 30); // Adjust the position and size as needed

    // Add Date
    const currentDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    doc.text(`Date: ${currentDate}`, 10, 50);

    doc.text(`To,`, 10, 60);
 
    doc.text(`${userName}`, 10, 65);
    doc.text(`${userEmail}`, 10, 70);
   
    
    // Add Address and Subject
//     To,
// karkhana.io
// Bendable Technology Solutions Pvt. Ltd.
// 103, Satellite Silver, A.K. Road, Andheri East, JB Nagar, Marol,
// Opp. Times Square, Marol Naka, Andheri (East)
    const address = `




Subject: Offer for supply of fabricated components
Our Ref: Your enquiry vide email dated ${currentDate}
Kind attention: ${userName}`;

    doc.text(address, 10, 60);

    // Add items table
    const startY = 140; // Adjust the starting Y position for the items table
    let totalPrice = 0;
    const tableHeaders = ['Sr. No', 'Description', 'Quantity', 'Price'];
    const tableData = cartItems.map((item, index) => {
      totalPrice += item.Price * item.Quantity;
      return [(index + 1).toString(), item.Description, item.Quantity.toString(), `₹ ${item.Price * item.Quantity}`];
    });

    doc.autoTable({
      startY,
      head: [tableHeaders],
      body: tableData,
      theme: 'plain',
      margin: { top: 20 },
      styles: { cellPadding: 1, fontSize: 10 },
    });

    // Add Total Cost
    const totalY = startY + (cartItems.length + 1) * 10; // Adjust for items + header row
    doc.text(`Total Cost: ₹ ${totalPrice}`, 10, totalY);

    // Add SCOPE OF WORK and other details
    const scopeOfWork = `
SCOPE OF WORK - Fabrication, packing, loading on vehicle.
Does not include: Any site erection / commissioning
Material summary: As specified
Terms and Conditions:                                
Taxes: GST extra as applicable
Price basis: EX-Works Pune
Payment terms: 50% advance balance against delivery
Insurance: As per INCO terms, LD clause: Not applicable, Retention: Not applicable   Inspection: As per the Quality Assurance Plan given by your QC Dept.                    
Delivery schedule: Within 8-10 weeks from the receipt of your firm Purchase Order and advance
We hope our offer covers the scope as required by you. We await your purchase order.

Yours sincerely,
For Four Power Corporation
Santosh Katkar - Partner`;

    doc.text(scopeOfWork, 10, totalY + 30);

    // Save the PDF with a unique name
    const fileName = `quotation_${new Date().toISOString()}.pdf`;
    doc.save(fileName);
};


  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <div className="item-details">
                    <span className="item-name">{item.Description}</span>
                    <span className="item-brand">Brand: {item.Brand}</span>
                    <span className="item-standard">Standard: {item.Standard}</span>
                    <span className="item-certification">Certification: {item.Certification}</span>
                  </div>
                  <div className="item-quantity-price">
                    <span className="item-quantity">Quantity: {item.Quantity}</span>
                    <span className="item-price">Price: ₹{item.Price * item.Quantity}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="generate-quotation-button" onClick={generateQuotation}>
            Generate Quotation
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
