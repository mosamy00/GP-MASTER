import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { WishList } from "../../Context/wishListContext";
export default function ProductDetailes() {
  let {addToCart,setCartCount} = useContext(CartContext)
  let {addProductToWishList} = useContext(WishList);

  async function addProductWishList (id){
    let {data} = await addProductToWishList(id)
    // console.log(data);

    if(data.message==='success'){
      toast.success('product added to wishList successfully')
    }else{
      toast.error("This didn't work.")
    }
  }


  async function addProductToCart (id){
   let response = await  addToCart(id)
  //  console.log(response);
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
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  let { id } = useParams();
  let baseUrl = `https://final-pro-api-j1v7.onrender.com`;

  function getProductDetailes(id) {
    return axios.get(`${baseUrl}/api/v1/product/${id}`);
  }

  let { data, isLoading } = useQuery("productDetailes", () =>
    getProductDetailes(id)
  );
  return ( <>
  {data?.data.product ? (
    <div className="container">
      <div className="row  align-items-center py-2">
        <div className="col-md-4">
          <Slider {...settings}>
            {data?.data.product.images.map((img) => (
              <img
                src={img}
                alt={data?.data.product.title}
                className="w-100 cursor-pointer"
                // height={300}
              />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2 className="h5 text-main fw-bolder">
            {data?.data.product.title}
          </h2>
          <h3 className="h4">{data?.data.product.description}</h3>
          <p className="h6 text-muted">{data?.data.product.description}</p>
          <div className="d-flex justify-content-between mt-3">
            <span>{data?.data.product.price}EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {data?.data.product.rateCount}
            </span>
          </div>


          <div onClick={()=>addProductWishList(id)} class="con-like me-auto mt-3">
  <input class="like" type="checkbox" title="Add TO WishList"/>
  <div class="checkmark">
    <svg xmlns="http://www.w3.org/2000/svg" class="outline" viewBox="0 0 24 24">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
      <polygon class="poly" points="10,10 20,20"></polygon>
      <polygon class="poly" points="10,50 20,50"></polygon>
      <polygon class="poly" points="20,80 30,70"></polygon>
      <polygon class="poly" points="90,10 80,20"></polygon>
      <polygon class="poly" points="90,50 80,50"></polygon>
      <polygon class="poly" points="80,80 70,70"></polygon>
    </svg>
  </div>
                          </div>







          <button onClick={()=>addProductToCart(id)} className="btn bg-main text-white w-100 mt-3 ">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  )}
  
    
    </>);
}
