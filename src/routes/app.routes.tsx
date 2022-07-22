import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../sreens/home";
import { Details } from "../sreens/details";
import { Register } from "../sreens/register";


const { Navigator, Screen } = createNativeStackNavigator(); //Screen = TELAS

export function AppRoutes() {
    return (
        // screenOptions={{ headerShown: false}} = PARA RETIRAR DA TELA O MENU HOME QUE APARECE POR PADÃO
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="new" component={Register} />
            <Screen name="details" component={Details} />
        </Navigator>
    )
}