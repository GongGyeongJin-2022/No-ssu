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

const screens = ['Mypage', 'Upload', 'Main'] as const;

type Screen = typeof screens[keyof typeof screens];

export const screenState = atom<Screen> ({
    key: "screen",
    default: "Main"
});

export const bottomSheetModalRefState = atom ({
    key: "bottomSheetModalRef",
    default: null
});

