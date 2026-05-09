import { Link } from "react-router-dom";

function AccountSidebar() {
  return (
    <>
      <div className="account-sidebar">
        <Link to={"/account/orders"}>&#128230; Comenzile mele</Link>
        <Link to={"/account/profile"}>&#9786; Profil</Link>
        <Link to={"/account/addresses"}>&#127968; Adrese</Link>
        <Link to={"/login"} id="logout-link">
          &#10140; Deconectare
        </Link>
      </div>
    </>
  );
}


export default AccountSidebar;