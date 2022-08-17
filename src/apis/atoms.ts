import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export interface Token {
    accessToken: string | null;
    refreshToken: string | null;
}

export const tokenState = atom<Token> ({
    key: "token",
    default: {
        accessToken: null,
        refreshToken: null
    },
    effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
})