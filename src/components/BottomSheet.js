import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import { useBottomSheetModalRef } from "@hooks/Hooks";
import { useRecoilState } from "recoil";
import {screenState, Screen} from "@apis/atoms";

import Pin from "@screens/Pin";
import Upload from "@screens/Upload";
import Clear from "@screens/Clear";

const BottomSheet = ({selectedMarkerId}) => {
    const [screen, setScreen] = useRecoilState(screenState)
    const bottomSheetModalRef = useBottomSheetModalRef();
    const [snapPoints, setSnapPoints] = useState([]);

    const { dismissAll } = useBottomSheetModal();

    const snapPointsList = {
        [Screen.Main]: ['3%', '25%', '75%'],
        [Screen.Pin]: ['45%'],
        [Screen.Upload]: ['100%'],
        [Screen.Mypage]: ['100%'],
        [Screen.Clear]: ['100%'],

        // Todo: 보완 필요
        [Screen.None]: ['1%']
    }

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
            setSnapPoints(snapPointsList[screen])

            if (screen === Screen.None) {
                dismissAll();
            }
        }
    },[bottomSheetModalRef, screen])

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onDismiss={() => {
                setScreen(Screen.None);
            }}
            enableOverDrag={false}
        >
            <View>
                {
                    screen === Screen.Main ? (
                        <>
                            <Text>
                                Main
                            </Text>
                        </>
                    ) : screen === Screen.Upload ? (
                        <>
                            <Upload/>
                        </>
                    ) : screen === Screen.Mypage ? (
                        <>
                            <Text>
                                Mypage
                            </Text>
                        </>
                    ) : screen === Screen.Pin ? (
                        <Pin  selectedMarkerId={selectedMarkerId}/>
                    ) : screen === Screen.Clear ? (
                        <Clear  selectedMarkerId={selectedMarkerId}/>
                    ) : null
                }
            </View>
        </BottomSheetModal>

    );
};

export default BottomSheet;
