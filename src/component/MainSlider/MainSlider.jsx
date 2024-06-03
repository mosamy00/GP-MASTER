import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img0 from "../../assites/WhatsApp Image 2024-04-26 at 5.02.12 PM.jpeg";
import img1 from "../../assites/WhatsApp Image 2024-04-26 at 5.02.36 PM.jpeg";
import img2 from "../../assites/WhatsApp Image 2024-04-26 at 5.02.47 PM.jpeg";
import img3 from "../../assites/WhatsApp Image 2024-04-26 at 5.03.00 PM.jpeg";
import img4 from "../../assites/WhatsApp Image 2024-04-26 at 5.03.06 PM.jpeg";
export default function MainSlider() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <div className="container py-3">
      <Carousel responsive={responsive}>
  <img src={img0} alt="" className="w-100 p-2 cursor-pointer " />
  <img src={img1} alt="" className="w-100 p-2 cursor-pointer"/>
  <img src={img2} alt="" className="w-100 p-2 cursor-pointer"/>
  <img src={img3} alt="" className="w-100 p-2 cursor-pointer"/>
  <img src={img4} alt="" className="w-100 p-2 cursor-pointer"/>
  <img src={img0} alt="" className="w-100 p-2 cursor-pointer"/>
  <img src={img1} alt="" className="w-100 p-2 cursor-pointer"/>
</Carousel>

      </div>
    </>
  );
}
