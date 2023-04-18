import React from 'react';
import { useContext, useState, useEffect, useLayoutEffect, } from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import { useFocusEffect } from '@react-navigation/native';
import {getDocs,getFirestore, collection, query, where, firestore, firebase, addDoc, get, doc, getDoc,setDoc,getDocFromCache} from "firebase/firestore/lite";
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

export default function Home ({navigation, route}) {
  const [clothes, setClothes] = useState([]);
  const myContext = useContext(Context);
  const email = myContext.email;  
  useFocusEffect(
    () => { if (!myContext.hDraw){ myContext.setD(true); }}, 
    
    );

    async function fetchBlogs1(name,org,myContext)  {
    myContext.setT(name);
    console.log(name+"cdsdk")
    const q = query(collection(db, "organization", org, "teams"), where("name", "==", name));
    let a="";
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
        a=doc.id;
    });
    navigation.navigate('Team',{
        screen: 'About',
        params:{name:a, org:org, b:false},
    });}
    const fetchBlogs = async () => {
        
        console.log(email+'fjds');
        const list = [];
        const q=query(collection(db, "users", email, "teams"));
        if (email != null) {
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
            <Text style={styles.buttonTxt}>YOUR TEAMS</Text>
                <FlatList
                    data={clothes}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() =>
                                    fetchBlogs1(item.name,item.org,myContext)}
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
