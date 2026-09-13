import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

import { register } from "@/api/auth";
import { RegisterRequest } from "@/types/api";
import { useToast } from "@/lib/toast";
import { getAccessToken, saveTokens } from "@/api/tokenStorage";
import { User } from "@/models/User";

import { login } from "@/api/auth";
import { LoginRequest } from "@/types/api";
import { ClipLoader } from "react-spinners";

import { clearTokens } from "@/api/tokenStorage";
import { useEffect } from "react";
import { JwtPayload } from "@/api/tokenStorage";
import { decodeJwt } from "@/api/tokenStorage";

//INTERFATA Context
interface AuthContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    loginnn:(body: LoginRequest) => Promise<void>;
    logouttt:() => void;
    registerrr:(body: RegisterRequest)=> Promise<void>;
    authReady: boolean;
    // hasPermissions?: boolean;       // not needed
}

// VALORI de INITIERE
export const AuthContext = createContext<AuthContextType | null>(null);


//INTERFATA Children elements
interface AuthProviderProps{
    children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProps){

    const [user, setUser] = useState<User | null>(null);    
    const [authReady, setAuthReady] = useState(false);
    // authReady prevents ProtectedRoute from making the WRONG decision
    // before AuthProvider finishes restoring the session.


    const WRITE_PERMISSIONS = ["PRODUCT_WRITE", "PERMISSION_WRITE", "ORDER_DETAILS_WRITE",
        "USER_WRITE", "PERMISSION_READ", "ORDER_READ"];


    function buildUser(payload: JwtPayload) {
        return {
            email: payload.sub,
            hasPermissions: WRITE_PERMISSIONS.some(role => payload.authorities.includes(role)),
            // hasPermissions: payload.authorities ?? [],
        }
    }

    let toast = useToast();

    useEffect(() =>{

        const token = getAccessToken();     //user is initially null but token is still stored locally.

        if (token){
            try
            {
            const payload = decodeJwt(token);
            // aici parsam stringul token in --> obiect JwtPayload

            if (payload.exp * 1000 > Date.now()) {
                setUser(buildUser(payload));
            } else logouttt();

            
        } catch{
            // clearTokens();
            // setUser(null);
            logouttt();
        }
        }
            

        setAuthReady(true);     // makes the component re-render 
        // --> user is now !=null and the value will be grabbed by Public/Private Route
    }, [])

    

    async function registerrr (body: RegisterRequest) {

        try{            //??move try/catch to ---> component
             const response = await register(body);
        

        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;

        const payload = decodeJwt(accessToken);



        if(response){
            setUser(buildUser(payload));
            saveTokens(accessToken, refreshToken);

        }

        toast.show({ type: "success", title: "Registration successful", message: "Your account has been created." })
        } catch(e){
            toast.show({type: "error", title: "Registration failed", message: "something went wrong."})
            throw e;
        }
       

        
    }

    
    async function loginnn(body: LoginRequest) {

        const [response] = await Promise.all([login(body),
        new Promise((resolve) => setTimeout(resolve, 1200))
        ]);

        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;

        const payload = decodeJwt(accessToken);

        if (response) {
            setUser(buildUser(payload));
            saveTokens(accessToken, refreshToken);

        }
    }

    function logouttt(){

        setUser(null);
        clearTokens();
    }
    

    return(<AuthContext.Provider value={{user, setUser, registerrr, loginnn, logouttt, authReady }}>{children}</AuthContext.Provider>)
}

export function useAuthContext ():AuthContextType{


    const context = useContext(AuthContext);

    if(!context){
        throw new Error ("useAuthContext must be used inside Provider.")
    }

    return context;

}