import axios from "axios";
import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";

export default function CategorySlider() {
  let baseUrl = `https://final-pro-api-j1v7.onrender.com`;
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" , right:'-60px' , color:'#000' }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" ,left:'-60px' ,color:'#000' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  function getAllCategory() {
    return axios.get(`${baseUrl}/api/v1/categories`);
  }
  let { data, isLoading } = useQuery("categorySlider", getAllCategory);
  
  // let photo = data?.data.categories
  // console.log(data?.data.categories);
  return (
    <>
      <div className="container mt-3">
        <h2 className="make-squre h4 fw-bolder text-main d-flex">Categories</h2>
      </div>
      <div className="py-4  ">
      {data?.data.categories ? (
        <div className="container py-4 bg-category rounded-4">
          <Slider {...settings} className="">
            {data?.data.categories.map((category) => (
       <div key={category._id}>
            <div class="image-container">
                <div class="image-background ">
             <img
                key={category._id}
                src={category.image}
                alt={category.name}
                className="w-100 cursor-pointer"
                height={100}
                // style={{ objectFit:"cover"}}
              />
                 </div>
             </div>
              <p className="text-main text-center fw-bolder mt-2">{category.name}</p>
       </div>
            ))}
          </Slider>   
        </div>
      ) : (
        ""
      )}
      </div>
    </>
  );
}
