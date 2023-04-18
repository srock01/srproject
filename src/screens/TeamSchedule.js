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
  addDoc,
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

export default function TeamsSchedule({route, navigation, navigation: { goBack }}) {
  
  const myContext= useContext(Context)
  const name = myContext.team;
  const e = myContext.email;
  //const  e = route.params.e;
  const [clothes, setClothes] = useState({});
  
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

  return (
    
    <View style={{ flex: 1 }}>
      <View style={styles.bruh}>
        
        <Text style={[styles.title, {textAlign: 'center'}]}>{clothes.name} </Text>
        
    </View>
      
  
      <View style={{ flex: 1,paddingTop:15, paddingBottom: 80, height: 600}}>
        <Text style={[styles.title2, {paddingHorizontal:40}]}>Name: {name} </Text>

        <Text style={[styles.title2, {paddingHorizontal:40}]}>Name: {name} </Text>
        <Image source={{ uri: clothes.url }} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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