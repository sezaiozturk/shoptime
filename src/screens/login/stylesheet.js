import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '85%',
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        gap: 10,
    },
    input: {
        fontSize: 14,
    },
    rememberContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

export default style;
