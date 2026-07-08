import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { foods } from '../data/foodData';

export default function FoodListScreen({ route, navigation }) {

  const { category } = route.params;

  const data = foods.filter(item => item.category === category);

  return (

    <FlatList

      data={data}

      keyExtractor={item => item.id}

      renderItem={({ item }) => (

        <TouchableOpacity

          onPress={() =>
            navigation.navigate('FoodDetails', {
              food: item,
            })
          }

          style={{
            margin:10,
            padding:10,
            backgroundColor:'#fff',
            borderRadius:10,
            elevation:3
          }}

        >

          <Image

            source={{ uri: item.image }}

            style={{
              width:'100%',
              height:180,
              borderRadius:10
            }}

          />

          <Text
            style={{
              fontSize:22,
              fontWeight:'bold',
              marginTop:10
            }}
          >
            {item.name}
          </Text>

          <Text>
            {item.description}
          </Text>

          <Text
            style={{
              fontSize:18,
              color:'green',
              marginTop:5
            }}
          >
            {item.price} грн
          </Text>

        </TouchableOpacity>

      )}

    />

  );

}