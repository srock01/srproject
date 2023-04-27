import React from 'react';
import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import { useFocusEffect } from '@react-navigation/native';
import {getDocs,getFirestore, collection, query, where, firestore, firebase, addDoc, get, doc, getDoc,setDoc,getDocFromCache,onSnapshot} from "firebase/firestore";
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

export default function LeagueTeams ({navigation, route}) {
  const [clothes, setClothes] = useState([]);
  const [a3,setA3] =useState(true);
  const [a4,setA4] =useState(true);
  const [b,setB] =useState(true);
  const myContext= useContext(Context)
  const org = myContext.o;
  const email = myContext.email;  
  const name =myContext.league;
  
  const fetchBlogs2=async()=>{
    const myDoc = doc(db, "organization", org, "league", name)
    const user = await getDoc(myDoc);
    const user1 = onSnapshot(myDoc,(doc)=>{
    if(doc.data()!==null){

      if(doc.data().currentTeams===doc.data().maxTeam)
        setA4(true);
      else
        setA4(false);

    }});
    setA4(false);
};    
    
useLayoutEffect(() => {
  fetchBlogs2();

 }, [])
  function fetchBlogs1(name,org,team,league,myContext)  {
    myContext.setT(name);
    navigation.navigate('OTeam',{
                screen: 'About',
                params:{name:name, org:org,team:team, b:b,league:league },});
    }
    const fetchBlogs = async () => {
        
        console.log(email+'fjds');
        let list = [];
        const q=query(collection(db, "organization", org, "teams"),where("league","==",name));
        if (email != null) {
          console.log("ghd");
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                list=[];
                let a= true;
            querySnapshot.forEach((doc) => {
                
                let po=true;
                
                
                
                let myData = doc.data();
                myData.id = doc.id;
                console.log(!querySnapshot.metadata.fromCache+"hjghjdhj  "+a3)
                
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
                
                for (let p=0;p<doc.data().Players.length;p++){
                    if(doc.data().Players[p]===email){
                        setB(false);
                        a=false}
                }
               
            });
            if(a)
                setB(true);
            setA3(false);
        });

        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    var str = "<";
    return (
        <View style={{ flex: 1, backgroundColor:'#1C4BA5'}}>
            
            <View
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                }}
            >
            <Text style={styles.buttonTxt}>{name} TEAMS</Text>
                <FlatList
                    data={clothes}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() =>
                                    fetchBlogs1(item.id,item.org,item.name,item.league,myContext)}
                            >
                                <View style={styles.budgetTagsContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
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
        backgroundColor: "white",
        marginRight: 10,
        bottom: 8,
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
    buttonTxt2: {
        fontSize: 25,
        margin: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        color: "#007AFF",
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
        fontSize: 15,
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
