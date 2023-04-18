import React, { useState, useEffect, useContext,useLayoutEffect } from "react";
import { initializeApp } from "firebase/app";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from "./context";
import { getFirestore,Timestamp, doc, getDoc, setDoc, addDoc, updateDoc,arrayUnion,onSnapshot, query, collection, where, getDocs} from "firebase/firestore";
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

export default function GameAdd({route, navigation}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const myContext=useContext(Context);
  const  email  = myContext.email;
  const org = myContext.o;
  let name= myContext.league;
  
  console.log(name+" "+org);
  
  const [c,setC]=useState(true);
  const [c2,setC2]=useState(true);
  const [clothes2,setClothes2]=useState([]);
  const [clothes3,setClothes3]=useState([]);
  const [clothes,setClothes1]=useState([]);
  const [locations,setClothes]=useState([]);

  const setTeams = async () => {
    let a =0;
    console.log(email+'fjds');
    const list = [];
    const q=query(collection(db, "organization", org, "teams"),where("league","==",name));
    if (email != null) {
      console.log("ghd");
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          
            let myData = doc.data();
            myData.id = doc.id;
            myData.value=a;
            a++;
            list.push({ ...myData });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setClothes2(list);
            setClothes3(list);
        });
    }
};
  const fetchBlogs=async()=>{
    const myDoc = doc(db, "organization", org, "league", name)
    const user = await getDoc(myDoc);
    const user1 = onSnapshot(myDoc,(doc)=>{
    if(doc.data()!==null){
      
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
    
      console.log(user.get("name")+"hufuhudshud");
      console.log(user.get("name"));
      setClothes1(user.data())
      setName(doc.data().name);
      setLocal(doc.data().locations);
      setMaxPlayer(doc.data().maxPlayer);
      setMinPlayer(doc.data().minPlayer);
      setTeam(doc.data().maxTeam);
      setSport2("Current Sport: "+doc.data().sport)
      setMaxT("Team Limit: "+doc.data().maxTeam)
      setMaxP("Max Team Size: "+doc.data().maxPlayer)
      setMinP("Min Team Size: "+doc.data().minPlayer)
      setStart(doc.data().startDate)
      setEnd(doc.data().endDate.toDate())
      if(c)
        setSport(doc.data().sport)
      console.log(name1+"jsdhdf");

    }});
    setB2(true);
};    
    
useLayoutEffect(() => {
  fetchBlogs();
  setTeams();

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
  const [home,setHome]=useState("");
  const [away,setAway]=useState("");
  const [home1,setHome1]=useState();
  const [away1,setAway1]=useState();
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
    let a =0;
    console.log(home+'fjds');
    const list = [];
    const q=query(collection(db, "organization", org, "teams"),where("league","==",name));
    if (email != null) {
      console.log("ghd");
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          
            let myData = doc.data();
            myData.id = doc.id;
            myData.value=a;
            
            if (away!==myData.id){
              if(home===myData.id){
                console.log(home+" penisH " +myData.value);
                setHome1(myData.name);}
              list.push({ ...myData });
              a++;
            }
            
            
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setClothes2(list);
        });
        console.log(list[1]);
    }
    
  };
  useEffect(() => {
    fetchBlogs3();
  }, [away,home]);
  const fetchBlogs5 = async () => {
    let a =0;
    console.log(home+'fjds');
    const list = [];
    const q=query(collection(db, "organization", org, "teams"),where("league","==",name));
    if (email != null) {
      console.log("ghd");
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          
            let myData = doc.data();
            myData.id = doc.id;
            myData.value=a;
            
            if (home!==myData.id){
              if(away===myData.id){
                console.log(away+" penisA "+myData.value);
                setAway1(myData.name);
              }
              list.push({ ...myData });
              a++;
            }
            
              
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setClothes3(list);
        });
    }
    
  };
  useEffect(() => {
    fetchBlogs5();
  }, [home,away]);

  useEffect(() => {
    console.log(home1+" jhghjkdfjkh");
  }, [home1]);
  useEffect(() => {
    console.log(away1+" jhghjkdfjkh");
  }, [away1]);
  
  

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
    try {
      if(c2){
        cuh=clothes.url;
      }
      
      
        await addDoc(collection(db, "organization", org,"games"), 
        { league:name,location:location2,org:org, homeI:home, awayI:away, sport:sport, startDate:Timestamp.fromDate(dateRS), home:home1, away:away1, });
      
      
      if (c){
        setSport(clothes.sport)
      }
       console.log("clothing article added");
        const washingtonRef = doc(db, "organization", org);

        // Atomically add a new region to the "regions" array field.
       /* await updateDoc(washingtonRef, {
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
       navigation.navigate('Manage League',{name:"Manage "+a});
      */} catch (e) {
      console.error("Error adding document: ", e);
    }
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
  
  return (
    <>
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
      <Text style={styles.buttonTxt1}>Home Team</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={clothes2}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder= {home===""?"Select Home" :home1}        
        searchPlaceholder="Search..."
        teams={clothes2}
        onChange={item => {
          setHome(item.id);
          
          
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      <Text style={styles.buttonTxt1}>Away Team</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={clothes3}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder= {away===""?"Select Away" :away1}
        searchPlaceholder="Search..."
        teams={clothes3}
        onChange={item => {
            setAway(item.id);
          
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      <Text style={styles.buttonTxt1}>Game Location</Text>
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
        placeholder="Select game location"
        searchPlaceholder="Search..."
        locations={locations}
        onChange={item => {
          setLocal2(item.label);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
        
        <Text style={styles.buttonTxt1}>Start Time</Text>
      <View style={styles.inputView2}>
          <DateTimePicker
          testID="dateTimePicker"
          value={dateRS}
          mode={"datetime"}
          is24Hour={true}
          onChange={onChange}
        />
        </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress(myContext)}
          >
            <Text style={{fontWeight:'bold',color:"#007AFF", fontSize:30}}>ADD GAME</Text>
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
  buttonTxt1: {
    fontSize: 28,
    margin: 10,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
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
    height:600,
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
    marginTop:5,
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
    margin: 10,
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