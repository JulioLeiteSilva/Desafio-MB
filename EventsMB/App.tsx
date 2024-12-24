import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import RootStack from './src/navigation';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <RootStack />
    </>
  );
}
