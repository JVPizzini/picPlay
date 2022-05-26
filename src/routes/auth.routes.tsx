import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screen
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRouters() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
