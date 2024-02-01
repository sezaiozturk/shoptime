import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Products} from '../screens';

const Router = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="ProductsScreen" component={Products} />
        </Stack.Navigator>
    );
};
export default Router;
