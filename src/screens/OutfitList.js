import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Button,
} from "react-native";

import { initializeApp } from "firebase/app";
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
    getDocFromCache,
} from "firebase/firestore/lite";
import { color } from "react-native-reanimated";
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

export default function Closet({ navigation, navigation: { goBack }, route }) {
    const [clothes, setClothes] = useState([]);
    let email = "";
    
    const fetchBlogs = async () => {
        
        console.log(email);
        const list = [];
        if (email != null) {
            const querySnapshot = await getDocs(
                collection(db, "users", email, "outfits")
            );

            querySnapshot.forEach((doc) => {
                let myData = doc.data();
                myData.id = doc.id;
                myData.e = email;
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
        <View style={{ flex: 1 }}>
            <View style={[styles.bruh, { flexDirection: "row" }]}>
                <Text style={styles.titleType}> Name </Text>
                <Text style={styles.titleWeather}> Weather </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 80,
                }}
            >
                <FlatList
                    data={clothes}
                    //   keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                style={styles.items}
                                onPress={() =>
                                    navigation.navigate("Outfit", {
                                        name: item.name,
                                        type: item.type,
                                        weather: item.weather,
                                        id: item.id,
                                        e: item.e,
                                    })
                                }
                            >
                                <View style={styles.budgetTagsContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.type}></Text>
                                    <Text style={styles.weather}>
                                        {item.weather}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.buttonTO}
                    onPress={() =>
                        navigation.navigate("AddOutfit", { email: email })
                    }
                >
                    <View>
                        <Text style={styles.buttonTxt}>Add Outfit</Text>
                    </View>
                </TouchableOpacity>
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
        marginRight: 5,
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