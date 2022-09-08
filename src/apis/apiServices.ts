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

export const getUser = ():Promise<AxiosResponse> => {
    return axios.get (
        `${URL}/api/accounts/v1/user/`,
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
    ).catch(function (error) {
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log('1', error.response.data);
            console.log('1', error.response.status);
            console.log('1', error.response.headers);
        }
        else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log('2', error.request);
        }
        else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error 3', error.message);
        }
        console.log('4',JSON.stringify(error.config));
    });
}

export const getMarkersSimiple = (authHeader:any):Promise<AxiosResponse> => {
    return axios.get (
        `${URL}/api/simple/`, // TODO: 현재는 simple url이 아님. 추후에 simple로 바꾸어야함.
        {
            headers: authHeader
        }
    )
}