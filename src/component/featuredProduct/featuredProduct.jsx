import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { WishList } from "../../Context/wishListContext";


export default function FeaturedProduct() {
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
  // console.log(response);
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

  let nav = useNavigate();
  function navigateToProduct() {
    nav("/product");
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "white",
          color: "#000",
          top: "-10%",
          zIndex: "100000",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "white",
          color: "#000",
          top: "-10%",
          left: "95%",
          zIndex: "100000",
        }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let baseUrl = `https://final-pro-api-j1v7.onrender.com`;
  // let [productsList, setProducts] = useState([]);
  // let [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  // async function getAllProducts() {
  //   setIsLoading(true);
  //   let { data } = await axios.get(`${baseUrl}/api/v1/product`);
  //   setProducts(data.product);
  //   setIsLoading(false);
  // }

  function getFeaturedProducts() {
    return axios.get(`${baseUrl}/api/v1/product`);
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "featuredProduct",
    getFeaturedProducts
  );

  return (
    <>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#DB4444"
            secondaryColor="#DB4444"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container">
          <div className="row my-5 g-4">
            <div>
              <h2 className="make-squre h3 fw-bolder text-main d-flex">
                Our Product
              </h2>
              <h3 className="h2 text-black fw-bold">Explore Our Products</h3>
            </div>

            <div className="slider-container product-slider-container ">
              <Slider {...settings}>
                {data?.data.product.map((product) => {
                  return (
                    <div key={product._id} className="col-md-3">
                      
                        <div className="product py-2 px-3 cursor-pointer card m-2 product-item ">
                        <Link to={`/productDetailes/${product._id}`}>
                          <img
                            src={product.imgCover}
                            className="card-img-top"
                            alt={product.title}
                            height={180}
                          />
                          <div className="card-body">
                          <h3 className="h6 card-title">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                            {/* split to convert into array ,slice to cut The first two words ,join to conver into staing agian */}
                          </h3>
                          <div className="d-flex justify-content-between mt-3">
                            <span className="text-main">{product.price}EGP</span>
                            <span>
                              {product.rateAvg}
                              <i className="fa-solid fa-star rating-color"></i>
                            </span>
                         
                          </div>
                         
                         
                          </div>
                          </Link>

                          <div onClick={()=>addProductWishList(product._id)} class="con-like ms-auto">
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

                          <button onClick={()=>addProductToCart(product._id)} className="btn bg-main text-white w-100 btn-sm mt-3">
                            Add to cart
                          </button>
                        </div>
                    </div>
                  );
                })}

              </Slider>
              <button
                onClick={() => navigateToProduct()}
                className="btn bg-main text-white d-block m-auto p-2 translate "
              >
                View All Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
