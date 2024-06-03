import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../../Context/cartContext";


export default function Navbar({userData,Logout}) {


let {cartCount} =useContext(CartContext)

return (<>



  <nav className="navbar navbar-expand-lg py-3 ">
    <div className="container-fluid">
<Link className="navbar-brand fw-bolder fs-3 text-main " to="home">فLa7za</Link>
<button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"  aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav m-auto mb-2 mb-lg-0 py-2">
    <li className="nav-item"><Link className="nav-link active text-nav fw-bold" aria-current="page" to="/">Home
  </Link>
    </li>
    <li className="nav-item">
  {/* <Link className="nav-link text-nav fw-bold"  aria-current="page" to="contact">Contact</Link> */}
  </li>
    <li className="nav-item">
  {/* <Link className="nav-link text-nav fw-bold"  aria-current="page" to="about">About</Link> */}
    </li>

  {/* chick user data show  the login button and add to cart icon */}
    {userData == null ?
      <>
      <li className="nav-item">
  <Link className="nav-link text-nav fw-bold" aria-current="page" to="signup"> Sign Up </Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link text-nav fw-bold " aria-current="page" to="signin"> signin</Link>
    </li>
      </>
    : <>
       <li className="nav-item">
  <Link className="nav-link text-nav fw-bold" aria-current="page" to="product"> Product </Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link text-nav fw-bold " aria-current="page" to="brand"> Brand</Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link text-nav fw-bold " aria-current="page" to="subCatigory"> Category</Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link text-nav fw-bold " aria-current="page" to="forYou"> forYou</Link>
    </li>
    
    </>}
  </ul>

  <ul className="align-items-center justify-content-center d-flex navbar-nav ms-auto mb-2 mb-lg-0">
    <li className="nav-item ">
  <form className="" role="search">
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
  </form>

    </li>
    <li className="nav-item mb-2 position-relative">
  <Link className="nav-link active  text-black  icon ms-3" aria-current="page" to="wishlist"> <CiHeart color="red" /> {""}</Link>
    </li>
    <li className="nav-item  mb-2 ">
  <Link className="nav-link active text-black icon position-relative me-2 " aria-current="page" to="cart" > 
  
  <CiShoppingCart color="blue" />{" "} 
  <span class="position-absolute top-0-cart start-100-cart translate-middle badge rounded-pill bg-danger fs-5">
    {cartCount}
  </span>
  
  </Link>
    </li>
{userData == null ? "":
        <li className="nav-item m-auto mx-2">
        <span onClick={Logout} className='nav-item  cursor-pointer'>
        <button class="Btn">
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>



        </span>
          </li>}
    
  </ul>
</div>
    </div>
  </nav>
    </>
  );
}
