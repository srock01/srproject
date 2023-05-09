import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'; 
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { useFocusEffect } from '@react-navigation/native';

import { Context } from './context';

import {
  getDocs,
  getFirestore,
  collection,
  firestore,
  firebase,
  Timestamp,
  get,
  doc,
  getDoc,
  limit,
  query,
  where,
  setDoc,
  getDocFromCache,
  onSnapshot
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

export default function ManageLeague({route, navigation, navigation: { goBack }}) {
  useFocusEffect(
    () => {  myContext.setEditing(false); }, 
    
    );
  const myContext= useContext(Context)
  const org = myContext.o;
  const email = myContext.email;  
  const name =myContext.league;
  const [clothes, setClothes] = useState([]);
  const [clothes2, setClothes2] = useState([]);

  console.log(org);
  function fetchBlogs1(item,myContext)  {
    
    
    navigation.navigate('Edit Game',{item:item.id});
  }
  function fetchBlogs4(item,homeI,awayI,homeL,awayL,myContext)  {
    
    
    navigation.navigate('Finalize Game',{item:item.id,homeI:homeI,awayI:awayI, hL:homeL,aL:awayL});
  }
  const fetchBlogs = async () => {
        
    console.log(email+'fjds');
    let list = [];
    const q=query(collection(db, "organization", org, "games"), where("league","==",name), where("startDate","<",Timestamp.fromDate(new Date())));
    if (email != null) {
      console.log("ghd");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            list=[];
            let a= true;
        querySnapshot.forEach((doc) => {
            
            let po=true;
            
            
            
            let myData = doc.data();
            myData.id = doc.id;
            console.log(!querySnapshot.metadata.fromCache+"hjghjdhj  ")
            
          //  if(change.type === "removed"){
               /* console.log(change.type);
                const index = array.indexOf(change.doc.id);
                if (index > -1)  // only splice array when item is found
                    array.splice(index, 1); // 2nd parameter means remove one item only
        //   }*/
          //  if(change.type === "added"){
               // console.log(change.type);
                list.push({ ...myData });
            // doc.data() is never undefined for query doc snapshots
          //  console.log(change.doc.id, " => ", change.doc.data());
            setClothes(list);//}
            
            
           
        });
        
    });

    }
};
const fetchBlogs2 = async () => {
        
  console.log(email+'fjds');
  let list = [];
  const q=query(collection(db, "organization", org, "games"),where("league","==",name), where("startDate",">",Timestamp.fromDate(new Date())));
  if (email != null) {
    console.log("ghd");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          list=[];
          let a= true;
      querySnapshot.forEach((doc) => {
          
          let po=true;
          
          
          
          let myData = doc.data();
          myData.id = doc.id;
          console.log(!querySnapshot.metadata.fromCache+"hjghjdhj  ")
          
        //  if(change.type === "removed"){
             /* console.log(change.type);
              const index = array.indexOf(change.doc.id);
              if (index > -1)  // only splice array when item is found
                  array.splice(index, 1); // 2nd parameter means remove one item only
      //   }*/
        //  if(change.type === "added"){
             // console.log(change.type);
              list.push({ ...myData });
          // doc.data() is never undefined for query doc snapshots
        //  console.log(change.doc.id, " => ", change.doc.data());
          setClothes2(list);//}
          
          
         
      });
      
  });

  }
};
useEffect(() => {
    fetchBlogs();
    fetchBlogs2();
}, []);

  const [value, setValue] = useState(null);

  return (
    <View style={{flex:1, backgroundColor:"#1C4BA5"}}>
      
      <View style={{flex: 1,paddingBottom: 10, }}>
      <Text style={styles.buttonTxt1}>PAST LEAGUE GAMES</Text>
        <FlatList
          data={clothes}
          //   keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity style={styles.items}
              onPress={() => fetchBlogs4(item,item.homeI,item.awayI,item.homeL,item.awayL,myContext)} >
               <View style={styles.budgetTagsContainer}>
                <Text style={styles.name1}>{item.home}</Text>
                <Text style={styles.name}>VS</Text>
                <Text style={styles.name2}>{item.away}</Text>
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
                <Text style={styles.name2}>{item.away}</Text>
              </View>
            </TouchableOpacity>
          </View>)}/>
      </View>
      <View style={styles.button}>
      <TouchableOpacity
          style={styles.buttonTO}
          onPress={() =>
            navigation.navigate('Add Game')}>
          <View>
            <Text style={styles.buttonTxt}>ADD GAME</Text>
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
name: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "100",
    color: "#333333",
    fontSize: 15,
    borderColor: "black",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight:30,
    paddingLeft:30,
    justifyContent:"center",
},
name2: {
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "100",
  color: "#333333",
  fontSize: 15,
  borderColor: "black",
  fontWeight: "bold",
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight:20,
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
  paddingLeft:0,
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
    width:"100%",
    justifyContent: 'center',
  },
  buttonTO: {
      borderColor: "black",
      borderRadius: 50,
      backgroundColor: "white",
      bottom: 10,
      width:"90%",

  },
  buttonTxt: {
      fontSize: 25,
      margin: 10,
      padding: 5,
      
      textAlign: 'center',
      justifyContent: "center",
      color: "#007AFF",
      fontWeight: "bold",
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