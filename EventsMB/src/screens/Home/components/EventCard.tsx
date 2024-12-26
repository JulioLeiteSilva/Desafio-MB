import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface EventCardProps {
  seller: string;
  eventName: string;
  dateTime: string;
  imageUrl: string;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  seller,
  eventName,
  dateTime,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.seller}>{seller}</Text>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  seller: {
    fontSize: 12,
    color: '#666',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTime: {
    fontSize: 14,
    color: '#999',
  },
});

export default EventCard;
