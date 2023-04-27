import React, { useState, useEffect,useContext } from 'react'; 
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';

import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  firebase,
  onSnapshot,
  doc,
  or,
  and,
  getDoc,
  limit,
  query,
  where,
  Timestamp,
  getDocFromCache
} from "firebase/firestore";
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

export default function TeamsSchedule({route, navigation, navigation: { goBack }}) {
  
  const myContext= useContext(Context)
  const name = myContext.team;
  const e = myContext.email;
  const org = myContext.tO;
  const league = myContext.tL;
  //const  e = route.params.e;
  const [clothes, setClothes] = useState({});
  const [clothes1, setClothes1] = useState([]);
  const [clothes2, setClothes2] = useState([]);
  
  const fetchBlogs=async()=>{
    const myDoc = doc(db, "users", e, "teams", name)
    const user = await getDoc(myDoc);
    
    if (user.exists()){
      console.log(user.get("name"));
      setClothes(user.data())
      
    }
};    
    
useEffect(() => {
  fetchBlogs();
 }, [])
 const fetchBlogs3 = async () => {
      
  console.log(name+'fjds'+org);
  let list = [];
  const q=query(collection(db, "organization", org, "games"),and (where("startDate","<",Timestamp.fromDate(new Date())),or(where("homeI","==",name),where("awayI","==",name))));
  
    console.log("ghd");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          list=[];
          let a= true;
      querySnapshot.forEach((doc) => {
          
          let po=true;
          
          
          console.log(doc.data().home+"\ngdds")
          let myData = doc.data();
          myData.id = doc.id;
          console.log(!querySnapshot.metadata.fromCache+"hjghjdhj  ")
          list.push({ ...myData });
          setClothes1(list);
          
          
         
      });
      
  });

  
};
const fetchBlogs2 = async () => {
      
console.log('fjds');
let list = [];
const q=query(collection(db, "organization", org, "games"), and(where("startDate",">",Timestamp.fromDate(new Date())),or(where("homeI","==",name),where("awayI","==",name))));

  console.log("ghd");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        list=[];
        let a= true;
    querySnapshot.forEach((doc) => {
        
        let po=true;
        
        
        
        let myData = doc.data();
        myData.id = doc.id;
        list.push({ ...myData });
        setClothes2(list);
        
        
       
    });
    
});


};
useEffect(() => {
  fetchBlogs3();
  fetchBlogs2();
}, []);

  return (
    <View style={{flex:1, backgroundColor:"#1C4BA5"}}>
      
      <View style={{flex: 1,paddingBottom: 10, }}>
      <Text style={styles.buttonTxt1}>PAST LEAGUE GAMES</Text>
        <FlatList
          data={clothes1}
          //   keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity style={styles.items}
              onPress={() => fetchBlogs4(item,item.homeI,item.awayI,item.homeL,item.awayL,myContext)} >
               <View style={styles.budgetTagsContainer}>
                <Text style={styles.name1}>{item.home}</Text>
                <Text style={styles.name}>VS</Text>
                <Text style={styles.name}>{item.away}</Text>
              </View>
            </TouchableOpacity>
          </View>)}/>
      </View>
      <View style={{flex: 1,paddingBottom: 10, }}>
      <Text style={styles.buttonTxt1}>UPCOMING LEAGUE GAMES</Text>
        <FlatList
          data={clothes2}
          //   keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity style={styles.items}
              onPress={() => fetchBlogs1(item,myContext)} >
               <View style={styles.budgetTagsContainer}>
                <Text style={styles.name1}>{item.home}</Text>
                <Text style={styles.name}>VS</Text>
                <Text style={styles.name}>{item.away}</Text>
              </View>
            </TouchableOpacity>
          </View>)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    marginBottom: 10,
    alignContent:"center",
    alignItems: "center",
    justifyContent:"center"
},
  budgetTagsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    borderBottomColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
    justifyContent:"center"
},
items: {
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
    justifyContent:"center"
},
buttonTxt1: {
  fontSize: 25,
  margin: 10,
  padding: 5,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
},
name: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "100",
    color: "#333333",
    fontSize: 15,
    borderColor: "black",
    flex:1,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent:"center",
},
name1: {
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "100",
  color: "#333333",
  fontSize: 15,
  alignItems: "left",
  borderColor: "black",
  flex:1,
  paddingLeft:45,
  fontWeight: "bold",
  paddingTop: 10,
  paddingBottom: 10,
},
  bruh: {
    backgroundColor: 'blue',
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
});