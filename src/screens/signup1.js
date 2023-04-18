import React, { createContext, useContext, useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore/lite";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { Context  } from './context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
//const b =useContext(Context)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { height } = Dimensions.get("window");
//const auth = getAuth();
let val;



export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <StatusBar style="auto" />

                    <Image
                        style={styles.image}
                        source={require("../../assets/SL_APP_Icon.png")}
                    />

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) =>
                                setEmail(email.toLowerCase())
                            }
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => registerPress( email, password)}
                    >
                        <Text style={styles.registerText}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
}

async function registerPress(email, password) {
    try {
        let user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
            Alert.alert("Sign Up Failure", "User already exists", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            console.log("Creation Failed. User already exists");
        } else {
            await setDoc(doc(db, "users", email), {
                password: password,
                total: 0,
            });
            console.log("Account Created.");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C4BA5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        borderColor: "#1C4BA5",
        paddingBottom: "17%",
        height: height,
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
        textAlign: "center",
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: "white",
    },

    DripOrDrownText: {
        color: "white",
        fontSize: "35px",
        fontWeight: "bold",
        paddingBottom: 100,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        marginTop: 5,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 50,
        marginTop: 20,
        borderRadius: 25,
    },
});