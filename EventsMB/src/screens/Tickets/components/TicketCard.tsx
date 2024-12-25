import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Ticket } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TicketModal'>;

interface RenderTicketProps {
  item: Ticket;
}

const RenderTicket: React.FC<RenderTicketProps> = ({ item }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('TicketModal', { ticket: item });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.ticketCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.ticketImage} />
      <Text style={styles.eventName}>{item.eventName}</Text>
      <Text style={styles.date}>{item.dateTime}</Text>
      <Text style={styles.location}>Local: {item.location}</Text>
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
      <Text style={styles.value}>Valor Total: R$ {item.value.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default RenderTicket;

const styles = StyleSheet.create({
  ticketCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ticketImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
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
});
