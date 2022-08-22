import React, { useEffect, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import { useBottomSheetModalRef } from "@hooks/Hooks";
import {useRecoilValue} from "recoil";
import {screenState} from "@apis/atoms";

const BottomSheet = () => {
    const screen = useRecoilValue(screenState)

    // ref
    const bottomSheetModalRef = useBottomSheetModalRef();

    // variables
    const snapPoints = useMemo(() => ['3%', '25%', '50%', '100%'], []);

    useEffect(() => {
        console.log("bottomSheetModalRef!!", bottomSheetModalRef)
        if(bottomSheetModalRef!==undefined && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    },[bottomSheetModalRef, screen])

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
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
                    ) : null
                }
            </View>
        </BottomSheetModal>

    );
};

export default BottomSheet;
