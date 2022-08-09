import {useRecoilCallback} from "recoil";
import {postGooleLoginFinish} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";

export const usePostGoogleLoginFinishCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postGooleLoginFinish(body);
                console.log("response ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });
            },
        [],
    );
}