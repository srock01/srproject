import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

require("firebase/firestore");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
                        source={require("../../assets/logo2.jpeg")}
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
                        onPress={() => registerPress(email, password)}
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
            await setDoc(doc(db, "users", email), { password: password });
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
        borderRadius: 5,
        borderColor: "white",
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
        marginTop: 20,
        backgroundColor: "white",
    },
    loginOr: {
        paddingTop: 20,
        color: "white",
        fontSize: 15,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 50,
        borderRadius: 25,
    },
});
