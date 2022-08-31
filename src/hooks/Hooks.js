import {useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import {bottomSheetModalRefState} from "@apis/atoms";
import {useEffect, useRef, useState} from "react";
import {useRecoilCallback} from "recoil";
import {tokenState} from "@apis/atoms";

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
    },[])

    useEffect(()=> {
        latestState.current = bottomSheetModalRef;
    },[bottomSheetModalRef]);

    return latestState;
}

export const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();

    const makeHeaders = (token) => {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                let access_token;
                if(authHeader) {
                    access_token = (await snapshot.getPromise(tokenState)).accessToken;
                }
                const {data} = await api(authHeader ? makeHeaders(access_token) : null, ...args);
                setLoading(false);
                setResolved(data);
                return data
            },
        [],
    );
    return [loading, resolved, callback];
}