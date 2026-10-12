import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext";

import Dialog from "./Dialog";
import { useState } from "react";



function Navbar (){

  const {user} = useAuthContext();

  


    return(
        <>
            <nav className="navbar">
                      <div className="navbar-inner">
                        <Link to={"/products"} className="navbar-brand">
                          <div className="brand-icon">S</div> OnlineShop
                        </Link>
                        <ul className="navbar-links">
                          <li>
                            <Link to={'/products'} className="active">
                              Produse
                            </Link>
                          </li>
                          <li>
                            <Link to={'/cart'}
                            >Cos</Link>
                          </li>
                          <li>
                            <Link to={'/account/orders'}
                            // onClick={() => goToMyOrders()}
                            >Comenzile mele</Link>
                          </li>
                        </ul>
                        <div className="navbar-actions">
                          <Link to={'/cart'} className="cart-btn"
                          // onClick={() => goToCart()}
                          >
                            &#128722; Cos <span className="cart-badge">3</span>
                          </Link>
                          <Link to={'/account/profile'} className="user-menu">
                            <div className="user-avatar">AP</div> {user?.email}
                            
                          </Link>
                        </div>
                      </div>
                    </nav>
        </>
    )
}

export default Navbar; 