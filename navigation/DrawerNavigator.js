import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuStack from './MenuStack';

import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){

    return(

        <Drawer.Navigator
            drawerContent={(props)=><CustomDrawer {...props}/>}
        >

            <Drawer.Screen
                name="Меню"
                component={MenuStack}
            />

            <Drawer.Screen
                name="Кошик"
                component={CartScreen}
            />

            <Drawer.Screen
                name="Історія замовлень"
                component={OrdersScreen}
            />

            <Drawer.Screen
                name="Профіль"
                component={ProfileScreen}
            />

        </Drawer.Navigator>

    );

}