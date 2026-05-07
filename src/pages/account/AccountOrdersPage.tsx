import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import MockupBar from "@/components/layout/Mockup";
import Footer from "@/components/layout/Footer";

function AccountOrdersPage(){

    return(
        <>
        <MockupBar></MockupBar>
        <Navbar></Navbar>        
        <button> 
                    <Link to={'/ProductsPage'}> Go BACK</Link>
                </button>
        <Footer></Footer>
        </>
    )


}



export default AccountOrdersPage;