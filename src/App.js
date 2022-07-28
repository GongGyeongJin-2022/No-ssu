import React from 'react';
import { SafeAreaView } from "react-native";
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '@screens/Main';
import MyPage from "@screens/MyPage";
import Upload from "@screens/Upload";
import Login from './Login';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <Login />

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
