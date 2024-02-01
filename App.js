import {SafeAreaView} from 'react-native';
import React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Router from './src/router';
import {NavigationContainer} from '@react-navigation/native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5E37F5',
    },
};

const App = () => {
    return <Router />;
};

const ContextApi = () => {
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </NavigationContainer>
    );
};

export default ContextApi;
