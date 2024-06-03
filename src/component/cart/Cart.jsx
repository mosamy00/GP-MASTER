import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext';


export default function Cart({userData}) {
  let {getLoggedUserCart,removeCartItem,updateProductCount ,deleteCart,setCartCount} = useContext(CartContext)
  let [cartDetailes,setCartDetailes] = useState(null)
  let [isLoading,setIsLoading] = useState(false)
  async  function getCart() {
    setIsLoading(true)
   let {data} =  await getLoggedUserCart()
   setCartDetailes(data);
   setIsLoading(false)
  //  console.log(data);
  
  }

  async function removeItem (id){
   let {data} = await removeCartItem(id)
  //  console.log(data);
   setCartDetailes(data)
   setCartCount(data.NumberOfCart)
  //  console.log(cartDetailes);
  }

  async function updateCount (id,count){
   let {data} = await updateProductCount(id,count)
      // console.log(data);
   setCartDetailes(data)

  }

  async function removeCart(){
    setIsLoading(true)
   let {data} = await deleteCart()
   setCartDetailes(null)
   setIsLoading(false)
  }
  
  useEffect(()=>{
    getCart()
  },[])
  return <>
  {isLoading?<div className="w-100 py-5 d-flex justify-content-center align-items-center">
<div class="loader-container">
  <div class="loader"></div>
  <div class="loader-text">Loading...</div>
</div>
     </div>:null}
      <div className="container">
        {cartDetailes ?
        <div className='w-100 mx-auto p-2 my-2 bg-main-light'> 
        <h3 className='text-center text-main fw-bolder'>Shopping Cart</h3>
        <h4 className='h5 fw-bolder'>Cart Items: <span className='text-main'>{cartDetailes.cartItems}</span> </h4>
        <h4 className='h5 fw-bolder mb-4'>Total Cart Price: <span className='text-main'>{cartDetailes.cart.totalPrice}EGP</span> </h4>
        {cartDetailes.cart.cartItems.map((product)=>{
          return <div className='row border-bottom py-3 m-2 hover-cart ' key={product._id}>
            <div className="col-md-2 "><img src={product.product.imgCover} alt="" className='w-100' /></div>
            <div className="col-md-10 align-self-center">
              <div className='d-flex justify-content-between align-items-center pb-3'>
                <div>
                  <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                  <h6 className=''>{product.product.description.split(' ').slice(0,5).join(' ')}</h6>
                  <h6 className='text-main fw-bolder '>Price: {product.product.price}EGP</h6>
                </div>
                <div>
                  <button onClick={()=>updateCount(product._id,product.quantity+1)} class="button d-inline">
                    <i class="fa-solid fa-plus"></i>
                  </button>
             <span className='p-2 fw-bolder h4 '>{product.quantity}</span>
                   <button onClick={()=>updateCount(product._id,product.quantity-1)} class="button d-inline">
                     <i class="fa-solid fa-minus"></i>
                    </button>
                </div>
              </div>
              <button onClick={()=>removeItem(product._id)} class="button-0 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 14"
    class="svgIcon bin-top"
  >
    <g clip-path="url(#clip0_35_24)">
      <path
        fill="black"
        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 57"
    class="svgIcon bin-bottom"
  >
    <g clip-path="url(#clip0_35_22)">
      <path
        fill="black"
        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg>
              </button>

            </div>
          </div>
        })}
        <div class="del cursor-pointer m-auto ">
    <button onClick={()=>removeCart()}>
      Remove Cart 
    </button>     
</div>
		


        </div> 
       : 
<div className="container">
  <div className='w-100 mx-auto p-2 my-2 bg-main-light'>
  <h3 className='text-center text-main fw-bolder'>Shopping Cart</h3>
  <h3 className='text-center text-main fw-bolder'>your Cart is Empty</h3>
  </div>
     </div>
     }

        
      </div>
  </>
}
