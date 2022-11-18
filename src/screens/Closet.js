import React,  { useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
//import Clothes from '../component/Clothes';
import  useNavigation  from '@react-navigation/native';

import {initializeApp} from 'firebase/app';
import {
  getDocs,
  getFirestore,
  collection,
  firestore,
} from 'firebase/firestore/lite';
import { color } from 'react-native-reanimated';


export default function Closet({navigation}) {
  const [clothes, setClothes] = useState([
    {
      id: 1,
      name: 'Blue Adidas Sweatshirt',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 2,
      name: 'Black Adidas Trackpants',
      type: 'pants',
      weather: 'cool',
      
    },
    {
      id: 3,
      name: 'Adidas Shorts',
      type: 'shorts',
      weather: 'cool',
      
    },
    {
      id: 4,
      name: 'Blue Adidas Sneakers',
      type: 'sneakers',
      weather: 'any',
      
    },
    {
      id: 5,
      name: 'Red Sweater',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 6,
      name: 'Green Tee Shirt',
      type: 'shirt',
      weather: 'warm',
    },
    {
      
      id: 7,
      name: 'Blue Adidas Sweatshirt',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 8,
      name: 'Black Adidas Trackpants',
      type: 'pants',
      weather: 'cool',
      
    },
    {
      id: 9,
      name: 'Adidas Shorts',
      type: 'shorts',
      weather: 'cool',
      
    },
    {
      id: 10,
      name: 'Blue Adidas Sneakers',
      type: 'sneakers',
      weather: 'any',
      
    },
    {
      id: 11,
      name: 'Red Sweater',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 12,
      name: 'Green Tee Shirt',
      type: 'shirt',
      weather: 'warm',
      
    },
    {
      id: 13,
      name: 'Adidas Shorts',
      type: 'shorts',
      weather: 'cool',
      
    },
    {
      id: 14,
      name: 'Blue Adidas Sneakers',
      type: 'sneakers',
      weather: 'any',
      
    },
    {
      id: 15,
      name: 'Red Sweater',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 16,
      name: 'Green Tee Shirt',
      type: 'shirt',
      weather: 'warm',
    },
    {
      
      id: 17,
      name: 'Blue Adidas Sweatshirt',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 18,
      name: 'Black Adidas Trackpants',
      type: 'pants',
      weather: 'cool',
      
    },
    {
      id: 19,
      name: 'Adidas Shorts',
      type: 'shorts',
      weather: 'cool',
      
    },
    {
      id: 20,
      name: 'Blue Adidas Sneakers',
      type: 'sneakers',
      weather: 'any',
      
    },
    {
      id: 21,
      name: 'Red Sweater',
      type: 'shirt',
      weather: 'cool',
      
    },
    {
      id: 22,
      name: 'Green Tee Shirt',
      type: 'shirt',
      weather: 'warm',
      
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image style={styles.headerLogo} source={require("../../assets/logo2.jpeg")} />
        
        <Text style={styles.headerText}>DripOrDrown</Text>
      </View>
      <View style={[styles.bruh,{  flexDirection: 'row' }]}>
        
          <Text style={[styles.title, {paddingHorizontal:40}]}>Name </Text>
          <Text style={styles.titleType}>Type </Text>
          <Text style={styles.titleWeather}>Weather </Text>
      </View>
      <View style={{ flex: 1,paddingTop:15, paddingBottom: 80, height: 600}}>
        <FlatList 
          data={clothes}
          renderItem={({item}) => (
              <View style={styles.list}>
                <TouchableOpacity style={styles.items}
                onPress={() => navigation.navigate('Article', { name: item.name , type:item.type,weather:item.weather})}>
                  <View style={styles.budgetTagsContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={styles.weather}>{item.weather}</Text> 
                  </View>
                </TouchableOpacity>
                
              </View>)}
          
        />
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
    fontWeight: '300',
    fontSize: 26,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'white'
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
  list: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  budgetTagsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderRadius: 4,
    backgroundColor :'gray',
    
  },
  items: {
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor :'gray',

  },
  name: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '100',
    color: '#333333',
    fontSize: 15,
    alignItems: 'left',
    borderColor: 'black',
    paddingLeft:25,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  type: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '100',
    color: '#333333',
    fontSize: 15,
    paddingHorizontal :10,
    alignItems: 'center',
    fontWeight: 'bold',
    paddingLeft:25,
    
  },
  weather: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '100',
    color: '#333333',
    fontSize: 15,
    paddingHorizontal :10,
    alignItems: 'right',
    fontWeight: 'bold',
    
  },
  budgetTagsText: {
    fontWeight: '100',
    color: 'gray',
    fontSize: 15,
    paddingHorizontal :10
  },

});