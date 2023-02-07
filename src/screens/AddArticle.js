import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import * as ImagePicker from 'expo-image-picker';

import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc } from "firebase/firestore/lite";
global.Buffer = global.Buffer || require('buffer').Buffer
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Alert,

} from "react-native";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL } 
  from 'firebase/storage';

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
const storage = getStorage(app);

export default function AddArticle({route, navigation}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const { email } = route.params;
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");
  const [size, setSize] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [pressed, setPressed] = useState(false);
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed4, setPressed4] = useState(false);
  const [pressedS, setPressedS] = useState(false);
  const [pressed1S, setPressed1S] = useState(false);
  const [pressed2S, setPressed2S] = useState(false);
  const [pressed4S, setPressed4S] = useState(false);
  const [pressed3S, setPressed3S] = useState(false);
  const [pressed5S, setPressed5S] = useState(false);
  const [pressedT, setPressedT] = useState(false);
  const [pressed1T, setPressed1T] = useState(false);
  const [pressed2T, setPressed2T] = useState(false);
  
  const onPress4 = () => {
    pressed4 ? setWeather(""): setWeather("HOT");
    pressed4 ? setPressed4(true): setPressed(false);
    pressed4 ? setPressed4(true): setPressed1(false);
    pressed4 ? setPressed4(true): setPressed2(false);
    pressed4 ? setPressed4(false): setPressed4(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress = () => {
    pressed ? setWeather(""): setWeather("Warm");
    pressed ? setPressed(true): setPressed1(false);
    pressed ? setPressed(true): setPressed2(false);
    pressed ? setPressed(true): setPressed4(false);
    pressed ? setPressed(false): setPressed(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress1 = () => {
    pressed1 ? setWeather(""): setWeather("Cool");
    pressed1 ? setPressed1(true): setPressed2(false);
    pressed1 ? setPressed1(true): setPressed(false);
    pressed1 ? setPressed1(true): setPressed4(false);
    pressed1 ? setPressed1(false): setPressed1(true);
    console.log(weather);
    
    console.log(weather);
    
  };
  const onPress2 = () => {
    pressed2 ? setWeather(""): setWeather("Cold");
    pressed2 ? setPressed2(true): setPressed(false);
    pressed2 ? setPressed2(true): setPressed1(false);
    pressed2 ? setPressed2(true): setPressed4(false);
    pressed2 ? setPressed2(false): setPressed2(true);
    console.log(weather);
    
    console.log(weather);
  };
  //dfklsdkjlfhjksdhjkdf
  const onPress4S = () => {
    pressed4S ? setSize(""): setSize("XS");
    pressed4S ? setPressed4S(true): setPressedS(false);
    pressed4S ? setPressed4S(true): setPressed1S(false);
    pressed4S ? setPressed4S(true): setPressed2S(false);
    pressed4S ? setPressed4S(true): setPressed3S(false);
    pressed4S ? setPressed4S(true): setPressed5S(false);
    pressed4S ? setPressed4S(false): setPressed4S(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPressS = () => {
    pressedS ? setSize(""): setSize("S");
    pressedS ? setPressedS(true): setPressed1S(false);
    pressedS ? setPressedS(true): setPressed2S(false);
    pressedS ? setPressedS(true): setPressed4S(false);
    pressedS ? setPressedS(true): setPressed3S(false);
    pressedS ? setPressedS(true): setPressed5S(false);
    pressedS ? setPressedS(false): setPressedS(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress1S = () => {
    pressed1S ? setSize(""): setSize("M");
    pressed1S ? setPressed1S(true): setPressed2S(false);
    pressed1S ? setPressed1S(true): setPressedS(false);
    pressed1S ? setPressed1S(true): setPressed4S(false);
    pressed1S ? setPressed1S(true): setPressed3S(false);
    pressed1S ? setPressed1S(true): setPressed5S(false);
    pressed1S ? setPressed1S(false): setPressed1S(true);
    console.log(weather);
    
    console.log(weather);
    
  };
  const onPress2S = () => {
    pressed2S ? setSize(""): setSize("L");
    pressed2S ? setPressed2S(true): setPressedS(false);
    pressed2S ? setPressed2S(true): setPressed1S(false);
    pressed2S ? setPressed2S(true): setPressed4S(false);
    pressed2S ? setPressed2S(true): setPressed3S(false);
    pressed2S ? setPressed2S(true): setPressed5S(false);
    pressed2S ? setPressed2S(false): setPressed2S(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress3S = () => {
    pressed3S ? setSize(""): setSize("XL");
    pressed3S ? setPressed3S(true): setPressedS(false);
    pressed3S ? setPressed3S(true): setPressed1S(false);
    pressed3S ? setPressed3S(true): setPressed4S(false);
    pressed3S ? setPressed3S(true): setPressed2S(false);
    pressed3S ? setPressed3S(true): setPressed5S(false);
    pressed3S ? setPressed3S(false): setPressed3S(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress5S = () => {
    pressed5S ? setSize(""): setSize("XXL");
    pressed5S ? setPressed5S(true): setPressedS(false);
    pressed5S ? setPressed5S(true): setPressed1S(false);
    pressed5S ? setPressed5S(true): setPressed4S(false);
    pressed5S ? setPressed5S(true): setPressed2S(false);
    pressed5S ? setPressed5S(true): setPressed3S(false);
    pressed5S ? setPressed5S(false): setPressed5S(true);
    console.log(weather);
    
    console.log(weather);
  };

  const onPressT = () => {
    pressedT ? setType(""): setType("Shirt");
    pressedT ? setPressedT(true): setPressed1T(false);
    pressedT ? setPressedT(true): setPressed2T(false);
    pressedT ? setPressedT(false): setPressedT(true);
    console.log(weather);
    
    console.log(weather);
  };
  const onPress1T = () => {
    pressed1T ? setType(""): setType("Pants");
    pressed1T ? setPressed1T(true): setPressed2T(false);
    pressed1T ? setPressed1T(true): setPressedT(false);
    pressed1T ? setPressed1T(false): setPressed1T(true);
    console.log(weather);
    
    console.log(weather);
    
  };
  const onPress2T = () => {
    pressed2T ? setType(""): setType("Dress");
    pressed2T ? setPressed2T(true): setPressedT(false);
    pressed2T ? setPressed2T(true): setPressed1T(false);
    pressed2T ? setPressed2T(false): setPressed2T(true);
    console.log(weather);
    
    console.log(weather);
  };
  


  async function registerPress(name, weather) {
    try {
      let user = await getDoc(doc(db, "users", email));
      if (user.exists()) {
        await setDoc(doc(db, "users", email, "clothes", name), 
        { name:name,type:type,weather: weather, size: size, url: url });
        console.log("clothing article added");
        navigation.navigate("Closet", { email: email })
      } 
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const [image, setImage] = useState(null);
  async function  pickImage ()  {
    let mom;
    let user1 = await getDoc(doc(db, "users", email));
      if (user1.exists()) {
        mom =user1.get("total");
      } 
    let result
    // No permissions request is necessary for launching the image library
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    var inputPath = {uri: result.assets[0].uri};
    let user = doc(db, "users", email);
    const reference = ref(storage, 'image/'+email+mom);
    
    try{
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      uploadBytes(reference, bytes);
    }catch{
      console.error("Error adding document: ", e);
    }
    
        /*.catch((error) => {
          console.log("test");
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });*/
        await updateDoc(user, {
          total: mom+1
        });
      
  }
  async function  pickImageAgain ()  {
    let mom;
    let user1 = await getDoc(doc(db, "users", email));
      if (user1.exists()) {
        mom =user1.get("total")-1;
      } 
    try{
      await getDownloadURL(ref(storage, 'image/'+email+mom))
      
      .then((url) => {
          console.log(url);
          console.log("test123");
          setUrl(url)
      })

    }
    catch{
      if(url =""){
        Alert.alert("IMG Upload Failure", "Please Try Again", [
          
          { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log("Incorrect password.");
      }}

  }
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="ARTICLE NAME"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>
        
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <Button title="Confirm Image" onPress={pickImageAgain} />
          </View>
          
        </View>
        <View style={styles.inputView2}>
          <TouchableWithoutFeedback onPress={onPressT}>
            <View style={pressedT? styles.btnNormal:styles.btnPress}>
              <Text> SHIRT </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress1T}>
            <View style={pressed1T? styles.btnNormal:styles.btnPress}>
              <Text> PANTS </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress2T}>
            <View style={pressed2T? styles.btnNormal:styles.btnPress}>
              <Text> DRESS </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputView2}>
          
          <TouchableWithoutFeedback onPress={onPress4}>
            <View style={pressed4? styles.btnNormal:styles.btnPress}>
              <Text style={pressed4? styles.buttonTxt:styles.buttonTxt1}> HOT </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={pressed? styles.btnNormal:styles.btnPress}>
              <Text>WARM</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress1}>
            <View style={pressed1? styles.btnNormal:styles.btnPress}>
              <Text>COOL</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress2}>
            <View style={pressed2? styles.btnNormal:styles.btnPress}>
              <Text> COLD</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        <View style={styles.inputView2}>
          <TouchableWithoutFeedback onPress={onPress4S}>
            <View style={pressed4S? styles.btnNormal:styles.btnPress}>
              <Text style={pressed4S? styles.buttonTxt:styles.buttonTxt1}> XS </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressS}>
            <View style={pressedS? styles.btnNormal:styles.btnPress}>
              <Text> S </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress1S}>
            <View style={pressed1S? styles.btnNormal:styles.btnPress}>
              <Text> M </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress2S}>
            <View style={pressed2S? styles.btnNormal:styles.btnPress}>
              <Text> L </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress3S}>
            <View style={pressed3S? styles.btnNormal:styles.btnPress}>
              <Text> XL </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress5S}>
            <View style={pressed5S? styles.btnNormal:styles.btnPress}>
              <Text> XXL </Text>
            </View>
          </TouchableWithoutFeedback>

        </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress(name, weather)}
          >
            <Text style={styles.registerText}>ADD ARTICLE</Text>
          </TouchableOpacity>
        </View>
    </>
  );
}



const styles = StyleSheet.create({
  buttonTxt:{
    color:"red",
  },
  buttonTxt1:{
  },
  btnNormal: {
    borderColor:"red",
    borderWidth: 1,
    padding:10,
    borderRadius: 10,
    height: 40,
  },
  btnPress: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    padding:10,
    height: 40,
  },
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
    marginTop: 50,
    alignItems: "center",
  },
  inputView2: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },

  TextInput: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
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
