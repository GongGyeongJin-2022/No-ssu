import axios, {AxiosResponse} from "axios";
import {Token} from "@apis/atoms";

const PROTOCOL = "http://";
const AND_DEV_URL = PROTOCOL + "10.0.2.2:8000";
const IOS_DEV_URL = PROTOCOL +  "127.0.0.1:8000";
const URL = AND_DEV_URL;

export const postLogin = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
}

export const postRegistration = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/registration/`,
        body, {
            withCredentials: false
        },
    )
}

export const postGooleLoginFinish = (body:any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/login/google/finish/`,
        body, {
            withCredentials: false
        }
    )
}

export const getUser = (authHeader:any,):Promise<AxiosResponse> => {
    return axios.get (
        `${URL}/api/accounts/v1/user/`,
        {
            headers: authHeader
        }
    )
}

export const postMarker = (authHeader:any, body:any):any => {
    return axios.post(
        `${URL}/api/marker/`,
        body, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeader
            }
        }
    );
}

export const getMarkersSimiple = (authHeader:any):Promise<AxiosResponse> => {
    console.log("authHeader", authHeader);
    return axios.get (
        `${URL}/api/simple/`,
        {
            headers: authHeader
        }
    )
}

export const postTokenRefresh = (body:any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/token/refresh/`,
        body
    );
}

export const getTag = (body: any):Promise<AxiosResponse> => {
    console.log("getTAg1!!")
    return axios.get(
        `${URL}/api/tag/`
    )
}

export const getMarkerDetail = (header: any, id: number):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/marker/${id}`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const verifyFCM = (authHeader:any, body: any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/verify-fcm/`,
        body,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeader
            },
            withCredentials: false
        }
    )
}