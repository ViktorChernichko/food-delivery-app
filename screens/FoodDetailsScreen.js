import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { useCart } from '../context/CartContext';

export default function FoodDetailsScreen({ route, navigation }) {
  const { food } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(food, quantity);
    Alert.alert(
      'Додано до кошика',
      `${food.name} x${quantity} — ${food.price * quantity} грн`,
      [
        { text: 'До кошика', onPress: () => navigation.navigate('Кошик') },
        { text: 'Продовжити покупки', style: 'cancel' },
      ]
    );
    setQuantity(1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image source={{ uri: food.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{food.name}</Text>
          <Text style={styles.price}>{food.price} грн</Text>
        </View>

        <Text style={styles.category}>{food.category}</Text>

        <Text style={styles.description}>{food.description}</Text>

        <View style={styles.qtySection}>
          <Text style={styles.qtyLabel}>Кількість</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>
            Додати до кошика · {food.price * quantity} грн
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 260, backgroundColor: '#eee' },
  content: { padding: 20 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: { fontSize: 24, fontWeight: 'bold', flex: 1, marginRight: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#2ECC71' },
  category: {
    marginTop: 6,
    color: '#ff9800',
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  description: { marginTop: 14, fontSize: 15, lineHeight: 22, color: '#555' },
  qtySection: { marginTop: 26 },
  qtyLabel: { fontSize: 14, color: '#888', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold', lineHeight: 22 },
  qtyValue: { marginHorizontal: 20, fontSize: 18, fontWeight: '600', minWidth: 24, textAlign: 'center' },
  footer: { paddingHorizontal: 20, paddingTop: 10 },
  addBtn: { backgroundColor: '#2ECC71', padding: 16, borderRadius: 10, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
