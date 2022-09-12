import {useRecoilCallback, useRecoilValue} from "recoil";
import {postGooleLoginFinish, postMarker, postTokenRefresh} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";
import {GOOGLELOGIN_POST_ERROR, MARKER_POST_ERROR} from "@apis/types";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import RNRestart from 'react-native-restart';

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
                return await postTokenRefresh(body)
                    .then((res) => {
                        const {data} = res;
                        console.log("data", data);
                        set(tokenState, {
                            accessToken: data.access,
                            refreshToken: body.refresh
                        });
                        return res.response.status
                    })
                    .catch(err => {
                        console.log("token refresh error", err.response.status)
                        if(err.response.status === 401) {
                            set(tokenState, {
                                accessToken: '',
                                refreshToken: ''
                            });
                            Toast.show({
                                type: 'error',
                                text1: '인증이 만료되었으므로 재로그인이 필요합니다',
                                text2: '3초후 재시작합니다.',
                            })
                            setTimeout(() => {
                                RNRestart.Restart();
                            },3000)
                        }
                        return err.response.status
                    });
            },
        [],
    );
}
