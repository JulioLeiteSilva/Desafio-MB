import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import 'moment/locale/pt-br';
import { useUser } from '../context/UserContext';

import { RootStackParamList } from '~/navigation';

type ModalRouteProp = RouteProp<RootStackParamList, 'EventModal'>;

export default function EventModal() {
  const { addTicket } = useUser();
  const route = useRoute<ModalRouteProp>();
  const navigation = useNavigation();
  const { event } = route.params;

  const [ticketCount, setTicketCount] = useState(1);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleIncrement = () => {
    setTicketCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) setTicketCount((prev) => prev - 1);
  };

  const handleBuy = async () => {
    const newTicket = {
      id: Date.now(),
      eventName: event.eventName,
      dateTime: event.dateTime,
      location: event.location,
      quantity: ticketCount,
      value: event.value * ticketCount,
      imageUrl: event.imageUrl,
    };

    await addTicket(newTicket);

    Alert.alert('Sucesso', 'Ingresso adicionado aos seus ingressos!');
    navigation.goBack();
  };

  const formattedDate = moment(event.dateTime, 'DD/MM/YYYY HH:mm')
    .locale('pt-br')
    .format('dddd, D [de] MMMM [de] YYYY [às] HH:mm');

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Evento</Text>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <Text style={styles.seller}>{event.seller}</Text>
        <Text style={styles.eventName}>{event.eventName}</Text>

        <Text style={styles.title}>Data:</Text>
        <Text style={styles.date}>{formattedDate}</Text>

        <Text style={styles.title}>Local:</Text>
        <Text style={styles.location}>{event.location}</Text>

        <Text style={styles.title}>Descrição:</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.purchaseContainer}>
          <View style={styles.purchaseHeader}>
            <Text style={styles.eventValue}>R$ {event.value.toFixed(2)}</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={handleDecrement} style={styles.counterButton}>
                <Ionicons name="remove" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{ticketCount}</Text>
              <TouchableOpacity onPress={handleIncrement} style={styles.counterButton}>
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  content: {
    flex: 1,
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
  seller: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  purchaseContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#37618E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  buyButton: {
    backgroundColor: '#37618E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
