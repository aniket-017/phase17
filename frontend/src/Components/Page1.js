import React from 'react'
import Filters from "./Filters"
import Products from "./Products"
import Newfilter from "./Newfilters.jsx"
import "./Page1.css"
import Cart from "./Cart.js"

const Page1 = () => {
  return (
    <div className= 'pagecss'>

    <div className= 'sidebar'>
    <Filters />  {/* add filter on left sidebar */} 
    </div>

    <div className='products'>
    <Products />    {/* add products */}  
    </div>

    <div className= 'cartmain'> 
      <Cart /> 
    </div>

    </div>
  )
}

export default Page1



  


 