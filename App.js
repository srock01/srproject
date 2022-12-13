import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
//import {firebase, db} from './firebase/firebase';
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

//import Clothes from "./src/component/Clothes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeMenu from "./src/screens/HomeMenu";
import Closet from "./src/screens/Closet";
import LoadIn from "./src/screens/LoadIn";
import LogIn from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";
import Article from "./src/screens/Article";
import ForgotPassword from "./src/screens/ForgotPassword";
import CalendarScreen from "./src/screens/Calendar";
import AddArticle from "./src/screens/AddArticle";
import Outfit from "./src/screens/Outfit";
import OutfitList from "./src/screens/OutfitList";
import AddOutfit from "./src/screens/AddOutfit";

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

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const Stack = createStackNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({ children, title }) => {
    const isDarkMode = useColorScheme() === "dark";
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [checking, setIsChecking] = React.useState(true);
    //console.log(users);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="loginOriginal"
                screenOptions={{
                    headerShown: true,
                }}
            >
                <Stack.Screen
                    name="Welcome"
                    component={LoadIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={LogIn} />
                <Stack.Screen name="Register" component={SignUp} />
                <Stack.Screen name="Home" component={HomeMenu} />
                <Stack.Screen name="Closet" component={Closet} />
                <Stack.Screen name="Article" component={Article} />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <Stack.Screen name="AddArticle" component={AddArticle} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Outfit" component={Outfit} />
                <Stack.Screen name="OutfitList" component={OutfitList} />
                <Stack.Screen name="AddOutfit" component={AddOutfit} />
            </Stack.Navigator>
        </NavigationContainer>
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
