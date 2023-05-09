import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { Context } from './context';
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  firestore,
  firebase,
  addDoc,
  get,
  doc,
  getDoc,
  setDoc,
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

export default function Home ({navigation, route}) {
  const [clothes, setClothes] = useState([]);
  const [clothes1, setClothes1] = useState([]);
  const myContext = useContext(Context);
  const email = myContext.email;    
  const fetchBlogs = async () => {
        
        console.log(email+'fjds');
        const list = [];
        const q=query(collection(db, "users", email, "teams"),where("isManager","==",true));
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
    function fetchBlogs1(name,myContext)  {
        myContext.setO(name);
        let a ="Manage "+name;
        navigation.navigate('Manage Organization',{name:a});
      }
      async function fetchBlogs4(name,item,org,league,myContext)  {
        myContext.setMO(org);
        myContext.setML(league);
        const q = query(collection(db, "organization", org, "teams"), where("name", "==", name), where("league", "==", league));
        let team2="";
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
            team2=doc.id;
        });
        myContext.setMT(team2);
        let a ="Manage "+name;
        navigation.navigate('Manage Team',{
            screen: 'Team Settings',
            params:{name:a, team:team2,teamId:item,league:league,org:org},});
      }
    useEffect(() => {
        fetchBlogs();
    }, []);
    const fetchBlogs2 = async () => {
        
        const unsub = onSnapshot(doc(db, "users", email), (doc) => {
            console.log("Current data: ", doc.data().organizationsOwned[0]);
            setClothes1(doc.data().organizationsOwned)
          });
    };
    useEffect(() => {
        fetchBlogs2();
    }, []);
    var str = "<";
    return (
        <View style={{ flex: 1, backgroundColor:'#1C4BA5' }}>
            
            <View
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                }}
            >
                <Text style={styles.buttonTxt}>MANAGE TEAMS</Text>
                <FlatList
                    style={{flex:1}}
                    data={clothes}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() => fetchBlogs4(item.name,item.id,item.org,item.league,myContext)} 
                            >
                                <View style={styles.budgetTagsContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <View style={{flex:1,paddingTop:15}}>
                    <Text style={styles.buttonTxt}>MANAGE ORGANIZATIONS</Text>
                    <FlatList
                    style={{flex:1,paddingTop:15}}
                    data={clothes1}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() => fetchBlogs1(item,myContext)} 

                            >
                                <View style={styles.budgetTagsContainer}>
                                    <Text style={styles.name}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View></View>
            
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
