import React from "react";
import { useContext,useMemo, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
//import {firebase, db} from './firebase/firebase';
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

//import Clothes from "./src/component/Clothes";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {Context} from "./src/screens/context"
import Teams from "./src/screens/TeamsList";
import TeamsAbout from "./src/screens/TeamAbout";
import TeamSchedule from "./src/screens/TeamSchedule";
import TeamsStats from "./src/screens/TeamStats";
import Manager1 from "./src/screens/Manager";
import LoadIn from "./src/screens/LoadIn";
import LogIn from "./src/screens/Login";
import SignUp from "./src/screens/signup1";
/*import Article from "./src/screens/Article";
import ForgotPassword from "./src/screens/ForgotPassword";
*/
import Schedule from "./src/screens/Calendar";
//import AddArticle from "./src/screens/AddArticle";
//import Outfit from "./src/screens/Outfit";
import ManageNetwork from "./src/screens/ManageNetwork";
import LeagueCreate from "./src/screens/LeagueCreate";
import ManageLeague from "./src/screens/ManageLeague";
import ManageLTeams from "./src/screens/ManageLTeams";
import LeagueSettings from "./src/screens/LeagueSettings";

import GameAdd from "./src/screens/GameAdd";
import GameUEdit from "./src/screens/EditUpcomingGame";
import GamePEdit from "./src/screens/EditPastGame";

import Network3 from "./src/screens/NetworkChoose";
import Network from "./src/screens/NetworkCreate";
import NetworkView from "./src/screens/NetworkView";
import LeagueView from "./src/screens/LeagueView";
import LeagueTeams from "./src/screens/LeagueTeams";

import CreateTeam from "./src/screens/CreateTeam";

/*import AddOutfit from "./src/screens/AddOutfit";
*/
const firebaseConfig = {
    apiKey: "AIzaSyB2FzOefuDJNQHq1QLNs0dZJ5nsSeq-JyA",
    authDomain: "srproject-75728.firebaseapp.com",
    projectId: "srproject-75728",
    storageBucket: "srproject-75728.appspot.com",
    messagingSenderId: "920612695893",
    appId: "1:920612695893:web:dff9096bd171cca13709dc",
    measurementId: "G-Z5ZCFJCV52"
  };
  const Tab = createBottomTabNavigator();
  const Tab1 = createMaterialTopTabNavigator();

  
  const Manager = () => {
    const myContext=useContext(Context);
    let poo= myContext.editing;
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={Manager1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Manage Organization"
        component={ManageNetwork}
        options={({route})=>({ title: route.params.name,headerShown: true })}
      />
      <Stack.Screen
        name="Create League"
        component={LeagueCreate}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Manage League"
        component={ManageLeague2}
        options={({route})=>({ title: route.params.name,headerShown:poo?false:true })}
      />
      
    </Stack.Navigator>
  );
  }
  const NetworkManager = () => {
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Network View"
        component={NetworkView}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="League"
        component={League2}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Create Team"
        component={CreateTeam}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="OTeam"
        component={FirstScreenStack1}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
  }
  const League2 = () => {
    return (
        <Tab1.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
          tabBarItemStyle: { flex: 1 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}>
          <Tab1.Screen
            name="League Info"
            component={LeagueView}
          />
          <Tab1.Screen
            name="League Teams"
            component={LeagueTeams}
          />
          
          
          
          </Tab1.Navigator>
          );
          }
  const Networks = () => {
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Networks"
        component={Network3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NetworkC"
        component={Network}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select League"
        component={NetworkManager}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
  }
  const GameManager = () => {
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Man View"
        component={ManageLeague}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Game"
        component={GameAdd}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Edit Game"
        component={GameUEdit}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Finalize Game"
        component={GamePEdit}
        options={{ headerShown: true }}
      />
      
    </Stack.Navigator>
  );
  }
  const ManageLeague2 = () => {
    
    const myContext=useContext(Context);
    let poo= myContext.editing;
    return (
        <Tab1.Navigator screenOptions={({ route }) => ({
          tabBarVisible: poo? false:true,
          tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
          tabBarItemStyle: { flex: 1 },
          tabBarStyle: poo?{display: 'none'}:{ backgroundColor: 'powderblue' },
          
        })}>
        
          <Tab1.Screen
            name="Manage Games"
            component={GameManager}
          />
          <Tab1.Screen
            name="Manage Teams"
            component={ManageLTeams}
          />
          <Tab1.Screen
            name="Update Settings"
            component={LeagueSettings}
          />
          
          </Tab1.Navigator>
          );
          }

  const FirstScreenStack1 = () => {
    return (
        <Tab1.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
          tabBarItemStyle: { flex: 1 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}>
          <Tab1.Screen
            name="About"
            component={TeamsAbout}            
          />
          <Tab1.Screen
            name="Schedule"
            component={TeamSchedule}            
          />
          
          <Tab1.Screen
            name="Stats"
            component={TeamsStats}            
          />
          
          </Tab1.Navigator>
          );
          }
  const FirstScreenStack = () => {
    return (
        <Tab.Navigator
        
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Activites') {
              iconName = focused
                ? 'american-football'
                : 'american-football-outline';
            } else if (route.name === 'Manager') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            }
            else if (route.name === 'Organization') {
              iconName = focused ? 'ios-aperture-sharp' : 'ios-aperture-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'blue',
          headerShown:false
        })}>
        
          <Tab.Screen
            name="Activites"
            component={Teamd}
            
          />
          <Tab.Screen
            name="Manager"
            component={Manager}
          />
          <Tab.Screen
            name="Organization"
            component={Networks}
          />
        </Tab.Navigator>
    );
  }
  const Teamd = () => {
    return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="Teams"
        component={Teams}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Team"
        component={FirstScreenStack1}
        options={({route})=>({ title:route.params.name,headerShown: true })}
      />
    </Stack.Navigator>
  );
  }
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App = (route) => {
    const isDarkMode = useColorScheme() === "dark";
    const myContext = useContext(Context);
    
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [boole, setBoole] = React.useState({value: false});
    const [email, setE] = React.useState("");
    const [team, setT] = React.useState("");
    const [o, setO] = React.useState("");
    const [league, setL] = React.useState("");
    const [uLeague, setUL] = React.useState("");
    const [tO, setTO] = React.useState("");
    const [tL, setTL] = React.useState("");
    const [nwork, setN] = React.useState("");
    let [hDraw, setD] =React.useState(true);
    let [editing, setEditing] =React.useState(false);
    let [b, setB] =React.useState(boole.value);
    const userSetting = {boole:boole, 
        setBoole ,email:email,setE,b:b,setB,team:team, setT,hDraw:hDraw, setD, editing:editing,setEditing,
        league:league, setL,uLeague:uLeague, setUL, nwork:nwork, setN,o:o,setO,tO:tO,setTO,tL:tL,setTL,};
    const [checking, setIsChecking] = React.useState(true);
    console.log(boole);
    console.log(b);
    let r = false
    return (
       <Context.Provider value = {userSetting}> 
        {b ? (
        <NavigationContainer>
            <Drawer.Navigator
        screenOptions={({ route }) => ({
          
          headerShown:  hDraw? true:false,
          drawerStyle: {
            backgroundColor: '#c6cbef', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        })}>
        <Drawer.Screen
          name="FirstPage"
          options={{
            drawerLabel: 'Home',
            title: 'Home'
          }}
          component={FirstScreenStack} />
                
                </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                
            <NavigationContainer>
                <Stack.Navigator
                screenOptions={{headerTintColor: '#fff',
                    headerStyle: {backgroundColor: '#f4511e', //Set Header color
                  }}}>
                
                <Stack.Screen name="Welcome" component={LoadIn}    
                options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LogIn} />
                <Stack.Screen name="Register" component={SignUp} />
                
                </Stack.Navigator>
            </NavigationContainer>
            )}
            
        </Context.Provider>
    );
};


const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export default App;
