import React, { useState } from 'react';
import {Node} from 'react';
import {initializeApp} from 'firebase/app';
import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  query,
  getDoc,
  setDoc,
  doc,
} from 'firebase/firestore/lite';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  Image,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
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

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("../../assets/logo2.jpeg")} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)} />
      </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)} />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => loginPress(email, password)}
        >
        <Text style={styles.registerText}>LOGIN</Text>
      </TouchableOpacity>

    </View></>
  );
}

async function loginPress(email, password) {
  let user = await getDoc(doc(db, "users", email));
  if (user.exists() && password === user.get("password")) {
    if (password === user.get("password")) {
      //login to homepage
      navigation.navigate()
      console.log("Login Successful.");
    } else {
      //incorrect password
      console.log("Incorrect password.");
    }
  } else {
    console.log("User does not exist.");
  }
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

  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "white"
  },

  DripOrDrownText: {
    color: "white",
    fontSize: '35px',
    fontWeight: "bold",
    paddingBottom: 100,
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