import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, query,collection,where,getDocs } from "firebase/firestore/lite";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback
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

export default function AddOutfit({route, navigation}) {
  //var [ isPress, setIsPress ] = React.useState(false);

  const [name1, setName] = useState("");
  const [pressed, setPressed] = useState(false);
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed4, setPressed4] = useState(false);
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
  const [weather, setWeather] = useState("");
  const [shirt, setShirt] = useState({});
  const [pants, setPants] = useState([]);
  const [current,setCurrent] =useState(0);
  const [currentP,setCurrentP] =useState(0);
  const [max, setMax] = useState(0);
  const [maxP, setMaxP] = useState(7);
  let name =[];
  const { email } = route.params;
  const [imageS, setImageS] = useState(null);
  const [imageP, setImageP] = useState(null);
  
  async function  pickImageS ()  {
    console.log(max);
    console.log(current);
    try{
      if (current===max){
        setCurrent(0);
      }
      setImageS(shirt[current].url)
      setCurrent(current+1);
      
    }catch{
      setCurrent(0);
      setImageS(shirt[current].url)
    }
  }
  
  async function  pickImageP ()  {
    console.log(maxP);
    console.log(currentP);
    try{
      if (currentP===maxP){
        setCurrentP(0);
      }
      setImageP(pants[currentP].url)
      setCurrentP(currentP+1);
      
    }catch{
      setCurrentP(0);
      setImageP(pants[currentP].url)
    }
  }
  const fetchBlogs = async () => {
    let v =0;
    console.log(email);
    let list = [];
    if (email != null) {
        
      const q = query(collection(db, "users", email, "clothes"), where("type", "==", "Shirt"));
      const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            let myData = doc.data();
            name[v]=myData.url;
            setImageS(name[v])
            console.log(name[v] +"fjn     "+v);
            v=v+1;
            list.push({ ...myData});
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setShirt(list);
        });
      }
      try
       { setImageS(shirt[current].url)
      }catch{
        console.log(current);
      }
      setMax(list.length)
      //console.log(shirt[1].url+"bsdhjfdjh");
      list = [];
      if (email != null) {
        
      const b = query(collection(db, "users", email, "clothes"), where("type", "==", "Pants"));
      const querySnapshot = await getDocs(b);

      querySnapshot.forEach((doc) => {
        let myData = doc.data();
        name[v]=myData.url;
        setImageP(name[v])
        console.log(name[v] +"fjn     "+v);
        v=v+1;
        list.push({ ...myData});
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setPants(list);
        });
      }
      setImageP(pants[current].url)
      setMaxP(list.length);
     
    };
    async function registerPress(name, weather) {
      try {
        let user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
          await setDoc(doc(db, "users", email, "outfits", name1), 
          { name:name1,weather: weather, Shirt: imageS, Pants: imageP });
          console.log("clothing article added");
          navigation.navigate("OutfitList", { email: email })
        } 
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    useEffect(() => {
        fetchBlogs();
        console.log(name[0]+"fortnite");
    }, [])
  //getDownloadURL(ref(storage, 'images/stars.jpg'))
  return (
    
    
    <View style={styles.container}>
      
      <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="ARTICLE NAME"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
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
      
  
      <View style={{ flex: 1,paddingTop:15, paddingBottom: 80, height: 600}}>
        <View style={ {flexDirection:'row', paddingHorizontal:15, justifyContent:"center"}}>
          <Image source={{ uri: imageS }} style={{ width: 200, height: 200 }} />
          <Button
          
          title="-->"
          fontSize="60"
          color="white"
          onPress={pickImageS}
        />
        </View>
        <View style={ {flexDirection:'row', paddingTop:0, paddingHorizontal:15, justifyContent:"center"}}>
          <Image source={{ uri: imageP }} style={{ width: 200, height: 200 }} />
          <Button
          title="-->"
          fontSize="60"
          color="white"
          onPress={pickImageP}
        />
        </View>
     </View>
     <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress(name, weather)}
          >
            <Text style={styles.registerText}>ADD OUTFIT</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C4BA5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "white",
  },
  bruh: {
    backgroundColor: 'blue',
  },
  TextInput: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 10,
    marginLeft: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#276FBF',
    paddingTop: 20
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'right',
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 10,
    color: 'white'
  },
  title2: {
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'black'
  },
  titleType: {
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignItems:'center',
    color: 'white'
  },
  titleWeather: {
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems:'right',
    color: 'white'
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: 'blue'
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
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginTop: 10,
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
    marginTop:10,
  },
});