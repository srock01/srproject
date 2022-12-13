import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
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

export default function LogIn({ navigation }) {
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
                            keyboardType="email-address"
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
                        onPress={() => navigation.navigate("Forgot Password")}
                    >
                        <Text style={styles.forgot_button}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => loginPress(email, password, navigation)}
                    >
                        <Text style={styles.registerText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
}

async function loginPress(email, password, navigation) {
    let user = await getDoc(doc(db, "users", email));
    if (user.exists()) {
        if (password === (await user.get("password"))) {
            //login to homepage
            navigation.navigate("Home", { email: email });
            console.log("Login Successful.");
        } else {
            //incorrect password
            Alert.alert("Login Failure", "Incorrect password", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            console.log("Incorrect password.");
        }
    } else {
        Alert.alert("Login Failure", "User does not exist", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log("User does not exist.");
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
        paddingBottom: "20%",
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
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 50,
        borderRadius: 25,
    },
});
