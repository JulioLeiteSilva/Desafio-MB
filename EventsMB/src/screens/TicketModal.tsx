import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useUser } from '../context/UserContext';

import { RootStackParamList } from '~/navigation';

type TicketModalRouteProp = RouteProp<RootStackParamList, 'TicketModal'>;

export default function TicketModal() {
  const { user } = useUser();
  const route = useRoute<TicketModalRouteProp>();
  const navigation = useNavigation();
  const { ticket } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Ingresso</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: ticket.imageUrl }} style={styles.image} />
        <Text style={styles.eventName}>{ticket.eventName}</Text>

        <Text style={styles.title}>Data:</Text>
        <Text style={styles.date}>{ticket.dateTime}</Text>

        <Text style={styles.title}>Local:</Text>
        <Text style={styles.location}>{ticket.location}</Text>

        <Text style={styles.title}>Comprado por:</Text>
        <Text style={styles.userInfo}>{user?.name || 'Usuário Desconhecido'}</Text>
        <Text style={styles.userInfo}>{user?.email}</Text>

        <View style={styles.qrCodeContainer}>
          <QRCode
            value={JSON.stringify({
              ticketId: ticket.id,
              userName: user?.name,
              userEmail: user?.email,
            })}
            size={150}
          />
          <Text style={styles.qrCodeLabel}>Escaneie para validar o ingresso</Text>
        </View>

        <Text style={styles.quantity}>Quantidade: {ticket.quantity}</Text>
        <Text style={styles.value}>Valor Total: R$ {ticket.value.toFixed(2)}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
  },
  userInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCodeLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  quantity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
  },
});
