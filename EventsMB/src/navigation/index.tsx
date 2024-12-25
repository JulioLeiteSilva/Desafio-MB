import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './tab-navigator';
import EventModal from '../screens/EventModal';

import TicketModal from '~/screens/TicketModal';
import { Event, Ticket } from '~/types';

export type RootStackParamList = {
  TabNavigator: undefined;
  EventModal: { event: Event };
  TicketModal: { ticket: Ticket };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventModal"
          component={EventModal}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen
          name="TicketModal"
          component={TicketModal}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
