import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";



type DialogProps = {
  onClose: () => void;
};


function Dialog({ onClose }: DialogProps){


    let {logouttt} = useAuthContext();

    
    return(
        <>

            <div className="modal-overlay-fog">
                <div className="modal-box">
                    <h2>Confirm Logout</h2>
                    <p>Are you sure you want to log out?</p>

                    <div className="modal-actions">
                        <button className="btn cancel"
                        onClick={onClose}
                        >Cancel</button>
                        <button className="btn confirm"
                        onClick={logouttt}
                        >Logout</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dialog;