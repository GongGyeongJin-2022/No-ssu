import {useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import {bottomSheetModalRefState} from "@apis/atoms";

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