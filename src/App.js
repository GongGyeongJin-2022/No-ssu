import React from 'react';
import {SafeAreaView, Text} from "react-native";
import 'react-native-gesture-handler';

import Main from '@screens/Main';
import MyPage from "@screens/MyPage";
import Upload from "@screens/Upload";
import Login from '~/Login';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";

const App = () => {
    return (
        <RecoilRoot>
            <React.Suspense fallback={<Text>Loading...</Text>}>
                <GestureHandlerRootView style={{flex: 1}}>
                    <BottomSheetModalProvider>
                        <Login />
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </React.Suspense>
        </RecoilRoot>
    )
}

export default App;
