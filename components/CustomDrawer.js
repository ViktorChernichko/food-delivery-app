import {
DrawerContentScrollView,
DrawerItemList
} from '@react-navigation/drawer';

import {View,Text,Image} from 'react-native';

export default function CustomDrawer(props){

    return(

        <DrawerContentScrollView {...props}>

            <View
                style={{
                    alignItems:'center',
                    padding:20
                }}
            >

                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        width:80,
                        height:80,
                        marginBottom:10
                    }}
                />

                <Text
                    style={{
                        fontSize:20,
                        fontWeight:'bold'
                    }}
                >
                    Food Delivery
                </Text>

                <Text>Я</Text>

            </View>

            <DrawerItemList {...props}/>

        </DrawerContentScrollView>

    );

}