import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { getUser } from '../../services/userService'; // Serviço para obter os dados do usuário
import { Ticket } from '../../types'; // Importe o tipo Ticket

import { ScreenContent } from '~/components/ScreenContent';
import { useUser } from '~/context/UserContext';
import RenderTicket from './components/TicketCard';

export default function TicketsScreen() {
  const { user, loadUser } = useUser();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <ScreenContent path="screens/one.tsx" title="Tab One">
      <View>
        {user && user.tickets.length > 0 ? (
          <FlatList
            data={user.tickets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderTicket item={item} />}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você não possui ingressos no momento.</Text>
          </View>
        )}
      </View>
    </ScreenContent>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#777',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  ticketImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
});
