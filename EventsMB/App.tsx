import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import RootStack from './src/navigation';

import { UserProvider } from '~/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <StatusBar hidden />
      <RootStack />
    </UserProvider>
  );
}
