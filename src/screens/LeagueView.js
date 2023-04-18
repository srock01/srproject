import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'; 
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity,TouchableWithoutFeedback,StatusBar,TextInput, ScrollView } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  firebase,
  addDoc,
  get,
  doc,
  getDoc,
  limit,
  query,
  where,
  updateDoc,
  setDoc,
  Timestamp,
  onSnapshot
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL } 
  from 'firebase/storage';
import { color } from 'react-native-reanimated';
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

export default function LeagueView({route, navigation, navigation: { goBack }}) {
  const myContext= useContext(Context);
  let email = myContext.email;
  let a3 =0;
  let org = myContext.nwork;
  let name= myContext.uLeague;
  useLayoutEffect(() => {
    a3++;
    if(route.params!==undefined){
      let l =route.params;
      myContext.setL(l);}
  }, []);
  
  const data = [
    { label: 'Baseball ', value: '1' },
    { label: 'Soccer', value: '2' },
    { label: 'Flag Football', value: '3' },
    { label: 'Basketball', value: '4' },
    { label: 'Volleyball', value: '5' },
    { label: 'Softball', value: '6' },
    { label: 'Roller Hockey', value: '7' },
    { label: 'Ultimate Frisbee', value: '8' },
  ];
  
  console.log(name+" "+org);
  
  const [c,setC]=useState(true);
  const [c2,setC2]=useState(true);

  const [clothes,setClothes1]=useState([]);
  const [locations,setClothes]=useState([]);
  
  const fetchBlogs=async()=>{
    const myDoc = doc(db, "organization", org, "league", name)
    const user = await getDoc(myDoc);
    const user1 = onSnapshot(myDoc,(doc)=>{
    if(doc.data()!==null){
      console.log(user.get("name")+"hufuhudshud");
      console.log(user.get("name"));
      setClothes1(user.data())
      setImage(doc.data().url);
      setName(doc.data().name);
      setLocal(doc.data().locations);
      setMaxPlayer(doc.data().maxPlayer);
      setMinPlayer(doc.data().minPlayer);
      setTeam(doc.data().maxTeam);
      setSport2("Sport: "+doc.data().sport)
      setMaxT("Team Limit: "+doc.data().maxTeam)
      setMaxP("Max Team Size: "+doc.data().maxPlayer)
      setMinP("Min Team Size: "+doc.data().minPlayer)
      setStart("Season Begins: "+doc.data().startDate.toDate().toLocaleDateString())
      setStartR("Registration Opens: "+doc.data().rsDate.toDate().toLocaleString())
      setEnd("Season Ends: "+doc.data().endDate.toDate().toLocaleDateString())
      setEndR("Registration Closes: "+doc.data().reDate.toDate().toLocaleString())
      if(c)
        setSport(doc.data().sport)
      console.log(name1+"jsdhdf");

    }});
    setB2(true);
};    
    
useLayoutEffect(() => {
  fetchBlogs();

 }, [])
 
  let arr=[];
  
  const [location,setLocal]=useState([]);
  const [location2,setLocal2]=useState("");
  const [teams,setTeam]=useState(1);
  const [name1, setName] = useState("");
  const [playerMax,setMaxPlayer]=useState(1);
  const [player,setMinPlayer]=useState(1);
  const [b1,setB1]=useState(false);
  const [b2,setB2]=useState(true);

  const [weather, setWeather] = useState("");
  const [start, setStart] = useState("");
  const [startR, setStartR] = useState("");
  const [end, setEnd] = useState("");
  const [endR, setEndR] = useState("");
  const [type, setType] = useState("");
  const [sport, setSport] = useState(null);
  const [sport2, setSport2] = useState("");
  const [maxP, setMaxP] = useState("");
  const [minP, setMinP] = useState("");
  const [maxT, setMaxT] = useState("");
  const [leagueL,setL]=useState([]);
  let a =2;
  const fetchBlogs3 = async () => {
    
    const unsub = onSnapshot(doc(db, "organization", org), (doc) => {
      let list =[];
      a=2;
      console.log("Current dat12a: ", doc.data().locations[0]);
      for(let i=0;i<doc.data().locations.length;i++)
        {if(i===0){
        list.push({label:doc.data().locations[0],value:1})
      }
      else{
        list.push({label:doc.data().locations[i],value:a})
      a++;
      }}
      setClothes(list);
    });
  };
  useEffect(() => {
    fetchBlogs3();
  }, []);
  
  const fetchBlogs2 =  () => {
    let a= true;
    for(let i=0;i<location.length;i++){
      if(location[i]===location2){
        a=false;
      }
      
    }
      if(a===0&&location2!==''&&location2!==undefined&&a ){
        console.log(a);
        setLocal([location2]);
        a++;
      }
      else if(location2!==''&&location2!==undefined&&a )
        setLocal([...location,location2]);

      console.log(location);
    }
  useEffect(() => {
    fetchBlogs2();
}, [location2]);



  const [image, setImage] = useState(clothes.url);
  
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
  function setName3(){
    if(name!==name1){
    return(
      <View >
        <Text style={styles.TextInput3}>Current: {name}</Text>
      </View>
    );}
  }

  return (
    <>
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.inputView3}>
          
          
          <Text style={styles.TextInput}>League Name: {name}</Text>
        </View>
        
        
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingTop:15}}>
            {b1?<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:15, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingTop:5,borderRadius:100 }} />}
              
          </View>:<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:15, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 175, height: 175, paddingBottom:10,borderRadius:100 }} />}
              
          </View>}
          
        </View>
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={sport2}
            editable={false}
            placeholderTextColor="black"
            onChangeText={(playerMax) => setMaxPlayer(playerMax)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {startR}</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.TextInput}> {endR}</Text>
        </View>
        <View style={styles.inputView2}>
          <Text style={styles.TextInput}> {start}</Text>
        </View>
        <View style={styles.inputView2}>
          <Text style={styles.TextInput}> {end}</Text>         
        </View>
      
      <ScrollView style={{height:20,width:'80%',flexDirection:"column", backgroundColor:"white",borderRadius:6}}>
        <View style={{ backgroundColor:"white",  }}>
        {location[0]===undefined?
          <View style={{alignItems:"center",paddingTop:35}}>
            <Text style={styles.buttonTxt}>NO LOCATIONS SET</Text>
          </View>:location.map((myItem)=>{
          return(
            <View stle= {{flex:1,flexDirection:"row"}}>
            <Text style={{fontSize:20,flex:1,fontWeight:'bold'}}>{myItem}</Text>
            
            </View>
          )
        })}
            
        </View>
      </ScrollView> 
      
      
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={maxT}
            editable={false}
            placeholderTextColor="black"
            onChangeText={(team) => setTeam(team)}
          />
        </View>
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={minP}
            editable={false}
            placeholderTextColor="black"
            onChangeText={(player) => setMinPlayer(player)}
          />
        </View>
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={maxP}
            editable={false}
            placeholderTextColor="black"
            onChangeText={(playerMax) => setMaxPlayer(playerMax)}
          />
        </View>
      
        
        


          
        </View>
      </KeyboardAwareScrollView>
    </>
  );
  
};

const styles = StyleSheet.create({
  buttonTxt:{
    alignItems:"center",
    fontSize:26,
    fontWeight:'bold'
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
    height:975,
    backgroundColor: "#1C4BA5",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },

  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    flewDirection:"row"
  },
  inputView3: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginTop: 20,
    marginBottom: 5,
    alignItems: "center",
    flewDirection:"row"
  },
 
  inputView2: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 30,
    width: "75%",
    height: 45,
    marginTop:10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    
  },

  TextInput: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 15,
    fontSize:16,
  },
  TextInput3: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 10,
    marginLeft: 20,
    fontSize:16,
  },
  TextInput2: {
    height: 50,
    flex: 1,
    flexDirection:'row',
    padding: 10,
    marginLeft: 20,
    fontSize:14,

    
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
  dropdown: {
    margin: 16,
    height: 50,
    borderRadius:8,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width:"90%",
    backgroundColor:"white"
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
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});