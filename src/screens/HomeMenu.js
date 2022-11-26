import React from 'react';
import { Button, View, Text } from 'react-native';
import { initializeApp } from "firebase/app";
import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  firebase,
  addDoc,
  get,
  doc,
  getDoc,
  setDoc,
  getDocFromCache
} from "firebase/firestore/lite";
import { color } from 'react-native-reanimated';
const firebaseConfig = {
  apiKey: "AIzaSyAF9QW9bvXKyWIiPpmaOgKunA51Jxe4iAw",
  authDomain: "dripordrown-90905.firebaseapp.com",
  databaseURL: "https://dripordrown-90905-default-rtdb.firebaseio.com",
  projectId: "dripordrown-90905",
  storageBucket: "dripordrown-90905.appspot.com",
  messagingSenderId: "217796469697",
  appId: "1:217796469697:web:3324196fa615c8c4f6c540",
  measurementId: "G-F0RSLNR2DY",
};

require("firebase/firestore");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home ({navigation, route}) {
  const { email } = route.params;
  
    return (
      <View>
        <Text>Home Screen </Text>

        <Button
          title="Closet"
          color="blue"
          onPress={() => navigation.navigate('Closet',{ email: email })}
        />
      </View>
    );
  }