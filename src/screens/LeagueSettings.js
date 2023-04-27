import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'; 
import { View, Text, Alert, StyleSheet, Image, Button, FlatList, TouchableOpacity,TouchableWithoutFeedback,StatusBar,TextInput, ScrollView } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function LeagueSettings({route, navigation, navigation: { goBack }}) {
  const myContext= useContext(Context);
  let email = myContext.email;
  let a3 =0;
  let org = myContext.o;
  let name= myContext.league;
  useLayoutEffect(() => {
    
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
      setLocal(doc.data().locations);
      setMaxPlayer(doc.data().maxPlayer);
      setMinPlayer(doc.data().minPlayer);
      setTeam(doc.data().maxTeam);
      setSport2("Current Sport: "+doc.data().sport)
      setMaxT("Team Limit: "+doc.data().maxTeam)
      setMaxP("Max Team Size: "+doc.data().maxPlayer)
      setMinP("Min Team Size: "+doc.data().minPlayer)
      setStart("Season Begins: "+doc.data().startDate.toDate().toLocaleDateString())
      setStartR("Registration Opens: "+doc.data().rsDate.toDate().toLocaleString())
      setEnd("Season Ends: "+doc.data().endDate.toDate().toLocaleDateString())
      setEndR("Registration Closes: "+doc.data().reDate.toDate().toLocaleString())
      setDateS(doc.data().startDate.toDate())
      setDateE(doc.data().endDate.toDate())
      setDateRS(doc.data().rsDate.toDate())
      setDateRE(doc.data().reDate.toDate())
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
  const [start, setStart] = useState("");
  const [startR, setStartR] = useState("");
  const [end, setEnd] = useState("");
  const [endR, setEndR] = useState("");
  const [location,setLocal]=useState([]);
  const [location2,setLocal2]=useState("");
  const [teams,setTeam]=useState(1);
  const [name1, setName] = useState("");
  const [playerMax,setMaxPlayer]=useState(1);
  const [player,setMinPlayer]=useState(1);
  const [b1,setB1]=useState(false);
  const [b2,setB2]=useState(true);

  const [weather, setWeather] = useState("");
  const [size, setSize] = useState("");
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
      console.log("Current dat12a: ", doc.data().locations.length);
      for(let i=0;i<doc.data().locations.length;i++)
        {if(i===0){
        list.push({label:doc.data().locations[0],value:1})
      }
      else{
        console.log(doc.data().locations[i]+'hubbba')
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

  async function registerPress(myContext) {
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
    console.log(name+" "+name1)
    let user;
    let bolt =true;

    if(name1.length!==0){
      user = await getDoc(doc(db,"organization", org,"league",name1));
    if (user.exists()) {
      bolt =false
        Alert.alert("League Creation Failure", "League with this name exists. Choose a different one", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          console.log("Creation Failed. User already exists");
      }} 
      if(bolt) 
    {
      if(c2){
        cuh=clothes.url;
      }
      let a =name1;
      console.log(name+" 445433"+name1)
      if (teams<clothes.currentTeams){
        Alert.alert("Current Teams Exceed Max","Change Max Teams or Leave Previous Value",  [
          { text: "OK", onPress: console.log("bruhg") },
        ]); 
      }  
      else{  
        if(name1.length===0){
          a= name;
          await setDoc(doc(db, "organization", org,"league",name), 
          { name:name,locations:location,url:cuh,owner:email, minPlayer:player,maxPlayer:playerMax,maxTeam:teams,currentTeams:clothes.currentTeams, sport:sport, startDate:Timestamp.fromDate(dateS), endDate:Timestamp.fromDate(dateE),rsDate:dateRS, reDate:dateRE });

        }
        else{
          await setDoc(doc(db, "organization", org,"league",name1), 
          { name:name1,locations:location,url:cuh,owner:email, minPlayer:player,maxPlayer:playerMax,maxTeam:teams,currentTeams:clothes.currentTeams, sport:sport, startDate:Timestamp.fromDate(dateS), endDate:Timestamp.fromDate(dateE),rsDate:dateRS, reDate:dateRE });
        }
      if (c){
        setSport(clothes.sport)
      }
       console.log("clothing article added");
        const washingtonRef = doc(db, "organization", org);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(washingtonRef, {
           leagues: arrayUnion(a)
        });
      if(name!==name1&&a===name1){
        await updateDoc(washingtonRef, {
          leagues: arrayRemove(name)
       });
       
       await deleteDoc(doc(db, "organization", org,"league",name));
       }
       myContext.setL(a);
       setB2(false);
       setSport2("Current Sport: "+ sport)

      setMaxT("Team Limit: "+teams)
      setMaxP("Max Team Size: "+playerMax)
      setMinP("Min Team Size: "+player)
      setC2(true)
       console.log(myContext.league+"hdsh")
       navigation.navigate('Manage League',{name:"Manage "+a});}
    }
  }

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
      setC2(false);
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
  const [dateRS, setDateRS] = useState(new Date())
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateRS(new Date(currentDate));
  };
  const [dateRE, setDateRE] = useState(new Date())
  const onChange1 = (event, selectedDate) => {
    
    const currentDate = selectedDate;  
    setDateRE(new Date(currentDate));
  };
  const [dateS, setDateS] = useState(new Date())
  const onChange2 = (event, selectedDate) => {
    
    selectedDate.setHours(0,0,0,0)
    const currentDate = selectedDate;
    console.log(selectedDate)

    setDateS(new Date(currentDate));
    console.log(Timestamp.fromDate(new Date(currentDate))+"ahhhh")
  };
  const [dateE, setDateE] = useState(new Date())
  const onChange3 = (event, selectedDate) => {
    selectedDate.setHours(23,59,59,0)
    const currentDate = selectedDate;
    setDateE(new Date(currentDate));
  };
  return (
    <>
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.inputView}>
          {setName3}
          <TextInput
            style={styles.TextInput}
            placeholder={"League Name: "+name}
            editable={false}
            placeholderTextColor="black"
            onChangeText={(name) => setName(name)}
          />
        </View>
        
        
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingTop:15}}>
            <View style={{backgroundColor:'white',borderRadius:30}}><Button style={{paddingBottom:35}} title="Update League Picture?" onPress={pickImage} /></View>
            {b1?<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:35, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingTop:15,borderRadius:100 }} />}
              
          </View>:<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',paddingTop:35, paddingBottom:10}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingTop:15,borderRadius:100 }} />}
              
          </View>}
          
        </View>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= {c?sport2:sport }
        searchPlaceholder="Search..."
        sport={sport}
        onChange={item => {
          console.log(sport)
          if(item.label!==sport)
            setC(false)
          else if (item.label===sport&&c)
            setC(false)
          else
            setC(true)
          setSport(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      
      <ScrollView style={{height:20,width:'80%',flexDirection:"column", backgroundColor:"white",borderRadius:6}}>
        <View style={{ backgroundColor:"white",  }}>
        {location[0]===undefined?
          <View style={{alignItems:"center",paddingTop:35}}>
            <Text style={styles.buttonTxt}>ADD LOCATIONS BELOW</Text>
          </View>:location.map((myItem)=>{
          return(
            <View stle= {{flex:1,flexDirection:"row"}}>
            <Text style={{fontSize:20,flex:1,fontWeight:'bold'}}>{myItem}</Text>
            {myItem !==undefined?(<TouchableWithoutFeedback onPress={() => fetchBlogs4(myItem)}>
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
        placeholder="Select game locations"
        searchPlaceholder="Search..."
        locations={locations}
        onChange={item => {
          setLocal2(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={maxT}
            placeholderTextColor="#007AFF"
            onChangeText={(teams) => setTeam(parseInt(teams))}
          />
        </View>
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={minP}
            placeholderTextColor="#007AFF"
            onChangeText={(player) => setMinPlayer(parseInt(player))}
          />
        </View>
        <View style={styles.inputView2}>
            <TextInput
            keyboardType="numeric"
            style={styles.TextInput2}
            placeholder={maxP}
            placeholderTextColor="#007AFF"
            onChangeText={(playerMax) => setMaxPlayer(parseInt(playerMax))}
          />
        </View>
        <View style={styles.inputDate}>
        <Text style={styles.buttonTxt2}>{start}</Text>
          <DateTimePicker
          testID="dateTimePicker"
          value={dateS}
          mode={"date"}
          is24Hour={true}
          onChange={onChange2}
        />
        </View>
      <View style={styles.inputDate}>
        <Text style={styles.buttonTxt2}>{end}</Text>
          <DateTimePicker
          testID="dateTimePicker"
          value={dateE}
          mode={"date"}
          is24Hour={true}
          onChange={onChange3}
        />
     </View>
      <View style={styles.inputView3}>
        <Text style={styles.buttonTxt2}>{startR}</Text>
          <DateTimePicker
          testID="dateTimePicker"
          value={dateRS}
          mode={"datetime"}
          is24Hour={true}
          onChange={onChange}
        />
        </View>
      <View style={styles.inputView3}>
        <Text style={styles.buttonTxt2}>{endR}</Text>
          <DateTimePicker
          testID="dateTimePicker"
          value={dateRE}
          mode={"datetime"}
          is24Hour={true}
          onChange={onChange1}
        />
        </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress(myContext)}
          >
            <Text style={{fontWeight:'bold',color:"#007AFF"}}>UPDATE LEAGUE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
  function fetchBlogs4(name) {
    
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
};

const styles = StyleSheet.create({
  buttonTxt:{
    alignItems:"center",
    fontSize:26,
    fontWeight:'bold'
  },
  buttonTxt2: {
    fontSize: 13,
    margin: 5,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#007AFF",
},
inputDate: {
  flexDirection:"row",
  backgroundColor: "white",
  borderRadius: 30,
  width: "80%",
  height: 45,
  marginTop: 5,
  marginBottom: 10,
  alignItems: "center",
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
    height:1350,
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
    marginTop: 20,
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
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  inputView3: {
    flexDirection:"column",
    backgroundColor: "white",
    borderRadius: 30,
    width: "97%",
    height: 75,
    marginTop:7,
    marginBottom: 7,
    justifyContent: "center",
    alignItems: "center",
    
  },
  TextInput: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 10,
    marginLeft: 20,
    fontSize:24,
    fontWeight:"bold"
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
    color:"#007AFF"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"#007AFF"
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