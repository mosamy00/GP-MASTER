import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext();

export default function CartContextProvider(props){
    let [cartCount,setCartCount] = useState(0)
    let baseUrl = `https://final-pro-api-j1v7.onrender.com`
    let userToken = localStorage.getItem('token')
    let headers = {
        token:userToken
    }

    function getLoggedUserCart (){
        return  axios.get(`${baseUrl}/api/v1/cart`,{headers})
        .then((response)=>response).catch((error)=>error)
        
     }


     function addToCart (productId){
        return  axios.post(`${baseUrl}/api/v1/cart`,
         {
             product:productId
         },
         {
             headers
         }
     ).then((response)=>response).catch((error)=>error)
     
     }

     function removeCartItem (productId){
         return axios.delete(`${baseUrl}/api/v1/cart/${productId}`,{headers})
         .then((response)=>response)
         .catch((error)=>error)
     }
     
     function updateProductCount (id,count){
         return axios.put(`${baseUrl}/api/v1/cart/${id}`,
         {
             quantity:count
         }
         ,{headers})
         .then((response)=>response)
         .catch((error)=>error)
     
     }

     function deleteCart (){
         return axios.delete(`${baseUrl}//api/v1/cart`,{headers})
         .then((response)=>response)
         .catch((error)=>error)
     }


     useEffect(()=>{
        async function getdata(){
             let  {data} = await getLoggedUserCart()
             if(data?.message=='success'){
                setCartCount(data.cartItems);
             }else if(data?.message=='fail'){
                setCartCount(0);
             }
         }
         getdata()
     },[])

    return <CartContext.Provider value={{setCartCount,cartCount,addToCart,getLoggedUserCart,removeCartItem,updateProductCount,deleteCart}}>
        {props.children}
    </CartContext.Provider>

}  