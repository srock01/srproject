import React from 'react';
import { useContext, useState, useEffect, useLayoutEffect, } from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useFocusEffect } from '@react-navigation/native';
import {getDocs,getFirestore, collection, query, deleteDoc, updateDoc, arrayUnion, addDoc, where, doc, getDoc,setDoc,getDocFromCache} from "firebase/firestore";
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

export default function PlayerRequest ({navigation, route}) {
  const [clothes, setClothes] = useState([]);
  const [clothes2, setClothes2] = useState([]);

  const myContext = useContext(Context);
  const name = myContext.mteam;
  const e = myContext.email;
  const org = myContext.mO;
  const league = myContext.mL;
  const email = myContext.email;  
  useFocusEffect(
    () => {}, 
    
    );

    const fB = async () => {
      let list1=[];
      let q;
      for(let j=0;j<clothes.length;j++){
        if (clothes[j].id!==null) {
          let user1 = await getDoc(doc(db, "users", clothes[j].id));
          
          q = user1.get("fname")+" "+user1.get("lNname")
          list1.push(q)}
      }
      console.log(list1+"dfk");
      setClothes2(list1);
  
    }
    useEffect(() => {
      fB();
    }, [clothes]);
    const fetchBlogs = async () => {
        
        console.log(email+'fjds'+org+"ffff"+league);
        const list = [];
        const q=query(collection(db, "organization", org, "teams",name,"requests"));
        if (email != null) {
          console.log("ghd");
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
              console.log(doc+'stink');
                let myData = doc.data();
                myData.id = doc.id;
                
                list.push({ ...myData });
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setClothes(list);
            });
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    var str = "<";
    async function accept(name1) {
      let list= [];
      let pool;
      const washingtonRef2 = doc(db, "organization", org,"teams",name);
      await updateDoc(washingtonRef2, {
        Players: arrayUnion(e)
      });
      await addDoc(collection(db, "users", e,"teams"), 
          { name:name,league:league, 
            org:org,isManager:false});

      const q=query(collection(db, "users", e, "requests"), where("org", "==", org), where("league", "==", league));
      const querySnapshot = await getDocs(q);
            
      querySnapshot.forEach((doc) => {
        pool=doc.data().team
        console.log(pool+"shit");

        
                
                list.push(pool );
           
                
            });   
      for(let x=0;x<list.length;x++){
        console.log(list[x]+"crap");
        await deleteDoc(doc(db, "organization", org, "teams",list[x],"requests",e));
        await deleteDoc(doc(db, "users", email, "requests",list[x]));
      }   
      let array3= [...clothes2]
      const index = array3.indexOf(name1);
      console.log(index);
      console.log(name);
      console.log(clothes2[0]+"fifty");
  
    
    1
      if (index !== -1) {
        array3.splice(index,1);
        setClothes2(array3);
      }
    }
    async function decline(name1) {

      let array3= [...clothes2]
      const index = array3.indexOf(name1);
      await deleteDoc(doc(db, "organization", org, "teams",name,"requests",e));
      await deleteDoc(doc(db, "users", email, "requests",name));

      console.log(index);
      console.log(name1);
      console.log(clothes2[0]);
  
    
    
      if (index !== -1) {
        array3.splice(index,1);
        setClothes2(array3);
      }
    }
  
    return (
        <View style={{ flex: 1, backgroundColor:'#1C4BA5'}}>
            
            <View
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                }}
            >
            <Text style={styles.buttonTxt}>HANDLE JOIN REQUESTS</Text>
                <FlatList
                    data={clothes2}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            
                                <View style={styles.budgetTagsContainer}>
                                    <Text style={styles.name}>{item}</Text>
                                    <TouchableOpacity onPress={() => accept(item)}>
                                     <AntDesign name={'checkcircleo'} style={{fontSize:42,paddingLeft:100}} color={'blue'} />
                                 </TouchableOpacity>
                                    <TouchableOpacity onPress={() => decline(item)}>
                                     <AntDesign name={'closecircle'} style={{fontSize:42,paddingLeft:15}} color={'red'} />
                                 </TouchableOpacity>
                                    
                                </View>
                        </View>
                    )}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    bruh: {
        backgroundColor: "#1C4BA5",
        justifyContent: "space-between"
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
        backgroundColor: "#1C4BA5",
        marginRight: 10,
        bottom: 40,
    },
    buttonTxt: {
        fontSize: 25,
        margin: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        backgroundColor: "#276FBF",
        paddingTop: 20,
    },
    headerLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    title: {
        fontWeight: "300",
        fontSize: 26,
        marginVertical: 10,
        paddingHorizontal: 10,
        color: "white",
    },
    titleType: {
        fontWeight: "300",
        fontSize: 26,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        color: "white",
    },
    titleWeather: {
        fontWeight: "300",
        fontSize: 26,
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: "right",
        color: "white",
    },
    headerText: {
        fontSize: 28,
        fontWeight: "600",
        color: "blue",
        paddingRight: 70,
    },
    list: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    itemsList: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    itemtext: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
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
        fontSize: 20,
        alignItems: "left",
        borderColor: "black",
        paddingLeft: 25,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
    },
    type: {
        width: "30%",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "100",
        color: "#333333",
        fontSize: 15,
        paddingHorizontal: 10,
        alignItems: "center",
        fontWeight: "bold",
        paddingLeft: 25,
    },
    weather: {
        width: "30%",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "100",
        color: "#333333",
        fontSize: 15,
        paddingHorizontal: 10,
        alignItems: "right",
        fontWeight: "bold",
    },
    budgetTagsText: {
        fontWeight: "100",
        color: "gray",
        fontSize: 15,
        paddingHorizontal: 10,
    },
});
