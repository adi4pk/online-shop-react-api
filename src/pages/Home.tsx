import { AuthResponse } from "@/models/AuthResponse";
import { login } from "@/services/apiService";

function Home(){

    login<AuthResponse>({email: "admin@shop.com", password: "admin1234"});

    return(
        <>

        </>
    )

    


    
}

export default Home;