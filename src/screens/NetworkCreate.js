import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from "./context";
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc,arrayUnion } from "firebase/firestore/lite";
global.Buffer = global.Buffer || require('buffer').Buffer
import {
  StatusBar, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Alert,
  FlatList

} from "react-native";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL } 
  from 'firebase/storage';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
let a = 0;
export default function NetworkCreate({route, navigation}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const myContext=useContext(Context);
  const  email  = myContext.email;
  const [location,setLocal]=useState()
  const [locations,setLocals]=useState([])
  const [location2,setLocal2]=useState()

  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");

  
  



  const fetchBlogs =  () => {
    
    setLocal2(location);
  }

 
  const fetchBlogs2 =  () => {
    if(a===0&&location2!==''&&location2!==undefined ){
    console.log(a);
    setLocals([location2]);
    a++;
    }
    else if(location2!==''&&location2!==undefined )
    setLocals([...locations,location2]);
  }
  useEffect(() => {
    fetchBlogs2();
}, [location2]);




  async function registerPress() {
    let cuh;
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
          cuh=url;
      })

    }
    catch{
      if(url =""){
        Alert.alert("IMG Upload Failure", "Please Try Again", [
          
          { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log("Incorrect password.");
      }}
    console.log(cuh);
    for(let i=0;i<locations.length;i++){
      console.log(locations[i]+"1");
    }
    let user;
    let bolt =true;

    if(name.length===0){
      Alert.alert("Network Creation Failure", "Enter a name", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log("Creation Failed. User already exists");
   
    }
    else{
      user = await getDoc(doc(db,"organization", name));
    if (user.exists()) {
      bolt =false
        Alert.alert("League Creation Failure", "League with this name exists. Choose a different one", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          console.log("Creation Failed. User already exists");
      } 
      else
    {try {
        await setDoc(doc(db, "organization", name), 
        { name:name,locations:locations,url:cuh,owner:email,members:[email] });
        console.log("clothing article added");
        const washingtonRef = doc(db, "users", email);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(washingtonRef, {
            organizationsOwned: arrayUnion(name)
        });
        await updateDoc(washingtonRef, 
          {  
            orgs:arrayUnion(org)});
        
    } catch (e) {
      console.error("Error adding document: ", e);
    }}}

  }
  const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/srproject-75728.appspot.com/o/pfp?alt=media&token=08061401-3b08-44df-9cb7-d88bf6f53e87");
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
    
    
        await updateDoc(user, {
          total: mom+1
        });
      
  }
 

  return (
    <>
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="ORGANIZATION NAME"
            placeholderTextColor="#007AFF"
            onChangeText={(name) => setName(name)}
          />
        </View>
        
        
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingTop:15}}>
            <View style={{backgroundColor:'white',borderRadius:30}}><Button style={{paddingBottom:35}} title="Pick a Organization Picture" onPress={pickImage} /></View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:35, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingTop:15,borderRadius:100 }} />}
              
          </View>
          
        </View>
      
      <ScrollView style={{height:20,width:'80%',flexDirection:"column", backgroundColor:"white",borderRadius:6}}>
        <View style={{ backgroundColor:"white",  }}>
        {locations[0]===undefined?
          <View style={{alignItems:"center",paddingTop:35}}>
            <Text style={styles.buttonTxt}>ADD LOCATIONS BELOW</Text>
          </View>:locations.map((myItem)=>{
          return(
            <View stle= {{flex:1,flexDirection:"row"}}>
            <Text style={{fontSize:20,flex:1,fontWeight:'bold'}}>{myItem}</Text>
            {myItem !==undefined?(<TouchableWithoutFeedback onPress={() => fetchBlogs3(myItem)}>
            <Ionicons name={'md-trash'} style={{fontSize:32}} color={'blue'} />
            </TouchableWithoutFeedback>):(<View></View>)}
            </View>
          )
        })}
            
        </View>
      </ScrollView> 
        <View style={styles.inputView2}>
            <TextInput
            style={styles.TextInput2}
            placeholder="LOCATION NAMES"
            placeholderTextColor="#007AFF"
            onChangeText={(location) => setLocal(location)}
          />
          <TouchableWithoutFeedback onPress={fetchBlogs}>
          <Ionicons name={'ios-arrow-forward-circle'} style={{fontSize:32}} color={'blue'} />
          </TouchableWithoutFeedback>
        </View>
      
        
        


          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress()}
          >
            <Text style={{fontWeight:'bold',color:"#007AFF"}}>CREATE ORGANIZATION</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
  function fetchBlogs3(name) {
    
    let array3= [...locations]
    const index = array3.indexOf(name);
    console.log(index);
    console.log(name);
    console.log(locations[0]);

  
  
    if (index !== -1) {
      array3.splice(index,1);
      setLocals(array3);
    }
  }
}
 



const styles = StyleSheet.create({
  buttonTxt:{
    alignItems:"center",
    fontSize:36,
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
    height:780,
    backgroundColor: "#1C4BA5",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },

  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginTop: 20,
    alignItems: "center",
  },
 /* <View style={{flex:1, borderRadius:15,width:'80%',borderRadius:8}}>
        <FlatList
          data={locations}
          //   keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View style={{ backgroundColor:"white",flexDirection:"row"}}>
              <Text style={{fontSize:12,}}>{item}</Text>
          </View>
             )}
            />
            </View>*/
  inputView2: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginTop:10,
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
  TextInput2: {
    height: 50,
    flex: 1,
    flexDirection:'row',
    fontWeight:"bold",
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
    paddingBottom: 10,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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