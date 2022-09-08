import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import { useBottomSheetModalRef } from "@hooks/Hooks";
import { useRecoilState } from "recoil";
import {screenState} from "@apis/atoms";

import Pin from "@screens/Pin";
import MyPage from "@screens/MyPage";

const BottomSheet = () => {
    const [screen, setScreen] = useRecoilState(screenState)
    const bottomSheetModalRef = useBottomSheetModalRef();
    const [snapPoints, setSnapPoints] = useState([]);

    const { dismissAll } = useBottomSheetModal();

    const snapPointsList = {
        'Main': ['3%', '25%', '75%'],
        'Pin': ['40%'],
        'Upload': ['100%'],
        'Mypage': ['100%'],

        // Todo: 보완 필요
        '': ['1%']
    }

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
            setSnapPoints(snapPointsList[screen])

            if (screen === '') {
                dismissAll();
            }
        }
    },[bottomSheetModalRef, screen])

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onDismiss={() => {
                setScreen('');
            }}
        >
            <View>
                {
                    screen === "Main" ? (
                        <>
                            <Text>
                                Main
                            </Text>
                        </>
                    ) : screen === "Upload" ? (
                        <>
                            <Text>
                                Upload
                            </Text>
                        </>
                    ) : screen === "Mypage" ? (
                        <MyPage />
                    ) : screen === "Pin" ? (
                        <Pin />
                    ) : null
                }
            </View>
        </BottomSheetModal>

    );
};

export default BottomSheet;
