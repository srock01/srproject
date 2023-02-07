import React from "react";
import { useContext,useMemo } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
//import {firebase, db} from './firebase/firebase';
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

//import Clothes from "./src/component/Clothes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Context} from "./src/screens/context"
import HomeMenu from "./src/screens/HomeMenu";
//import Closet from "./src/screens/Closet";
import LoadIn from "./src/screens/LoadIn";
import LogIn from "./src/screens/Login";
import SignUp from "./src/screens/signup1";
/*import Article from "./src/screens/Article";
import ForgotPassword from "./src/screens/ForgotPassword";
import CalendarScreen from "./src/screens/Calendar";
import AddArticle from "./src/screens/AddArticle";
import Outfit from "./src/screens/Outfit";
import OutfitList from "./src/screens/OutfitList";
import AddOutfit from "./src/screens/AddOutfit";
*/
const firebaseConfig = {
    apiKey: "AIzaSyB2FzOefuDJNQHq1QLNs0dZJ5nsSeq-JyA",
    authDomain: "srproject-75728.firebaseapp.com",
    projectId: "srproject-75728",
    storageBucket: "srproject-75728.appspot.com",
    messagingSenderId: "920612695893",
    appId: "1:920612695893:web:dff9096bd171cca13709dc",
    measurementId: "G-Z5ZCFJCV52"
  };

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const Stack = createStackNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App = () => {
    const isDarkMode = useColorScheme() === "dark";
    const myContext = useContext(Context);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [boole, setBoole] = React.useState({value: false});
    const [email, setE] = React.useState("");
    let [b, setB] =React.useState(boole.value)
    const userSetting = {boole:boole, 
        setBoole ,email:email,setE,b:b,setB};
    const [checking, setIsChecking] = React.useState(true);
    console.log(boole);
    console.log(b);
    return (
       <Context.Provider value = {userSetting}> 
        {b ? (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="loginOriginal"
                screenOptions={{
                    headerShown: true,
                }}
            >
                  
                <Stack.Screen name="Home" component={HomeMenu} />
                
                </Stack.Navigator>
                </NavigationContainer>
            ) : (
                
            <NavigationContainer>
                <Stack.Navigator>
                
                <Stack.Screen name="Welcome" component={LoadIn}    
                options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LogIn} />
                <Stack.Screen name="Register" component={SignUp} />
                
                </Stack.Navigator>
            </NavigationContainer>
            )}
            
        </Context.Provider>
    );
};
/*isSignedIn ? (
  <Stack.Screen name="Calendar" component={Calendar1} />
          <>
            <Stack.Screen name="HomeMenu" component={HomeMenu} />
            <Stack.Screen name="Closet" component={Closet} />
          </>
        ) : (
          <>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="LoadIn" component={LoadIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        );*/

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export default App;
