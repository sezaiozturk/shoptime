import {SafeAreaView} from 'react-native';
import React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Router from './src/router';
import {NavigationContainer} from '@react-navigation/native';
import {InvoiceProvider} from './src/context/invoiceContext';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5E37F5',
    },
};

const App = () => {
    return (
        <InvoiceProvider>
            <NavigationContainer>
                <PaperProvider theme={theme}>
                    <Router />
                </PaperProvider>
            </NavigationContainer>
        </InvoiceProvider>
    );
};

export default App;
