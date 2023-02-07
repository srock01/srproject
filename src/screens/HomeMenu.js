import React from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image } from 'react-native';
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
  apiKey: "AIzaSyB2FzOefuDJNQHq1QLNs0dZJ5nsSeq-JyA",
    authDomain: "srproject-75728.firebaseapp.com",
    projectId: "srproject-75728",
    storageBucket: "srproject-75728.appspot.com",
    messagingSenderId: "920612695893",
    appId: "1:920612695893:web:dff9096bd171cca13709dc",
    measurementId: "G-Z5ZCFJCV52"
};

require("firebase/firestore");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home ({navigation, route}) {
  //const { email } = route.params;
  
    return (
      <View style={styles.container}>
        
        <Image style={styles.image} source={require("../../assets/SL_APP_Icon.png")} />


        <Pressable style={styles.Button} onPress={() => navigation.navigate('Closet',{ email: email })}>
          <Text style={styles.text}>Closet</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => navigation.navigate('OutfitList',{ email: email })}>
          <Text style={styles.text}>Outfits</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.text}>Calendar</Text>
        </Pressable>
        
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1C4BA5",
      paddingTop: 300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Button: {
      marginTop: 10,
      top: 50,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderRadius: 6,
      backgroundColor: 'black',
      width: 150,
    },
    text: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 25,
      position: "absolute",
      top: 75,
      
    },
  });