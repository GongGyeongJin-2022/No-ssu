import React from 'react';

import Main from '@screens/Main';
import MyPage from "@screens/MyPage";
import Upload from "@screens/Upload";
import Login from '~/Login';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <Main />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default App;
