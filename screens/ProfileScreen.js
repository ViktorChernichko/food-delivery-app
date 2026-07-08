import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProfileScreen() {
  const { orders } = useCart();

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.avatar} />

      <Text style={styles.name}>Я</Text>
      <Text style={styles.email}>jaja@gmail.com</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{orders.length}</Text>
          <Text style={styles.statLabel}>Замовлень</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>{totalSpent} грн</Text>
          <Text style={styles.statLabel}>Витрачено</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingTop: 40 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 14 },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { color: '#888', marginTop: 4, marginBottom: 24 },
  statsRow: { flexDirection: 'row', width: '80%', justifyContent: 'space-around' },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#2ECC71' },
  statLabel: { color: '#888', marginTop: 4, fontSize: 13 },
});
