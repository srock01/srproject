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
    Pressable,
    TouchableOpacity,
    Alert,
    Dimensions,
    Button
    
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

  import * as Google from 'expo-auth-session/providers/google';
  import * as WebBrowser from 'expo-web-browser';
  
  WebBrowser.maybeCompleteAuthSession();
const {height} = Dimensions.get("window");

require("firebase/firestore");
let val;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let b =false;


export default function LogIn({ navigation, navigation:{goBack} }) {
    const [c, setC] = useState(false);
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
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
    

    
    function bruh2(){
        getUserData();
    }

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

      
    
    async function getUserData2(myContext) {  
    console.log(userInfo.email+"jgkhsjkhdhjk");
    let user = await getDoc(doc(db, "users", userInfo.email));
    if (user.exists()) {

        //setPassword(await user.get("password"));
            //login to homepage
            
           // console.log(myContext.boole);
            console.log(myContext.email);
            b = true;
            if(b){
                myContext.setE(userInfo.email);
                myContext.setBoole({...myContext.boole,value:true});
                fortnite2(myContext,b,userInfo.email)
            }

           // navigation.navigate("Home", { email: email });
         
    }
    else{
        Alert.alert("Login Failure", "User does not exist", [
            {
                text: "Retry",
                onPress: () => navigation.goBack(),
                style: "cancel",
            },
        ]);
        console.log("Incorrect password.");
    }
     
    }
  
    function showUserInfo() {
      if (userInfo) {
        return (
          <View style={styles.userInfo}>
            <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
            <Text>Welcome {userInfo.name}</Text>
            <Text>{userInfo.email}</Text> 
          </View>
        );
      }
    }

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
                            placeholder={accessToken? userInfo.email:"Email"}
                            placeholderTextColor="#003f5c"
                            keyboardType="email-address"
                            onChangeText={(email) =>
                                setEmail(email.toLowerCase())
                            }
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={accessToken?[{fontSize:20},{fontWeight:'bold'},styles.TextInput]:styles.TextInput}
                            placeholder={accessToken? "•••••":"Password"}
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => {userInfo.email!==undefined?getUserData2(myContext):fortnite(myContext,email,password,navigation)}}
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
}
function fortnite2(myContext, b, email){
    if(b){
        console.log(myContext.email);
        console.log(myContext.boole+'gkjndj');
        myContext.setE(email);
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
            console.log(myContext.email+'djhfdjh');
            b = true;
            if(b){
                myContext.setE({ ...myContext.email, value: email });
                myContext.setBoole({...myContext.boole,value:true});
                fortnite2(myContext,b, email)
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
    inputView2: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        
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
        marginBottom: 20,
        borderRadius: 25,
    },
});
