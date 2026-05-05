import { useNavigate } from "react-router-dom";
import { Link

 } from "react-router-dom";
function CartPage(){


    return(
        <>
        <button> 
            <Link to={'/ProductsPage'}> Go BACK</Link>
        </button>
        </>
    )
}

export default CartPage;