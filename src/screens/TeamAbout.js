import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'; 
import { View, Text, StyleSheet, Image, Button, FlatList, Alert,TouchableOpacity, ScrollView  } from 'react-native';
import { initializeApp } from "firebase/app";
import { useFocusEffect } from '@react-navigation/native';
import { Context } from './context';

import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  firebase,
  addDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  get,
  doc,
  getDoc,
  limit,
  query,
  where,
  setDoc,
  getDocFromCache
} from "firebase/firestore/lite";
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

export default function TeamsAbout({route, navigation, navigation: { goBack }}) {
  
  const myContext= useContext(Context)
  const { name,org,team,b,league} = route.params;
  const e = myContext.email;
  async function registerPress() {
    if(b1===0){
      
      await setDoc(doc(db, "users", e,"requests",name,"requests",e),{
        team: arrayUnion(name),   
      });
      await setDoc(doc(db, "organization", org,"teams",name,"requests",e), 
            { unseen:true,});
    Alert.alert("Request Successful","",  [
        { text: "OK", onPress: () => goBack() },
      ]); 
    } 
    if(b1===2){
      console.log("fort"+name)
      const washingtonRef = doc(db, "organization", org,"league",b4);
      
      const washingtonRef2 = doc(db, "organization", org,"teams",name);
      const user = await getDoc(washingtonRef2);
      await updateDoc(washingtonRef2, {
        currentPlayer: increment(1),    
      });
      if(user.get("currentPlayer")===0){
        console.log("fort"+name)
        await updateDoc(washingtonRef2, {
          Players: arrayUnion(e),
        });
        await updateDoc(washingtonRef2, {
          Players: arrayRemove(null),
        });}
      else{
        await updateDoc(washingtonRef2, {
          Players: arrayUnion(e)
        });}
      await addDoc(collection(db, "users", e,"teams"), 
            { name:team,league:b4, 
              org:org,isManager:false});
      Alert.alert("Joined Team Successfully","",  [
        { text: "OK", onPress: () => goBack() },
      ]); 
      }
      
}
  const[b1,setB]=useState(0);
  const[b4,setB4]=useState("");

  useLayoutEffect(() => {
    myContext.setD(false);
  }, []);
  useFocusEffect(
    () => {  myContext.setT(name);
       }, 
    
    );
  
  console.log(name+" "+e+org);

  const [clothes, setClothes] = useState({});
  const [clothes1, setClothes1] = useState([]);
  const [clothes2, setClothes2] = useState([]);
  const fB = async () => {
    let list1=[];
    let q;
    for(let j=0;j<clothes1.length;j++){
      console.log(clothes1[j]);
      if (clothes1[j]!==null) {
        let user1 = await getDoc(doc(db, "users", clothes1[j]));
        console.log("shit");
        q = user1.get("fname")+" "+user1.get("lNname")
        list1.push({value:q,id:clothes1[j]})}
    }
    console.log(list1);
    setClothes2(list1);

  }
  useEffect(() => {
    fB();
  }, [clothes1]);
  const fetchBlogs=async()=>{
    console.log(org+" "+e+" "+org);
    const myDoc = doc(db, "organization", org, "teams", name)
    const user = await getDoc(myDoc);
    setB4(user.get("league"));
    const myDoc2 = doc(db, "organization", org, "league", user.get("league"))
    const user3 = await getDoc(myDoc2);
    const myDoc3 = doc(db, "organization", org, "teams",name,"requests",e)
    const request1 = await getDoc(myDoc3);
    if (user.exists()){
      console.log(user.get("currentPlayer")+"  gggg   "+b);
      setClothes(user.data())
      setClothes1(user.get("Players"));
      console.log(user.get("Players"));
      if(user.get("currentPlayer")===user3.get("maxPlayer")){
        setB(1);
      }
      else if(request1.exists()){
        setB(1);
      }
      else if(user.get("aFA")){
        setB(2);
      }
      
    }
};    
    
useEffect(() => {
  fetchBlogs();
 }, []);

 function setName3(){
  console.log(b+"ghjdhsjjh");
  if(b&&!(b1===1)){
  return(
    
      <TouchableOpacity
        style={styles.buttonTO}
        onPress={() => registerPress()}>
          <View >
            {b1===0?<Text style={styles.buttonTxt2}>REQUEST JOIN TEAM</Text>:
            <Text style={styles.buttonTxt2}>JOIN TEAM</Text>}
          </View>
      </TouchableOpacity>
        
      
  );}
}

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <View style={styles.bruh}>
        
        <Text style={[styles.title, {textAlign: 'center'}]}>{clothes.name} </Text>
        
    </View>
      
  
      <View style={{ flex: 1,paddingTop:15, paddingBottom: 220, height: 200 }}>
        <View style={{ justifyContent:"center", flexDirection:"row",flex:1,paddingBottom: 10, }}>
          <Image source={{ uri: clothes.url }} style={{ width: 200, height: 200,borderRadius:100 }} />
        </View>
      </View>
      <View style={{alignItems:"center"}}>
      <View style={{ flex: 1,paddingTop:0,height:48, paddingBottom: 0,backgroundColor: "white",flexDirection:"row",borderRadius:6,width:"90%", borderColor:"black",borderWidth: 1,justifyContent:"center",paddingLeft:0}}>

        <Text style={[styles.title2, {paddingTop:0,paddingLeft:17}]}>Wins: {clothes.win} </Text>
        <Text style={[styles.title2, {paddingTop:0,paddingLeft:17}]}>Losses: {clothes.loss} </Text>
        <Text style={[styles.title2, {paddingTop:0,paddingLeft:17}]}>Ties: {clothes.tie} </Text>
      </View>
      </View>
      <Text style={[styles.title2, {paddingTop:15,paddingHorizontal:0,textAlign:"center"}]}>Roster </Text>

      <View style={{ flex: 1,paddingTop:5, paddingBottom: 20,}}>
      
            {clothes2.map(({value,id})=>{
              return(
          <View style={styles.list}>
            <TouchableOpacity style={styles.items}
               >
               <View style={styles.budgetTagsContainer}>
                <Text style={styles.name}>{value}</Text>
                <Text style={styles.name1}>{id}</Text>
              </View>
            </TouchableOpacity>
          </View>)})}
          </View>
      <View style={styles.button}>
      {setName3()}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  budgetTagsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
},
  list: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    marginBottom: 10,
},
  bruh: {
    backgroundColor: '#1C4BA5',
  },
  items: {
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
},
name: {
    width: "40%",
    fontWeight: "100",
    color: "#333333",
    fontSize: 15,
    textAlign: "left",
    borderColor: "black",
    paddingLeft: 25,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
},
name1: {
  width: "50%",
  fontWeight: "100",
  color: "#333333",
  fontSize: 15,
  textAlign: "left",
  borderColor: "black",
  paddingLeft: 25,
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5,
},
  buttonTxt2: {
    fontSize: 25,
    margin: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#007AFF",
    fontWeight: "bold",
},
button: {
  flex: 1,
  // right:85,
  // margin:5,
  // bottom:10,
  // position:'absolute',
  flex: 'center',
  alignItems: 'center',
},
buttonTO: {
  borderColor: "black",
  borderRadius: 50,
  backgroundColor: "white",
  marginRight: 10,
  bottom: 8,
  borderWidth:1,
  borderColor:"black",
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
    fontWeight: '600',
    fontSize: 30,
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
});