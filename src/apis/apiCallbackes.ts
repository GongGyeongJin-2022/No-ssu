import {useRecoilCallback, useRecoilValue} from "recoil";
import {postGooleLoginFinish, postMarker} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";
import {GOOGLELOGIN_POST_ERROR, MARKER_POST_ERROR} from "@apis/types";

export const usePostGoogleLoginFinishCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                postGooleLoginFinish(body)
                    .then(({data}) => {
                        console.log("response ", data);
                        set(tokenState, {
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token
                        });
                    })
                    .catch((e) => {
                        console.log(GOOGLELOGIN_POST_ERROR);
                    });
            },
        [],
    );
}

export const usePostMarkerCallback = () => {
    const token = useRecoilValue(tokenState);
    return useRecoilCallback(({snapshot, set}) =>
             (body) => {
                postMarker(token, body)
                    .then()
                    .catch((e) => {
                        console.log(MARKER_POST_ERROR);
                    });
            },
        [],
    );
}