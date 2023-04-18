import React, { useState, useEffect, useContext } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, FlatList, } from 'react-native';
import { initializeApp } from "firebase/app";

import { Context } from './context';
import { useFocusEffect } from '@react-navigation/native';
import {
  getDocs,
  onSnapshot,
  getFirestore,
  collection,
  query,
  where,
  firestore,
  firebase,
  addDoc,
  get,
  doc,
  getDoc,
  setDoc,
  getDocFromCache
} from "firebase/firestore";
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
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function NetworkChoose ({navigation, route}) {
  const [clothes, setClothes] = useState([]);
  let list = [];
  const myContext = useContext(Context);
  const email = myContext.email;  

  function fetchBlogs1(name,myContext)  {
    myContext.setN(name);
    navigation.navigate('Select League');
  }
  const fetchBlogs = async () => {
    
    console.log(email+'fjds');
    const unsub = onSnapshot(doc(db, "users", email), (doc) => {
      console.log("Current data: ", doc.data().organizationsOwned[0]);
      setClothes(doc.data().organizationsOwned)
    });
    //const q=query(collection(db, "users", email, "networks"));
    /*const washingtonRef = await getDoc(doc(db, "users", email));
    list=washingtonRef.get("organizationsOwned");
    console.log(list[0]);
    setClothes(list);
   /* if (email != null) {
      console.log("ghd");
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          
            let myData = doc.data();
            myData.id = doc.id;
            
            list.push({ ...myData });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setClothes(list);
        });
    }*/
};
useEffect(() => {
  fetchBlogs();
}, []);
  const [value, setValue] = useState(null);

  return (
    <View style={{flex:1, backgroundColor:"#1C4BA5"}}>

      
      <View style={{flex: 1, paddingTop: 15,paddingBottom: 10, }}>
      <Text style={styles.buttonTxt1}>YOUR ORGANIZATIONS</Text>
        <FlatList
          data={clothes}
          //   keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity style={styles.items}
              onPress={() => fetchBlogs1(item,myContext)} >
               <View style={styles.budgetTagsContainer}>
                <Text style={styles.name}>{item}</Text>
              </View>
            </TouchableOpacity>
          </View>)}/>
      </View>
      <View style={styles.button}>
      <TouchableOpacity
          style={styles.buttonTO}
          onPress={() =>
            navigation.navigate('FirstPage',   {screen: 'Organization',
            params: {
                screen: 'NetworkC',},})}>
          <View>
            <Text style={styles.buttonTxt}>JOIN ORG</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTO}
          onPress={() =>
            navigation.navigate('FirstPage',   {screen: 'Organization',
            params: {
                screen: 'NetworkC',},})}>
          <View>
            <Text style={styles.buttonTxt}>ADD ORG</Text>
          </View>
        </TouchableOpacity>
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
  budgetTagsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
},
items: {
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "gray",
},
name: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "100",
    color: "#333333",
    fontSize: 15,
    alignItems: "left",
    borderColor: "black",
    paddingLeft: 25,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
},
  button: {
    flex: 1,
    paddingTop:10,
    // right:85,
    // margin:5,
    // bottom:10,
    // position:'absolute',
    flex: 'center',
    flexDirection:"row",
    width:"59%",
    alignItems: 'center',
  },
  buttonTO: {
      borderColor: "black",
      borderRadius: 50,
      backgroundColor: "white",
      marginLeft: "12%",
      bottom: 10,

  },
  buttonTxt: {
      fontSize: 25,
      margin: 10,
      padding: 5,
      
      alignItems: "center",
      justifyContent: "center",
      color: "#1C4BA5",
      fontWeight: "bold",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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