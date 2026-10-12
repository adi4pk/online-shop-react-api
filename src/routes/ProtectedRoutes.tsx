import { useAuthContext } from "@/components/contexts/AuthContext";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


export function ProtectedRoute({ children }: { children: ReactElement }) {

    const { user, authReady } = useAuthContext();


    console.log(
        "ProtectedRoute",
        location.pathname,
        user
    );

    if (!authReady) {
        return null;
    }
    // authReady prevents ProtectedRoute from making the WRONG decision
    // before AuthProvider finishes restoring the session.


    if (user == null) {
        return <Navigate to="/login" replace />
        //if user NOT logged --> redirect to /login page
    }

    console.log("ProtectedRoute", user);

    return children;
}



export function PublicRoute({ children }: { children: ReactElement }) {

    const { user, authReady } = useAuthContext();
    console.log(
        "ProtectedRoute",
        location.pathname,
        user
    );

    
if (!authReady) {
        return null;
    }


    if (user) {
        return <Navigate to="/" replace />
        //if user is logged --> return to ProductsPage ("/") | do NOT go back to /login
    }

    console.log("PublicRoute", user);

    return children;
}