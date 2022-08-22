import {useRecoilCallback, useRecoilValue} from "recoil";
import {postGooleLoginFinish, postMarker} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";
import {GOOGLELOGIN_POST_ERROR, MARKER_POST_ERROR} from "@apis/types";
import { useNavigation } from "@react-navigation/native";

export const usePostGoogleLoginFinishCallback = () => {
    const navigation = useNavigation();
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                postGooleLoginFinish(body)
                    .then(({data}) => {
                        set(tokenState, {
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token
                        });
                        navigation.navigate("Main");
                    })
                    .catch((e) => {
                        console.log(GOOGLELOGIN_POST_ERROR, e);
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