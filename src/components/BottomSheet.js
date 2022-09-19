import React, { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import {useApi, useBottomSheetModalRef} from "@hooks/Hooks";
import { useRecoilState } from "recoil";
import {screenState, Screen} from "@apis/atoms";

import Pin from "@screens/Pin";
import MyPage from "@screens/MyPage";
import Upload from "@screens/Upload";
import Complete from "@screens/Complete";
import Clear from "@screens/Clear";
import {getMarkerDetail} from "@apis/apiServices";

const BottomSheet = ({selectedMarkerId}) => {
    const [screen, setScreen] = useRecoilState(screenState)
    const bottomSheetModalRef = useBottomSheetModalRef();
    const [detailLoading, detailResolved, getDetail] = useApi(getMarkerDetail, true);
    const [snapPoints, setSnapPoints] = useState([]);

    const { dismissAll } = useBottomSheetModal();

    const snapPointsList = {
        [Screen.Main]: ['3%', '25%', '75%'],
        [Screen.Pin]: ['50%'],
        [Screen.Upload]: ['100%'],
        [Screen.Mypage]: ['100%'],
        [Screen.Clear]: ['100%'],
        [Screen.Complete]: ['70%'],

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
                        <Text>
                            Main
                        </Text>
                    ) : screen === Screen.Upload ? (
                        <Upload />
                    ) : screen === Screen.Mypage ? (
                        <MyPage />
                    ) : screen === Screen.Pin ? (
                        <Pin detailLoading={detailLoading} detailResolved={detailResolved} getDetail={getDetail} selectedMarkerId={selectedMarkerId}/>
                    ) : screen === Screen.Clear ? (
                        <Clear detailLoading={detailLoading} detailResolved={detailResolved} getDetail={getDetail} selectedMarkerId={selectedMarkerId}/>
                    ) : screen === Screen.Complete ? (
                        <Complete />
                    ) : null
                }
            </View>
        </BottomSheetModal>

    );
};

export default BottomSheet;
