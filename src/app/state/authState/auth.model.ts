import { user } from "./user.model";

export interface IAuth{
    user: user | null;
}

export interface authResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}