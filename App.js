import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
 
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="loginOriginal"
        screenOptions={{
        headerShown: true
        
      }}>
        <Stack.Screen name=" " component={loginOriginal} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Register" component={register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function loginOriginal({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Image style={styles.image} source={require("/Users/treseibert/Documents/Courses/Software-Engineering/DripOrDrown/assets/logo2.jpeg")} />

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

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("/Users/treseibert/Documents/Courses/Software-Engineering/DripOrDrown/assets/logo2.jpeg")} />

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

        <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.registerText}>LOGIN</Text>
      </TouchableOpacity>

    </View></>
  );
}

function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("/Users/treseibert/Documents/Courses/Software-Engineering/DripOrDrown/assets/logo2.jpeg")} />

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

        <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>

    </View></>
  );
}

export default App;
 
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