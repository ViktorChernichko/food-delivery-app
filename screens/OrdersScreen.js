import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useCart } from '../context/CartContext';

function formatDate(isoString) {
  const d = new Date(isoString);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function OrdersScreen() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyEmoji}>📦</Text>
        <Text style={styles.empty}>У вас ще немає замовлень</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={orders}
      keyExtractor={(order) => order.id}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item: order }) => (
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
            <Text style={styles.orderTotal}>{order.total} грн</Text>
          </View>

          {order.items.map((food) => (
            <View key={food.id} style={styles.foodRow}>
              <Image source={{ uri: food.image }} style={styles.foodImage} />
              <Text style={styles.foodName} numberOfLines={1}>
                {food.name}
              </Text>
              <Text style={styles.foodQty}>x{food.quantity}</Text>
              <Text style={styles.foodPrice}>{food.price * food.quantity} грн</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  emptyEmoji: { fontSize: 48, marginBottom: 10 },
  empty: { fontSize: 18, color: '#888' },
  orderCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 8,
  },
  orderDate: { color: '#888', fontSize: 13 },
  orderTotal: { fontWeight: 'bold', fontSize: 16, color: '#2ECC71' },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  foodImage: { width: 36, height: 36, borderRadius: 6, backgroundColor: '#eee' },
  foodName: { flex: 1, marginLeft: 10, fontSize: 14 },
  foodQty: { color: '#666', fontSize: 13, marginRight: 10 },
  foodPrice: { fontWeight: '600', fontSize: 14 },
});
