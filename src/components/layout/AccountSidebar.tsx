import { Link } from "react-router-dom";
import Dialog from "./Dialog";

import { useState } from "react";


function AccountSidebar() {


  const [isModal, setIsModal] = useState(false); 

  return (
    <>
      <div className="account-sidebar">

        {isModal && <Dialog onClose={() => setIsModal(false)} />}   {/* send the PROPS to child node */}
        <Link to={"/account/orders"}>&#128230; Comenzile mele</Link>
        <Link to={"/account/profile"}>&#9786; Profil</Link>
        <Link to={"/account/addresses"}>&#127968; Adrese</Link>
        <Link 
        // to={"/login"} id="logout-link"
        onClick={() => setIsModal(true)}
        >
          &#10140; DECONECTARE
        </Link>
      </div>
    </>
  );
}


export default AccountSidebar;