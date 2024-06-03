import React, { useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
export default function Subcatigory() {
  const baseUrl = `https://final-pro-api-j1v7.onrender.com`
  const [categoryList, setcategoryList] = useState(null)
  const [loading, setloading] = useState(false)
  async function getAllCategory (){
    setloading(true)
    let {data} = await axios.get(`${baseUrl}/api/v1/categories`)
    setcategoryList(data);
    setloading(false)
  }
  useEffect(()=>{
    getAllCategory()
  },[])
  return (
    <>
 {loading?    <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
    <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel='falling-lines-loading'
       />
  </div>:""}
    {categoryList? <div className="py-2">
    <div className="text-center m-3">
        <h2 className="text-main fw-bolder">
          All category
        </h2>
      </div>
    <div className="row py-4 g-4">
      {categoryList.categories.map((category)=>{
        return <div key={category._id} className="col-md-4">
          <div id="cardId" className="card cursor-pointer">
            <div className="card-img">
            <img height={300} src={category.image} alt={category.name} className="w-100"/>
            </div>
            <div className="card-body">
            <p className="h4 fw-bold text-success text-center">{category.name}</p>
            </div>
          </div>
        </div>
      })}
    </div>
    </div> :""}
    </>
  );
}
