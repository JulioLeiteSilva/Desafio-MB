import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';

import EventCard from './EventCard';

import { RootStackParamList } from '~/navigation';
import { Event } from '~/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'EventModal'>;

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const navigation = useNavigation<NavigationProp>();
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events.slice(0, visibleCount)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            seller={item.seller}
            eventName={item.eventName}
            dateTime={item.dateTime}
            imageUrl={item.imageUrl}
            onPress={() => navigation.navigate('EventModal', { event: item })}
          />
        )}
        ListFooterComponent={
          events.length > visibleCount ? (
            <Button title="Ver mais" onPress={handleShowMore} color="#37618E" />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default EventList;
