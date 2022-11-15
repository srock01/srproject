import React from 'react';
import { Button, View, Text } from 'react-native';

export default function Home ({navigation}) {
    return (
      <View>
        <Text>Home Screen</Text>

        <Button
          title="Closet"
          color="blue"
          onPress={() => navigation.navigate('Closet')}
        />
      </View>
    );
  }