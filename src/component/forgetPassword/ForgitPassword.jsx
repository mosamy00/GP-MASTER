import React, { useState } from 'react'
import img from '../../assites/a1c7dc5b68a42239311e510f54d8cd59.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';


export default function ForgitPassword() {


    
let [loding,setLoding]=useState(false)

let [errorMessage,setErrorMessage]=useState("")

const basurl = "https://la7za-ecommerce.onrender.com/"
let nav = useNavigate()



let validationSchema = Yup.object({
    email: Yup.string().email("enter valid email").required("Username Required").min(3, "min length 3"),
});

let registeform = useFormik({
    initialValues: {

    email: "",

    },
    onSubmit,
    validationSchema,
});


  async function onSubmit(valus){
    setLoding(true)
    let {data}=await axios.post(`${basurl}api/v1/auth/forgetPassword`,valus).catch((error)=>{
        setErrorMessage(error.response.data.error)
        
    setLoding(false)
    })
    setLoding(false)

    if(data.message == 'success'){
        nav('/veryfyResetCode')
    }


    
    }



    return <>
    
    <div className="container-fluid py-5">
    <div className="row">
    <div className="col-md-7">
        <img className='w-100' src={img} alt="" />
    </div>
    <div className="col-md-4 py-5 px-5 d-flex align-items-center justify-content-center">
        <div className='px-5'>
        <h2 >Log in to Exclusive</h2>
        <h3 className='fs-6'>Enter your details below</h3>
        {errorMessage == "" ? "":<div className="alert alert-danger">{errorMessage}</div>}
        <form className='py-3' onSubmit={registeform.handleSubmit} >

        <div className="my-3">
                    <input className="form-control form border-bottom border-1 border-dark custom-input" type="email" name="email" id="email" placeholder="Email" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                    {registeform.touched.email ?<p className="text-danger">{registeform.errors.email}</p> :""}
        </div>
        



        <div className='d-flex align-items-center justify-content-center'>
        {loding ?<button type='button' className='btn btn-danger w-100 m-auto d-block'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button disabled={!(registeform.isValid && registeform.dirty)} type="submit"className="btn btn-danger m-auto d-block w-100 my-3">send code</button>}  
        </div>
        </form>
        </div>
    </div>
    </div>
</div>
  </>

  

}
