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

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <RecoilRoot>
            <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
                <React.Suspense fallback={<Text>Loading...</Text>}>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <BottomSheetModalProvider>
                            <NavigationContainer>
                                <Stack.Navigator
                                    initialRouteName={"Login"}
                                    screenOptions={{ headerShown: false }}
                                >
                                    {/*기본적으로 Login이였다가 로그인이 완료되면 Main으로 네이게이팅*/}
                                    <Stack.Screen name="Main" component={Main} />
                                    <Stack.Screen name="Login" component={Login} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </React.Suspense>
            </ReactNativeRecoilPersistGate>
        </RecoilRoot>
    )
}

export default App;
