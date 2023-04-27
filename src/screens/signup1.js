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
    Alert,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { Context  } from './context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';  
  WebBrowser.maybeCompleteAuthSession();

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



export default function SignUp({navigation,navigation:{goBack}}) {
    const [c, setC] = useState(false);
    
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState([]);
    const [message, setMessage] = React.useState();
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "816172760104-betq1tlvsb56rhc5o0n4ofhvoba3mle1.apps.googleusercontent.com"
      });

    React.useEffect(() => {
        setMessage(JSON.stringify(response));
        if (response?.type === "success") {
          setAccessToken(response.authentication.accessToken);
          
        }
      }, [response]);
    React.useEffect(() => {
        getUserData();
      }, [accessToken]);
    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${accessToken}`}
        });
    
        userInfoResponse.json().then(data => {
          setUserInfo(data);
          setC(true);
         // console.log(userInfo.email)
        });
    }
    React.useEffect(() => {
        if (userInfo!==[])
        setEmail(userInfo.email);
        console.log(email);
      }, [userInfo]);
    
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
                        source={require("../../assets/SL_APP_Icon.png")}
                    />
                    <View style={styles.inputView}>
                
                <TouchableOpacity 
                    style={styles.inputView2}
                    onPress={ () => { promptAsync({useProxy: true, showInRecents: true}) }}
                > 
                <Image 
                style={styles.inputView2}
                source={require("../../assets/b.jpeg")}
                /></TouchableOpacity>
                </View>
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
                            defaultValue={accessToken?email:null}
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
                        onPress={() => registerPress( email, password,fName,lName,navigation)}
                    >
                        <Text style={styles.registerText}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
}

async function registerPress(email, password,fName,lName,navigation) {
    console.log(height);
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
        else if (!dot){
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
            navigation.goBack();
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
        height: 800,
    },

    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    inputView2: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "100%",
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