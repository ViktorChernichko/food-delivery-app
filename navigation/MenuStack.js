import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import FoodListScreen from '../screens/FoodListScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';

const Stack = createNativeStackNavigator();

export default function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{title:'Категорії'}}
            />

            <Stack.Screen
                name="FoodList"
                component={FoodListScreen}
                options={{title:'Страви'}}
            />

            <Stack.Screen
                name="FoodDetails"
                component={FoodDetailsScreen}
                options={{title:'Деталі'}}
            />
        </Stack.Navigator>
    );
}