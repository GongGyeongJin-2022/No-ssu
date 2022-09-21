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
});

export const Screen = {
    Main: 'Main',
    Upload: 'Upload',
    Mypage: 'Mypage',
    Pin: 'Pin',
    Complete: 'Complete',
    Clear: 'Clear',
    None: ''
} as const;
type Screen = typeof Screen[keyof typeof Screen];

export const screenState = atom<Screen> ({
    key: "screen",
    default: Screen.Main
});

export const bottomSheetModalRefState = atom ({
    key: "bottomSheetModalRef",
    default: null
});

export const userState = atom ({
    key: "user",
    default: null
});
