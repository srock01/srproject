import React, { useState } from 'react';
import {initializeApp} from 'firebase/app';
import {
  getDocs,
  getFirestore,
  collection,
  firestore,
} from 'firebase/firestore/lite';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';




export default function LoadIn({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("../../assets/logo2.jpeg")} />

      <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>LOGIN</Text>

      </TouchableOpacity>

      <Text style={styles.loginOr}>OR</Text>

      <TouchableOpacity style={styles.loginBtn}
      onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C4BA5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: 'white',
  },
  loginBtn: {
     width: "80%",
     borderRadius: 25,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
     marginTop: 20,
     backgroundColor: "white",
    },
    loginOr: {
     paddingTop: 20,
     color: 'white',
     fontSize: 15,
    },
    image: {
     width: 300,
     height: 300,
     marginBottom: 50,
    },
});