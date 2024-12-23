import { RouteProp, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, View, Text } from 'react-native';

import { ScreenContent } from '../components/ScreenContent';

import { RootStackParamList } from '~/navigation';

type ModalRouteProp = RouteProp<RootStackParamList, 'Modal'>;

export default function Modal() {
  const route = useRoute<ModalRouteProp>();
  const { event } = route.params;

  return (
    <>
      <ScreenContent path="screens/modal.tsx" title="Modal">
        <View>
          <Text>{event.eventName}</Text>
          <Text>{event.seller}</Text>
        </View>
      </ScreenContent>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
