import React from 'react';
import {Text, View} from 'react-native';
import Config from 'react-native-config';

const App = () => {
    return (
        <View>
            <Text>
                {Config.GOOGLE_MAPS_ANDROID_API_KEY}
            </Text>
        </View>

    )
}

export default App;
