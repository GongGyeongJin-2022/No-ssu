import React, { useEffect } from "react";
import { Text } from "react-native";

import {RecoilRoot, useRecoilValue} from "recoil";
import ReactNativeRecoilPersist, {
    ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import {tokenState} from "@apis/atoms";

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from '@screens/Main';
import Login from '@screens/Login';

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
                initialRouteName={token ? "Login" : "Main"}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={Login} />
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
