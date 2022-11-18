import React  from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

//import navigation from '/Users/seanrock/Downloads/DripOrDrown/App.js'


//import vlothes from './src/screens/Closet';


export default function Clothes ({ name, type, weather,   }) {
  
      return (
      
      <View style={styles.list}>
        <View style={styles.listingRatingContainer}>
          
          
        </View>
        <TouchableOpacity style={styles.items}
        onPress={() => navigation.navigate('Closet')}>
          <View style={styles.budgetTagsContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.type}>{type}</Text>
            <Text style={styles.weather}>{weather}</Text> 
          </View>
        </TouchableOpacity>
        
      </View>
    )
    
  }

const styles = StyleSheet.create({
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
