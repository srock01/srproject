import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore/lite";
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
  TextInput,
} from "react-native";

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

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="New Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.SubmitButton}
        onPress={() => SubmitPress(email, password, navigation)}
      >
        <Text style={styles.SubmitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

async function SubmitPress(email, password, navigation) {
  let user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    await setDoc(doc(db, "users", email), { password: password });
    navigation.navigate("LogIn");
    console.log("Password Changed.");
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
    borderColor: "white",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  SubmitButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white",
  },
});
