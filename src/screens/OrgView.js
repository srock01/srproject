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

export default function OrgView({route, navigation, navigation: { goBack }}) {
  
  const myContext= useContext(Context)
  const { org} = route.params;
  const e = myContext.email;
  async function registerPress(myContext) {
    
      console.log("fort")
      const washingtonRef = doc(db, "users", e,);
      
      const washingtonRef2 = doc(db, "organization", org,);
      const user = await getDoc(washingtonRef2);
     
        await updateDoc(washingtonRef2, {
          members: arrayUnion(e),
        });
     
      await updateDoc(washingtonRef, 
            {  
              orgs:arrayUnion(org)});
      Alert.alert("Joined Org Successfully","",  [
        { text: "OK", onPress: () => navigation.navigate("Networks") },
      ]); 
      
      
}
  const[b1,setB]=useState(0);
  const[b4,setB4]=useState("");

  useLayoutEffect(() => {
  }, []);
 
  
  console.log(" "+e+org);
  const [wL, setwL] = useState(1);
  const [lL, setlL] = useState(1);
  const [clothes, setClothes] = useState({});
  const [clothes1, setClothes1] = useState([]);
  const [clothes2, setClothes2] = useState([]);
 
  const fetchBlogs=async()=>{
    console.log(org+" "+e+" "+org);
    const myDoc = doc(db, "organization", org, )
    const user = await getDoc(myDoc);
    setClothes(user.data());
    for (let p=0;p<user.data().members.length;p++){
      if(user.data().members[p]===e){
          setB(1);
          }
  }
    
};    
    
useEffect(() => {
  fetchBlogs();
 }, []);

 function setName3(){
  console.log("ghjdhsjjh");
  if(!(b1===1)){
  return(
    
      <TouchableOpacity
        style={styles.buttonTO}
        onPress={() => registerPress(myContext)}>
          <View >
            
            <Text style={styles.buttonTxt2}>JOIN Organization</Text>
          </View>
      </TouchableOpacity>
        
      
  );}
}

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bruh}>
        
        <Text style={[styles.title, {textAlign: 'center'}]}>{clothes.name} </Text>
        
    </View>
      
  
      <View style={{ flex: 1,paddingTop:15, paddingBottom: 220, height: 200 }}>
        <View style={{ justifyContent:"center", flexDirection:"row",flex:1,paddingBottom: 10, }}>
          <Image source={{ uri: clothes.url }} style={{ width: 200, height: 200,borderRadius:100 }} />
        </View>
      </View>
      

      
      <View style={{alignItems:"center", paddingBottom:7,paddingTop:7}}>
      <View style={{ flex: 1,paddingTop:0,height:46, paddingBottom: 0,backgroundColor: "white",flexDirection:"row",borderRadius:6,width:"26%", borderColor:"black",borderWidth: 1,justifyContent:"center",paddingLeft:0}}>

      <Text style={[styles.title3, {paddingTop:0,paddingHorizontal:0,textAlign:"center"}]}>Roster </Text>
      </View>
      </View>
      
      <View style={styles.button}>
      {setName3()}
      </View>
    </View>
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
    marginTop: 8,
    paddingHorizontal: 10,
    color: 'black'
  },
  title3: {
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 7,
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