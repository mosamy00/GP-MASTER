import React, { useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
export default function Brands() {
const baseUrl = `https://final-pro-api-j1v7.onrender.com`
const [brandsList, setbrandsList] = useState(null)
const [loading, setloading] = useState(false)

async function getAllBrands (){
  setloading(true)
  let {data} = await axios.get(`${baseUrl}/api/v1/brand`)
  setbrandsList(data)
  setloading(false)
}
useEffect(()=>{
  getAllBrands()
},[])
  return (
    <>
    {loading?    <div className="position-fixed d-flex align-items-center justify-content-center top-0 start-0 bottom-0 end-0 z-3">
    <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
    </div>:""}

    {brandsList?<div className="py-2">
      <div className="text-center m-3">
        <h2 className="text-main fw-bolder">
          All Brands
        </h2>
      </div>
      <div className="row g-4">
        {brandsList.brand.map((brand)=>{
          return <div key={brand._id} className="col-md-4">
            <div className="card">
              <div className="card-img cursor-pointer">
              <img className="w-100" src={brand.logo} alt={brand.name} height={250} />
              </div>
              <div className="card-body">
              <p className="text-main text-center fw-bolder">{brand.name}</p>
              </div>
            </div>
          </div>
        })}
      </div>
    </div> :""}

    </>
  );
}
