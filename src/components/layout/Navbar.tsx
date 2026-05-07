import { Link } from "react-router-dom"

function Navbar (){
    return(
        <>
            <nav className="navbar">
                      <div className="navbar-inner">
                        <Link to={"/ProductsPage"} className="navbar-brand">
                          <div className="brand-icon">S</div> OnlineShop
                        </Link>
                        <ul className="navbar-links">
                          <li>
                            <Link to={'/ProductsPage'} className="active">
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
                            <div className="user-avatar">AP</div> Andrei P.
                          </Link>
                        </div>
                      </div>
                    </nav>
        </>
    )
}

export default Navbar; 