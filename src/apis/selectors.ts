import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {postGooleLoginFinish, postLogin} from "@apis/apiServices";
import {GOOGLELOGIN_POST_ERROR, LOGIN_POST_ERROR} from "@apis/types";

interface Body {
    [key: string]: string | number;
}

export const tokenSelector = selector<Token>({
    key: 'tokenSelector',
    get: async ({get}) => {
        return get(tokenState);
    },
    set: ({set}, newToken) => {
        console.log("newToken", newToken);
        set(tokenState, newToken);
    }
})

export const loginSelector = selectorFamily<Token, Body>({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        return postLogin(body)
            .then((response) => response.data)
            .catch(err => LOGIN_POST_ERROR);
    }
})

export const googleLoginSelector = selectorFamily<Token, Body>({
    key: 'loginGoogleSelector',
    get: (body) => async ({}) => {
        return postGooleLoginFinish(body)
            .then((response) => response.data)
            .catch(err => GOOGLELOGIN_POST_ERROR);
    }
})