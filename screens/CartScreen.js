import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, getTotalPrice, increaseQuantity, decreaseQuantity, removeFromCart, placeOrder } = useCart();

  const handleCheckout = () => {
    const order = placeOrder();
    if (!order) return;

    Alert.alert(
      'Успішно',
      `Замовлення на ${order.total} грн оформлено!`,
      [
        {
          text: 'До історії замовлень',
          onPress: () => navigation.navigate('Історія замовлень'),
        },
        { text: 'Гаразд' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.empty}>Кошик порожній</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10 }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price} грн</Text>

                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Text style={styles.removeBtnText}>Прибрати</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.itemSubtotal}>{item.price * item.quantity} грн</Text>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Разом: {getTotalPrice()} грн</Text>
            <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
              <Text style={styles.btnText}>Оформити замовлення</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 10 },
  empty: { fontSize: 18, color: '#888' },
  item: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#eee' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#666', marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', lineHeight: 18 },
  qtyValue: { marginHorizontal: 10, fontSize: 16, fontWeight: '600', minWidth: 18, textAlign: 'center' },
  removeBtn: { marginLeft: 14 },
  removeBtnText: { color: '#e74c3c', fontSize: 13 },
  itemSubtotal: { fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  btn: { backgroundColor: '#2ECC71', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
