import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { RecoilRoot, useRecoilState } from "recoil";
import ReactNativeRecoilPersist, { ReactNativeRecoilPersistGate } from "react-native-recoil-persist";
import { tokenState } from "@apis/atoms";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LottieView from "lottie-react-native";

import Main from "@screens/Main";
import Login from "@screens/Login";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [token, setToken] = useRecoilState(tokenState);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={token.accessToken ? "Main" : "Login"}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    const [splash, setSplash] = useState(true);

    useEffect(() => {
        return messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage)
        });
    }, []);

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
                        <Toast/>
                    </GestureHandlerRootView>
                </React.Suspense>
            </ReactNativeRecoilPersistGate>
        </RecoilRoot>
    )
}

export default App;
