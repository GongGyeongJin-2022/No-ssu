import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {RecoilRoot, useRecoilValue} from "recoil";
import ReactNativeRecoilPersist, {
    ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import {tokenState} from "@apis/atoms";

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LottieView from 'lottie-react-native';

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
                initialRouteName={token?.accessToken ? "Main" : "Login"}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    const [splash, setSplash] = useState(true);

    return (
        <RecoilRoot>
            <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
                <React.Suspense fallback={<Text>Loading...</Text>}>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <BottomSheetModalProvider>
                            {
                                splash ?
                                    <LottieView
                                        source={require('@assets/splash.json')}
                                        autoPlay
                                        loop={false}
                                        onAnimationFinish={() => {
                                            setSplash(false);
                                        }}
                                        style={{backgroundColor: '#73B5CE'}}
                                    /> : <RootNavigator />
                            }
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </React.Suspense>
            </ReactNativeRecoilPersistGate>
        </RecoilRoot>
    )
}

export default App;
