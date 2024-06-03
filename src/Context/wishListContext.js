import axios from "axios";
import { createContext } from "react";




export let WishList = createContext()
export default function WishListProvider (props){
    let baseUrl = `https://final-pro-api-j1v7.onrender.com`
    let userToken = localStorage.getItem('token')
    let headers = {
        token:userToken
    }
function addProductToWishList (id){
    return axios.patch(`${baseUrl}/api/v1/wishlist`,{
        product:id
    },
    {
        headers
    }
)
.then((response)=>response)
.catch((error)=>error)

}


function getLoggedUserWishList (){
    return axios.get(`${baseUrl}/api/v1/wishlist`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
}


function removeProductFromWishList (id){
    return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
}





return <WishList.Provider value={{addProductToWishList,getLoggedUserWishList,removeProductFromWishList}}>
    {props.children}
</WishList.Provider>

}