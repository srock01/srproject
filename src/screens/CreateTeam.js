import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from "./context";
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc,arrayUnion,onSnapshot, collection, increment } from "firebase/firestore";
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
const coachOnly = [
  { label: 'Player Manager ', value: '1' },
  { label: 'Coach Only', value: '2' },
];
const acceptingFAs = [
  { label: 'YES ', value: '1' },
  { label: 'NO', value: '2' },
];
export default function CreateTeam({route, navigation, navigation:{goBack}}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const myContext=useContext(Context);
  const  email  = myContext.email;
  const {  league,org} = route.params;

  let arr=[];
  const [location,setLocal]=useState([]);
  const [location2,setLocal2]=useState("");
  const [locations,setLocations]=useState([]);
  const [clothes,setClothes]=useState([]);

  const [teams,setTeam]=useState(1);
  const [playerMax,setMaxPlayer]=useState(1);
  const [player,setMinPlayer]=useState(1);
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [sport, setSport] = useState(null);
  const [sport2, setSport2] = useState(null);
  const [c,setC]=useState(true);
  let a =2;
  const fB = async () => {
    let list1=[];
    let q;
    for(let j=0;j<clothes.length;j++){
      
      let user1 = await getDoc(doc(db, "users", clothes[j].label));
      console.log();
      q = user1.get("fname")+" "+user1.get("lname")+" ("+clothes[j].label+")"
      list1.push({label:q,value:clothes[j].value})
    }
    setLocations(list1);

  }
  useEffect(() => {
    fB();
  }, [clothes]);
  const fetchBlogs = async () => {
    
    const unsub = onSnapshot(doc(db, "organization", org), (doc) => {
      let list =[];
      a=1;
      console.log("Current dat12a: ", doc.data().locations.length);
      for(let i=0;i<doc.data().members.length;i++)
        {if(i===0&&doc.data().members[0]!==email){
        list.push({label:doc.data().members[0],value:1})
        a++;
      }
      else{
        if(doc.data().members[i]!==email){console.log(doc.data().members[i]+'hubbba')
        list.push({label:doc.data().members[i],value:a})
      a++;}
      }}
      setClothes(list);
    });
  };
  useEffect(() => {
    fetchBlogs();
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



 




  async function registerPress() {
    let cuh;
    let mom;
    let user1 = await getDoc(doc(db, "users", email));
      if (user1.exists()) {
        mom =user1.get("total")-1;
      } 
    try{
      if(c){
        cuh="https://firebasestorage.googleapis.com/v0/b/srproject-75728.appspot.com/o/pfp?alt=media&token=08061401-3b08-44df-9cb7-d88bf6f53e87"
      }
      else{
          
      await getDownloadURL(ref(storage, 'image/'+email+mom))
      
      .then((url) => {
          console.log(url);
          console.log("test123");
          cuh=url;
      })
    }

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
    let cv;
    let b= false;
    let league1 = await getDoc(doc(db, "organization", org,"league",league));
      if (league1.exists()) {
        cv =league1.get("maxTeam");
        if(cv===league1.get("currentTeams"))
          b=true;
      } 
    try {
      if(b)
        throw new Error('League is already full');
      let pe=1;
      let pr=false;
      let pq=email;
        if(sport2==="YES")
          pr=true;
      let p=false;
        if(sport==="Coach Only"){
          p=true;
          pe=0;
          pq=null;
        }
        await addDoc(collection(db, "organization", org,"teams"), 
        { name:name,league:league,url:cuh,owner:email, 
          currentPlayer:pe,coachO:p, aFA:pr, Players:[pq],org:org });
        console.log("clothing article added");
        await addDoc(collection(db, "users", email,"teams"), 
        { name:name,league:league,url:cuh, 
          org:org,isManager:true});
        const washingtonRef = doc(db, "organization", org,"league",league);

        // Atomically add a new region to the "regions" array field.
      await updateDoc(washingtonRef, {
           currentTeams: increment(1)
        });
      navigation.goBack();    
  } catch (e) {
      Alert.alert("Creation Failure", "Stop", [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
        },
    ]);
    console.log("Incorrect password.");
    }

  }
  const [image, setImage] = 
  useState("https://firebasestorage.googleapis.com/v0/b/srproject-75728.appspot.com/o/pfp?alt=media&token=08061401-3b08-44df-9cb7-d88bf6f53e87");
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
      setC(false)
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
            placeholder="TEAM NAME"
            placeholderTextColor="#007AFF"
            onChangeText={(name) => setName(name)}
          />
        </View>
        
        
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingTop:15}}>
            <View style={{backgroundColor:'white',borderRadius:30}}><Button style={{paddingBottom:35}} title="Pick a Team Picture" onPress={pickImage} /></View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:35, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingTop:15,borderRadius:100 }} />}
              
          </View>
          
        </View>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={coachOnly}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Player Manger/Coach Only"
        searchPlaceholder="Search..."
        sport={sport}
        onChange={item => {
          setSport(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={acceptingFAs}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Auto-Accept Free Agents?"
        searchPlaceholder="Search..."
        sport={sport2}
        onChange={item => {
          setSport2(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      
      <ScrollView style={{height:20,width:'80%',flexDirection:"column", backgroundColor:"white",borderRadius:6}}>
        <View style={{ backgroundColor:"white",  }}>
        {location[0]===undefined?
          <View style={{alignItems:"center",paddingTop:15}}>
            <Text style={styles.buttonTxt}>INVITE TEAMMATES BELOW</Text>
          </View>:location.map((myItem)=>{
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
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={locations}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Invite Teammates"
        searchPlaceholder="Search..."
        locations={locations}
        onChange={item => {
          setLocal2(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
        
      
        
        


          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress()}
          >
            <Text style={{fontWeight:'bold',color:"#007AFF"}}>CREATE TEAM</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
  function fetchBlogs3(name) {
    
    let array3= [...location]
    const index = array3.indexOf(name);
    console.log(index);
    console.log(name);
    console.log(location[0]);

  
  
    if (index !== -1) {
      array3.splice(index,1);
      setLocal(array3);
    }
  }
}
 



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
    height:950,
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