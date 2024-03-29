import {useRecoilState} from "recoil";
import {bottomSheetModalRefState} from "@apis/atoms";
import {useEffect, useRef, useState} from "react";
import {useRecoilCallback} from "recoil";
import {tokenState} from "@apis/atoms";
import {usePostTokenRefresh, usePostTokenRefreshCallback} from "@apis/apiCallbackes";

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const useBottomSheetModalRef = () => {
    const [bottomSheetModalRef, setBottomSheetModalRef] = useRecoilState(bottomSheetModalRefState);
    const latestState = useRef(null);

    useEffect(() => {
        setBottomSheetModalRef(latestState.current);
    },[JSON.stringify(latestState)])

    useEffect(()=> {
        latestState.current = bottomSheetModalRef;
    },[]);

    return latestState;
}

export const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();
    const postTokenRefresh = usePostTokenRefreshCallback();

    const makeHeaders = (token) => {
        const headers = {
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/json'
        }
        return headers
    }

    const errorHandling = (err, refreshToken, ...args) => {
        console.log("?")
        if(err.response.status === 403) {
            console.log("403")
            return postTokenRefresh({"refresh": refreshToken})
                .then((status) => {
                    console.log("tokenRefresh finished")
                    if(status >= 400) return {status: false};
                    return {data: callback(...args), status: false};
                })
        } else {
            console.log("unhandled error", err.response.status, err.message)
            // setTimeout(() => {
            //     callback(...args);
            // }, 3000)
            return {status:false, error: err.message};
        }
    }

    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                console.log("args", args);
                let accessToken, refreshToken;
                if(authHeader) {
                    const token = await snapshot.getPromise(tokenState)
                    accessToken = token.accessToken;
                    refreshToken = token.refreshToken;
                    console.log("accessToken token", accessToken);
                    console.log("refreshToken token", refreshToken);
                }
                const {data, status, error} = authHeader ? (
                    await api(makeHeaders(accessToken), ...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                ) : (
                    await api(...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                );
                if(!status) throw new Error(error);
                setResolved(data);
                setLoading(false);
                console.log("final data",data);
                return data
            },
        [],
    );
    return [loading, resolved, callback, setLoading];
}