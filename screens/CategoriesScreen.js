import { FlatList, TouchableOpacity, Text } from 'react-native';
import { categories } from '../data/foodData';

export default function CategoriesScreen({ navigation }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding:20,
            margin:10,
            backgroundColor:'#ff9800',
            borderRadius:10
          }}
          onPress={() =>
            navigation.navigate('FoodList', {
              category: item.name,
            })
          }
        >
          <Text style={{ color:'white', fontSize:20 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}