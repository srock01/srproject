import React, { useState, useEffect, useContext,useLayoutEffect } from "react";
import { initializeApp } from "firebase/app";
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from "./context";
import { getFirestore,Timestamp, doc, getDoc, setDoc, addDoc, updateDoc,arrayUnion,onSnapshot, query, collection, where, getDocs} from "firebase/firestore";
global.Buffer = global.Buffer || require('buffer').Buffer
import {
  StatusBar, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Alert,
  FlatList

} from "react-native";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL } 
  from 'firebase/storage';

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
const storage = getStorage(app);
let a = 0;

export default function NetworkSelection({route, navigation,navigation:{goBack}}) {
  //var [ isPress, setIsPress ] = React.useState(false);
  const myContext=useContext(Context);
  const  email  = myContext.email;
  const org = myContext.o;
  let name= myContext.league;
  useFocusEffect(
    () => {  myContext.setBoole2(true); 
      console.log(myContext.booles3);
    

   }, 
    
    );
    function registerPress(myContext)  {
      myContext.setBoole2(false);
    if (home===""){
      Alert.alert("Select an Organization to Join","",  [
        { text: "OK", },
      ]); 
    }
    else{
      navigation.navigate('View Organization',{org:home});
    }
    }
  
  console.log(name+" "+org);
  
  const [home,setHome]=useState("");
  const [c2,setC2]=useState(true);
  const [clothes2,setClothes2]=useState([]);
  const [clothes3,setClothes3]=useState([]);
  const [clothes,setClothes1]=useState([]);
  const [locations,setClothes]=useState([]);

  const setTeams = async () => {
    let a =0;
    console.log(email+'fjds');
    const list = [];
    const q=query(collection(db, "organization"));
    if (email != null) {
      console.log("ghd");
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            let qtp2=true;
            for (let j=0;j<doc.data().members.length;j++){
                if (doc.data().members[j]===email)
                  qtp2=false;
            }
            let myData = doc.data();
            myData.id = doc.id;
            myData.value=a;
            a++;
            if (qtp2)
              list.push({ ...myData });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setClothes2(list);
        });
    }
};
    
useLayoutEffect(() => {
  setTeams();

 }, [])

  return (
    <>
    
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
      <Text style={styles.buttonTxt1}>Select Organization</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={clothes2}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder= {"Select" }        
        searchPlaceholder="Search..."
        teams={clothes2}
        onChange={item => {
          setHome(item.id);
          
          
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
      
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => registerPress(myContext)}
          >
            <Text style={{fontWeight:'bold',color:"#007AFF", fontSize:30}}>JOIN ORGANIZATION</Text>
          </TouchableOpacity>
        </View>
    </>
  );
  function fetchBlogs4(name) {
    
    let array3= [...location]
    const index = array3.indexOf(name);
    console.log(index);
    console.log(name);
    console.log(location[0]);

  
  
    if (index !== -1) {
      array3.splice(index,1);
      setLocal(array3);
    }
  }
};

const styles = StyleSheet.create({
  buttonTxt:{
    alignItems:"center",
    fontSize:26,
    fontWeight:'bold'
  },
  buttonTxt1: {
    fontSize: 28,
    margin: 10,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
},
  buttonTxt2: {
    fontSize: 13,
    margin: 5,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#007AFF",
},
inputDate: {
  flexDirection:"row",
  backgroundColor: "white",
  borderRadius: 30,
  width: "80%",
  height: 45,
  marginTop: 5,
  marginBottom: 10,
  alignItems: "center",
},
  btnNormal: {
    borderColor:"red",
    borderWidth: 1,
    padding:10,
    borderRadius: 10,
    height: 40,
  },
  btnPress: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    padding:10,
    height: 40,
  },
  container: {
    flex: 1,
    height:600,
    backgroundColor: "#1C4BA5",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },

  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginTop: 20,
    alignItems: "center",
    flewDirection:"row"
  },
 
  inputView2: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 30,
    width: "75%",
    height: 45,
    marginTop:5,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  inputView3: {
    flexDirection:"column",
    backgroundColor: "white",
    borderRadius: 30,
    width: "97%",
    height: 75,
    marginTop:7,
    marginBottom: 7,
    justifyContent: "center",
    alignItems: "center",
    
  },
  TextInput: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 10,
    marginLeft: 20,
    fontSize:16,
  },
  TextInput3: {
    height: 50,
    flex: 1,
    //fontWeight:"bold",
    padding: 10,
    marginLeft: 20,
    fontSize:16,
  },
  TextInput2: {
    height: 50,
    flex: 1,
    flexDirection:'row',
    padding: 10,
    marginLeft: 20,
    fontSize:14,

    
  },


  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "white",
  },

  DripOrDrownText: {
    color: "white",
    fontSize: "35px",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  dropdown: {
    margin: 10,
    height: 50,
    borderRadius:8,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width:"90%",
    backgroundColor:"white"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white",
  },
  loginOr: {
    paddingTop: 20,
    color: "white",
    fontSize: 15,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 50,
    borderRadius: 25,
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