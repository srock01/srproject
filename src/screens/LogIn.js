import React, { useState, useContext,  } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context } from './context';

import {
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
    Dimensions,
    
} from "react-native";
const firebaseConfig = {
    apiKey: "AIzaSyB2FzOefuDJNQHq1QLNs0dZJ5nsSeq-JyA",
    authDomain: "srproject-75728.firebaseapp.com",
    projectId: "srproject-75728",
    storageBucket: "srproject-75728.appspot.com",
    messagingSenderId: "920612695893",
    appId: "1:920612695893:web:dff9096bd171cca13709dc",
    measurementId: "G-Z5ZCFJCV52"
  };


const {height} = Dimensions.get("window");

require("firebase/firestore");
let val;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let b =false;

export default function LogIn({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const myContext = useContext(Context);
    return (
        <>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <StatusBar style="auto" />

                    <Image
                        style={styles.image}
                        source={require("/Users/seanrock/Downloads/srproject/assets/SL_APP_Icon.png")}
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
                        onPress={() => fortnite(myContext,email, password,navigation)}
                    >
                        <Text style={styles.registerText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
}
function fortnite(myContext,email,password,navigation){
    
    

    loginPress(myContext,email,password,navigation);
    var start = new Date().getTime();
    var end = start;
    while(end < start + 1000) {
     end = new Date().getTime();
    }
    console.log(b+"b");
    
}
function fortnite2(myContext, b){
    if(b){
        console.log(myContext.email);
        console.log(myContext.boole+'gkjndj');
        
        myContext.setB(true);
       // navigation.navigate("Register", { email: email });
    }
}
async function loginPress(myContext,email, password, navigation) {
   // const myContext = useContext(Context);
    let user = await getDoc(doc(db, "users", email));
    if (user.exists()) {
        if (password === (await user.get("password"))) {
            //login to homepage
            
           // console.log(myContext.boole);
            console.log(myContext.email);
            b = true;
            if(b){
                myContext.setE({ ...myContext.email, value: email });
                myContext.setBoole({...myContext.boole,value:true});
                fortnite2(myContext,b)
            }

           // navigation.navigate("Home", { email: email });
            
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
