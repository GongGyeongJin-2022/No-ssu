import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {RecoilRoot, useRecoilState, useRecoilValue} from "recoil";
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
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [token, setToken] = useRecoilState(tokenState);

    useEffect(() => {
        console.log("rootNavigator", token);
        setToken(
            {
                accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MzMxNzU1NiwiaWF0IjoxNjYyNzEyNzU2LCJqdGkiOiI2M2RmMDI1ODE2Zjc0ZWVlOWEyY2I3NzhhMDZiNTAzZSIsInVzZXJfaWQiOjR9.ZomeOPPbPfRUqZdZZS-Pq_BI2gTFhqPQYllvtktzPiY",
                refreshToken: token.refreshToken
            }
        )
    },[])

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
