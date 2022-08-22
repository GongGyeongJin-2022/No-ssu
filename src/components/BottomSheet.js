import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import { useBottomSheetModalRef } from "@hooks/Hooks";
import { useRecoilState } from "recoil";
import {screenState} from "@apis/atoms";

import Pin from "@screens/Pin";

const BottomSheet = () => {
    const [screen, setScreen] = useRecoilState(screenState)
    const bottomSheetModalRef = useBottomSheetModalRef();
    const snapPoints = useMemo(() => ['3%', '25%', '50%', '100%'], []);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
            if (screen === 'Main') setIndex(3);
            else if (screen === 'Pin') setIndex(1);
            else if (screen === 'Upload') setIndex(3);
            else if (screen === 'Mypage') setIndex(3);
        }
    },[bottomSheetModalRef, screen])

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={index}
            snapPoints={snapPoints}
            onDismiss={() => {
                setScreen('');
                setIndex(-1);
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
                        <>
                            <Text>
                                Mypage
                            </Text>
                        </>
                    ) : screen === "Pin" ? (
                        <Pin />
                    ) : null
                }
            </View>
        </BottomSheetModal>

    );
};

export default BottomSheet;
