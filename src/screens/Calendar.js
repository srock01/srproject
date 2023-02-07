import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

export default function App() {


  const [show, setShow] = useState(false);
  const [datePicker, setDatePicker] = useState('Choose A Date');
  const [futurePicker, setFuturePicker] = useState('Choose A Date');

  function PlanButton({text, onPress}){
    return(
    <TouchableOpacity onPress={onPress}>
      <View style = {styles.button}>
        <Text style = {styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
    );
  }

  function FutureButton({text, onPress}){
    return(
    <TouchableOpacity onPress={onPress}>
      <View style = {styles2.button}>
        <Text style = {styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
    );
  }
  function CloseButton({text, onPress}){
    return(
    <TouchableOpacity onPress={onPress}>
      <View style = {styles3.button}>
        <Text style = {styles3.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
    );
  }
 
  return (
    //calendar is fine. buttons are the problem
    <ScrollView>
    <View style={{backgroundColor: '#1C4BA5', flex:1, }}>
        <View> 
      <Modal
      transparent  = {true}
      show = {false}
      visible = {show}>
        <Calendar style={{borderRadius: 5, margin: 30, marginTop: '40%'}}
        onDayPress={(date) => {setDatePicker((date.month + "/" + date.day + "/" + date.year))}}
        onDayLongPress={(date) => {setFuturePicker((date.month + "/" + date.day + "/" + date.year))}}/>
        <CloseButton text = "Close" onPress={() => setShow(false)}/>
        </Modal> 
        </View>
        <View>
        
        <View style={{alignItems:'center', marginTop:'75%'}}>
        <PlanButton text = 'Wore On: ' onPress={() => setShow(true)}/>
        <Text style={{fontSize: 20}}> 
          {datePicker}
        </Text>
        <FutureButton text = 'Plan To Wear: (hold day)' onPress={() => setShow(true)}/>
        <Text style={{fontSize: 20}}>
          {futurePicker}
        </Text>
        </View>

        </View>
    </View>
    </ScrollView>
  );
}


//Wore on Button
const styles = StyleSheet.create({
  button: {
    paddingVertical: 9,
    paddingHorizontal: 5,
    width: '50%',
    borderRadius: 7,
    backgroundColor: 'black',
    marginTop:'75%' //tricky one
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16',
    textAlign: 'center'
  }
})

const styles2 = StyleSheet.create({
    button: {
        paddingVertical: 9,
        paddingHorizontal: 5,
        width: '50%',
        borderRadius: 7,
        backgroundColor: 'black',
    
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16',
        textAlign: 'center'
      }
})
//Close button
const styles3 = StyleSheet.create({
  button: {
    borderRadius: 7,
    paddingVertical: 5,
    width:'50%',
    alignSelf:'center',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16',
    textAlign: 'center'
  }
})