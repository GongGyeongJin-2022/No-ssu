import {useRecoilCallback, useRecoilValue} from "recoil";
import {postGooleLoginFinish, postMarker, postTokenRefresh} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";
import {GOOGLELOGIN_POST_ERROR, MARKER_POST_ERROR} from "@apis/types";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

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

export const usePostTokenRefreshCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                await postTokenRefresh(body)
                    .then(({data}) => {
                        console.log("data", data);
                        set(tokenState, {
                            accessToken: data.access,
                            refreshToken: body.refresh
                        });
                    })
                    .catch(err => {
                        if(err.response.status === 401) {
                            Toast.show({
                                type: 'error',
                                text1: 'API에러',
                                text2: err.response.detail,
                            })
                        }
                    });
            },
        [],
    );
}
