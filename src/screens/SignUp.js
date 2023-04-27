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
    Dimensions,
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
const { height } = Dimensions.get("window");

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
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
                            placeholder="First Name?"
                            placeholderTextColor="#003f5c"
                            onChangeText={(fName) =>
                                setFName(fName)
                            }
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Last Name?"
                            placeholderTextColor="#003f5c"
                            onChangeText={(lName) =>
                                setLName(lName)
                            }
                        />
                    </View>
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

async function registerPress() {
    const [orgEmail, setOE] = useState("");
    let at=false;
    let dot=false;
    if (email.length===0){
        Alert.alert("No email", "Enter an eligible email address", [
            
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    }
    else if (fName.length===0){
        Alert.alert("No First Name", "Enter a first name", [
            
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    }
    else if (lName.length===0){
        Alert.alert("No Last Name", "Enter a last name", [
            
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    }
    else if (password.length===0){
        Alert.alert("No Password", "Enter a password", [
            
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    }
    else{
        try {
        for (let i=0; i<email.length;i++){
            if(email.charAt(i)==="@")
                at=true;
            if(email.charAt(i)==="."&&at) 
                dot=true; 
            
        }
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
        }
        else if (dot){
            Alert.alert("Invalid email format", "Enter a valid email address", [
                
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        } 
        else {
            await setDoc(doc(db, "users", email), {
                password: password,
                fname:fName,
                lNname:lName,
                total: 0,
            });
            console.log("Account Created.");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }}
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
        marginTop: 45,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 50,
        borderRadius: 25,
    },
});
