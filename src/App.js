import React from 'react';
import {SafeAreaView, Text} from "react-native";
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '@screens/Main';
import MyPage from "@screens/MyPage";
import Upload from "@screens/Upload";
import Login from './Login';
import {RecoilRoot} from "recoil";

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <RecoilRoot>
                <React.Suspense fallback={<Text>Loading...</Text>}>
                    <Login />
                </React.Suspense>
            </RecoilRoot>


            {/*<NavigationContainer>*/}
            {/*    <Stack.Navigator initialRouteName="Main">*/}
            {/*        <Stack.Screen*/}
            {/*            name="Main"*/}
            {/*            component={Main}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*        <Stack.Screen*/}
            {/*            name="MyPage"*/}
            {/*            component={MyPage}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*        <Stack.Screen*/}
            {/*            name="Upload"*/}
            {/*            component={Upload}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*    </Stack.Navigator>*/}
            {/*</NavigationContainer>*/}
        </>
    )
}

export default App;
