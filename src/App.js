import React, {useEffect} from 'react';
import {SafeAreaView, Text} from "react-native";
import 'react-native-gesture-handler';
import ReactNativeRecoilPersist, {
    ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import Main from '@screens/Main';
import Login from '~/Login';

import {RecoilRoot, useRecoilState, useRecoilValue} from "recoil";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {tokenState} from "@apis/atoms";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const token = useRecoilValue(tokenState);

    useEffect(() => {
        console.log("rootNavigator", token);
    },[token])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {/* token이 있다면 main, 아니면 login으로 네비게이팅 */}
                { token.accessToken === null ? (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    ) : null
                }
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    return (
        <RecoilRoot>
            <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
                <React.Suspense fallback={<Text>Loading...</Text>}>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <BottomSheetModalProvider>
                            <RootNavigator/>
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </React.Suspense>
            </ReactNativeRecoilPersistGate>
        </RecoilRoot>
    )
}

export default App;
