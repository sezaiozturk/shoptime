import {SafeAreaView, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './stylesheet';
import {Button, TextInput, Checkbox, Text, useTheme} from 'react-native-paper';
import storage from '../../storage';

const Login = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const theme = useTheme();
    const user = {
        userName: 'Sezai',
        password: '11111',
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleRememberMe = () => {
        setChecked(!checked);
        if (checked) storage.delete('user');
    };

    const loginValidate = () => {
        if (userName === user.userName && password === user.password) {
            navigation.navigate('ProductsScreen');
        }
    };

    useEffect(() => {
        const jsonUser = storage.getString('user');
        if (jsonUser) {
            const initialUser = JSON.parse(jsonUser);
            setUserName(initialUser.userName);
            setPassword(initialUser.password);
            setChecked(true);
        }
    }, []);

    useEffect(() => {
        if (checked) {
            storage.set(
                'user',
                JSON.stringify({
                    userName,
                    password,
                }),
            );
        }
    }, [checked]);
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    label="Username"
                    value={userName}
                    mode="outlined"
                    style={styles.input}
                    onChangeText={text => setUserName(text)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    activeOutlineColor={theme.colors.primary}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={secureTextEntry}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye' : 'eye-off'}
                            onPress={toggleSecureEntry}
                        />
                    }
                />
                <View style={styles.rememberContainer}>
                    <Text variant="bodyMedium">Remember me !</Text>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={toggleRememberMe}
                    />
                </View>
                <Button
                    mode="contained"
                    onPress={loginValidate}
                    style={{marginTop: 40}}>
                    Login
                </Button>
            </View>
        </SafeAreaView>
    );
};
export default Login;
