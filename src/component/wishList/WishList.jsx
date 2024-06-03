import React, { useContext, useEffect, useState } from 'react'
import { WishList } from './../../Context/wishListContext';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export default function WishLista() {



  let {getLoggedUserWishList,removeProductFromWishList} = useContext(WishList)
  let {addToCart,setCartCount} =useContext(CartContext)

  const [productWishList, setproductWishList] = useState(null)
  const [loading, setloading] = useState(false)
  async function getData (){
    setloading(true)
    let {data} = await getLoggedUserWishList()
    setproductWishList(data)
    setloading(false)
    // console.log(data);
  }
  async function removeProduct (id){
    // setloading(true)
    let {data} = await removeProductFromWishList(id)
    console.log(data);
    setproductWishList(data)
    // setcartCount(data.NumberOfCart)

    // setloading(false)
  }
 
  async function addProductToCart (id){
    let response = await  addToCart(id)
    console.log(response);
    if (response.data.message === 'success')
    {
      setCartCount(response.data.NumberOfCart)
      toast.success('product added successfully')
    }
    else
    {
      toast.error("This didn't work.")
    }
    }


  useEffect(()=>{
    getData()
  },[])


return <>
{loading?<div class="heartbeatloader">
            <svg class="svgdraw" width="100%" height="100%" viewBox="0 0 150 400" xmlns="http://www.w3.org/2000/svg">
                <path class="path" d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0" fill="transparent" stroke-width="4" stroke="black"></path>
            </svg>
            <div class="innercircle"></div>
            <div class="outercircle"></div>
        </div>
    :""}
  {productWishList? <div className="container mt-2 bg-main-light py-2 p-3">
    <div className="py-2 border-bottom">
    <h2 className=" h3 text-main text-center  fw-bolder">My Wish List</h2>
    <h3 className="h5   fw-bolder text-main mt-3">Numper of Items: {productWishList.wishlistItem}</h3>
  </div>
  {productWishList.wishlist.map((product)=>{
    return <div key={product._id} className="row align-items-center p-2  border-bottom hover-cart">
      <div className="col-md-2">
        <img src={product.imgCover} className="w-100" alt={product.title} />
      </div>
      <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center ">
          <div>
            <h4 className="h6 fw-bold">{product.title}</h4>
            <p className="text-main fw-bolder">{product.price} EGP</p>
           
            <button onClick={()=>removeProduct(product._id)} class="btn-custom">
  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
           </button>
          </div>
          <div>
          <button onClick={()=>addProductToCart(product._id)} class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text-1 m-1">Add to Cart</p>
</button>          </div>
        </div>
      </div>
    </div>
  })}
  </div>: <div className="py-5 p-3">
    <div className="py-5 bg-main-light">
       <h3 className=" h3 text-main text-center  fw-bolder">My Wish List</h3>
       </div>
  </div> }
  </>
}
