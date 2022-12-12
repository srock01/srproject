import {
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

export default function CalendarPage() {
    const [show, setShow] = useState(false);
    const [datePicker, setDatePicker] = useState("Choose A Date");
    const [futurePicker, setFuturePicker] = useState("Choose A Date");

    function PlanButton({ text, onPress }) {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function FutureButton({ text, onPress }) {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles2.button}>
                    <Text style={styles2.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    function CloseButton({ text, onPress }) {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles3.button}>
                    <Text style={styles3.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ backgroundColor: "dodgerblue", flex: 1 }}>
            <Modal transparent={true} show={false} visible={show}>
                <Calendar
                    style={{ borderRadius: 5, margin: 30, top: 100 }}
                    onDayPress={(date) => {
                        setDatePicker(
                            date.month + "/" + date.day + "/" + date.year
                        );
                    }}
                    onDayLongPress={(date) => {
                        setFuturePicker(
                            date.month + "/" + date.day + "/" + date.year
                        );
                    }}
                />
                <CloseButton text="Close" onPress={() => setShow(false)} />
            </Modal>
            <Text style={{ fontSize: 20, top: 670, left: 10 }}>
                {datePicker}
            </Text>
            <Text style={{ fontSize: 20, top: 650, left: 220 }}>
                {futurePicker}
            </Text>
            <PlanButton text="Wore On: " onPress={() => setShow(true)} />
            <FutureButton
                text="Plan To Wear: (hold day)"
                onPress={() => setShow(true)}
            />
        </View>
    );
}

//Wore on Button
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        maxWidth: 150,
        maxHeight: 90,
        top: 550,
        left: 5,
        borderRadius: 7,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: "16",
        textAlign: "center",
    },
});
//Plan To Wear Button
const styles2 = StyleSheet.create({
    button: {
        paddingVertical: 9,
        paddingHorizontal: 5,
        maxWidth: 150,
        maxHeight: 90,
        top: 508.5,
        left: 220,
        borderRadius: 7,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: "16",
        textAlign: "center",
    },
});
//Close button
//Touchable range is a little buggy for some reason but tapping dates still works if careful
const styles3 = StyleSheet.create({
    button: {
        borderRadius: 7,
        paddingVertical: 1,
        maxWidth: 80,
        maxHeight: 30,
        top: 120,
        left: 150,
        justifyContent: "center",
        backgroundColor: "blue",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: "16",
        textAlign: "center",
    },
});

//Future: change long day press to allow user to open day chosen and save outfit inside
