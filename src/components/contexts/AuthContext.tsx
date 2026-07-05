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

interface AuthContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    loginnn:(body: LoginRequest) => Promise<void>;
    logouttt:() => void;
    registerrr:(body: RegisterRequest)=> Promise<void>;
    authReady: boolean;
    hasPermission?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: (user: User | null) =>{},
    loginnn: async () => {},
    logouttt:() => {},
    registerrr: async()=> {},
    authReady: false,
    // hasPermission: false,
})


interface AuthProviderProps{
    children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProps){

    const [user, setUser] = useState<User | null>(null);    
    const [authReady, setAuthReady] = useState(false);
    // authReady prevents ProtectedRoute from making the WRONG decision
    // before AuthProvider finishes restoring the session.



    let toast = useToast();

    useEffect(() =>{

        const token = getAccessToken();     //user is initially null but token is still stored locally.

        if (token){
            const payload = decodeJwt(token);

            setUser({
                email: payload.sub,
                hasPermissions: true,
            })
        }

        setAuthReady(true);     // makes the component re-render 
        // --> user is now !=null and the value will be grabbed by Public/Private Route
    }, [])

    

    async function registerrr (body: RegisterRequest) {

        const response = await register(body);
        toast.show({type: "success", title: "Registration successful", message: "Your account has been created."})

        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;

        if(response){
            setUser({email: response.email, hasPermissions: true});
                    saveTokens(accessToken, refreshToken);

        }

        
    }

    
    async function loginnn (body: LoginRequest) {

        const [response] = await Promise.all([login(body),
        new Promise((resolve) => setTimeout(resolve, 1200))
      ]);

      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;

      
      
      if(response){
        setUser({email: response.email, hasPermissions: true})
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