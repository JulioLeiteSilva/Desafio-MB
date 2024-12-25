import moment from 'moment';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import EventList from './components/EventList';
import { ScreenContent } from '../../components/ScreenContent';
import mockEvents from '../../data/mockEvents.json';
import { Event } from '../../types';

export default function HomeScreen() {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const filtered = events.filter(
      (event: Event) =>
        event.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
        event.seller.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchText, events]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const sortedEvents = [...mockEvents].sort((a, b) => {
        const dateA = moment(a.dateTime, 'DD/MM/YYYY HH:mm');
        const dateB = moment(b.dateTime, 'DD/MM/YYYY HH:mm');
        return dateA.diff(dateB);
      });

      setEvents(sortedEvents);
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = mockEvents.filter(
      (event: Event) =>
        event.eventName.toLowerCase().includes(text.toLowerCase()) ||
        event.seller.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredEvents(filtered);
  };

  return (
    <ScreenContent path="screens/one.tsx" title="Tab One">
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar eventos..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <EventList events={filteredEvents} />
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
});
