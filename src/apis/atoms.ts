import { atom } from "recoil";

export interface Token {
    accessToken: string | null;
    refreshToken: string | null;
}

export const tokenState = atom<Token> ({
    key: "token",
    default: {
        accessToken: null,
        refreshToken: null
    }
});

const screens = ['Mypage', 'Upload', 'Main'] as const;

type Screen = typeof screens[keyof typeof screens];

export const screenState = atom<Screen> ({
    key: "screen",
    default: "Main"
});
