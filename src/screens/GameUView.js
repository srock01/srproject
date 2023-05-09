import React, { useState, useEffect, useContext,useLayoutEffect } from "react";
import { initializeApp } from "firebase/app";
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from "./context";
import { getFirestore,Timestamp, doc,increment, getDoc, setDoc, deleteDoc, updateDoc,arrayUnion,onSnapshot, query, collection, where, getDocs} from "firebase/firestore";
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

export default function GameUView({route, navigation, navigation:{goBack}}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const myContext=useContext(Context);
  const  email  = myContext.email;

  const {  item, homeI,awayI,hL,aL,yte,name,org} = route.params;

  useFocusEffect(
    () => {  
    if(yte)
      myContext.setSD(false);
    else 
      myContext.setD(false)
    }, 
    
    );
  
  console.log(name+" "+org);
  
  const [c,setC]=useState(true);
  const [c2,setC2]=useState(true);
  const [clothes2,setClothes2]=useState([]);
  const [clothes3,setClothes3]=useState([]);
  const [clothes,setClothes1]=useState([]);
  const [locations,setClothes]=useState([]);
  const [clothes5,setClothes5]=useState([]);
  const [clothes6,setClothes6]=useState([]);
  
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
      console.log("jsdhdf");

    }});
    setB2(true);
};   
const [finale, setFin]=useState(false);
const [shirt, setShirt]=useState();
const [shirt2, setShirt2]=useState();
const [shirt1, setShirt1]=useState(true);
const fetchBlogs9=async()=>{
  console.log(hL+"\n enkfwfn")
  const myDoc = doc(db, "organization", org, "games", item);
  const user = await getDoc(myDoc);
  const user1 = onSnapshot(myDoc,(doc)=>{
    setShirt(user.data().homeS);
    setShirt2(user.data().awayS);
    if(user.data().homeS===-1)
      setShirt1(false)
    if(user.data().final)
      setFin(true)
    setHome(user.get("homeI"));
    setHome1(user.get("home"));
    setAway(user.get("awayI"));
    setAway1(user.get("away"));
    setLocal2(user.get("location"));
    setDateRS(user.get("startDate").toDate());
    setHomeS1(user.get("homeS").toString());
    setAwayS1(user.get("awayS").toString());
  });
}; 
    
useLayoutEffect(() => {
  fetchBlogs();
  setTeams();
  fetchBlogs9();

 }, [])
 const [image, setImage] = 
 useState("https://firebasestorage.googleapis.com/v0/b/srproject-75728.appspot.com/o/pfp?alt=media&token=08061401-3b08-44df-9cb7-d88bf6f53e87");
 const [q, setQ] = 
 useState(0)

 const homeInfo=async()=>{
  const myDoc = doc(db, "organization", org, "teams", homeI);
  const user = await getDoc(myDoc);
  console.log(" gfd\n")
  console.log(user.get("url")+"\nballs")
  const user1 = onSnapshot(myDoc,(doc)=>{
    setClothes5(user.data());
    console.log(user.data().name.length+"\n cock");
    
    console.log(user.data()+"  \n ffortnite");
  });
  setImage(user.get("url"));
  
}; 

 useEffect(() => {
  homeInfo();
}, []);
const awayInfo=async()=>{
  const myDoc = doc(db, "organization", org, "teams", awayI);
  const user = await getDoc(myDoc);
  const user1 = onSnapshot(myDoc,(doc)=>{
    setClothes6(user.data());
  });
}; 

 useEffect(() => {
  awayInfo();
}, []);

  const [prl, setPRL] = useState("");
  let arr=[];
  const [start, setStart] = useState("");
  const [startR, setStartR] = useState("");
  const [end, setEnd] = useState("");
  const [endR, setEndR] = useState("");
  const [location,setLocal]=useState([]);
  const [location2,setLocal2]=useState("");
  const [teams,setTeam]=useState(1);
  const [homeS1, setHomeS1] = useState("-1");
  const [awayS1, setAwayS1] = useState("-1");
  const [playerMax,setMaxPlayer]=useState(1);
  const [player,setMinPlayer]=useState(1);
  const [b1,setB1]=useState(false);
  const [b2,setB2]=useState(true);
  const [home,setHome]=useState("");
  const [away,setAway]=useState("");
  const [home2,setHome2]=useState("");
  const [away2,setAway2]=useState("");
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
            console.log(aL+"\n penisA ");
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
  
  const [dateRS, setDateRS] = useState(new Date())
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateRS(new Date(currentDate));
  };
  let poo="(";
  /*
  */
  let poo1=")";
  

  return (
    <>

      <View style={styles.container}>
        <StatusBar style="auto" />
      <View style={{flex:1,padding:15,marginBottom:10}}>
      <View style={{   flexDirection:"row", }}>
          < View style={{flex:1, }}>
            <Text style={styles.buttonTxt9}>Home Team</Text>        
          </View> 
          < View style={{flex:1,}}>
            <Text style={styles.buttonTxt19}>Away Team</Text> 
          </View>
        </View>
        <View style={{   flexDirection:"row", }}>
          < View style={{paddingLeft:hL===undefined?0:50-(6*hL),flex:1, }}>
            <Text style={styles.buttonTxt5}>{clothes5.name}</Text>        
          </View> 
          < View style={{paddingRight:aL===undefined?0:50-(6*(aL)),}}>
            <Text style={styles.buttonTxt6}>{clothes6.name}</Text> 
          </View>
        </View>
        <View style={{   flexDirection:"row", }}>
          < View style={{ marginRight:"40%", marginLeft:"4%",}}>
            <Text style={styles.buttonTxt3}>{poo}{clothes5.win}-{clothes5.loss}-{clothes5.tie}{poo1}</Text>        
          </View> 
          < View style={{marginRight:"0%",marginLeft:"0%",}}>
          <Text style={styles.buttonTxt3}>{poo}{clothes6.win}-{clothes6.loss}-{clothes6.tie}{poo1}</Text>        
          </View>
        </View>
      

      <View style={{  flexDirection:"row",flex:1,padding:10 }}>
       < View style={{flex:1, marginRight:"35%", marginLeft:"-6%",}}>
        <Image source={{ uri: clothes5.url }} style={{ width: 125, height: 125, borderRadius:100,  }} />
        </View> 
        < View style={{flex:1,marginRight:"0%",marginLeft:"0%"}}>
        <Image source={{ uri: clothes6.url }} style={{ width: 125, height: 125, borderRadius:100, }} />
        </View>
      </View>
      
      
      
      
      </View>
      <View style={{  flexDirection:"row",flex:1,paddingTop:0 }}>

      <Text style={[styles.buttonTxt3,{padding:125,textDecorationLine: 'underline'}]}>AT</Text> 
      </View>
      <Text style={[styles.buttonTxt3,{paddingTop:19}]}></Text>
      <Text style={{...styles.buttonTxt4,paddingBottom:0}}>{dateRS.toLocaleString()}</Text>
      
      <Text style={[styles.buttonTxt1,{textDecorationLine: 'underline',}]}>Game Location</Text>
      <View
        style={styles.dropdown}>
          <Text style={styles.buttonTxt1}> {location2}</Text>
        </View>
          
        
        </View>
    </>
  );
  
};

const styles = StyleSheet.create({
  buttonTxt:{
    alignItems:"center",
    fontSize:26,
    fontWeight:'bold'
  },
  buttonTxt3: {
    fontSize: 22,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
},
  buttonTxt1: {
    fontSize: 28,
    margin: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
},
buttonTxt4: {
  fontSize: 28,
  margin: 10,
  paddingTop: 30,
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
buttonTxt9: {
  fontSize: 18,
  
  paddingLeft: 3,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign:"left"
},
buttonTxt19: {
  fontSize: 18,
  paddingRight: 10,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign:"right"
},
buttonTxt5: {
  fontSize: 22,
  padding: 0,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  textAlign:"left"
},
buttonTxt6: {
  fontSize: 22,
  padding: 0,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  textAlign:"left"
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
    height:480,
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
    backgroundColor: "white",
    borderRadius: 30,
    width: "80%",
    height: 25,
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
    padding: 0,
    fontSize:16,
    textAlign:"center",
    fontWeight:'bold'

    
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
    marginBottom: 45,
  },
  loginBtn: {
    width: "48%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
    marginRight: 10,
    backgroundColor: "white",
  },
  loginBtn1: {
    width: "48%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
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
    textAlign:"center"
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 2,
    height: 2,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 1,
  },
});