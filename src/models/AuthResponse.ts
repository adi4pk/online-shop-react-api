export interface AuthResponse{
    accesToken: string;
    refreshToken: string;
    email: string;
    permissions: string[];

}