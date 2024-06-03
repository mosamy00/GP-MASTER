import React from 'react'
import Navbar from '../navbar/Navbar.jsx'
import { Link, Outlet } from 'react-router-dom'
import Fotter from '../footer/Fotter.jsx'
import { Offline, Online } from "react-detect-offline";


export default function Layout({userData ,Logout}) {
  return <>

      {/* <div className="col-md-12 bg-black ">
                  <div className="container ">
                    <div className="row ">
                    <div className='d-flex align-items-center justify-content-center'>
                    <div className='m-auto'>
                  <p className='text-white text-center text-nav'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link className='text-white' to="home">ShopNow</Link></p>
                </div>
                <div className='text-white ms-auto'>
                  <p>English</p>
                </div>
                    </div>
                    </div>
                  </div>
              </div> */}
        <div className="col-md-12 nav-line">
          <div className="container ">
            <div className="row ">
            <div className="col-md-12 ">
            <Navbar  Logout={Logout} userData={userData}/>
            </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <Outlet/>
        </div>
        <div>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>
      <div className='network '>
        <i className='fas fa-wifi'></i> you are offline
      </div>

    </Offline>
  </div>
        <div className="col-md-12">
          <Fotter/>
        </div>

  </>
}
