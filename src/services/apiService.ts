import { AuthResponse } from "@/models/AuthResponse";
import { LoginRequest } from "@/models/LoginRequest";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const API_URL = "http://localhost:8082";

export async function login<T>(request :LoginRequest){

    let data = fetch(`${API_URL}/api/auth/login`,{
        method: "POST",
        body: JSON.stringify(request),
        headers:{
            "Content-Type" : "application/json; charset=utf-8",
            "X-Requested-With" : "XMLHttpRequest"
        }
    } )

    let response = (await data).json ;


    return response as T;

}