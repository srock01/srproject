import {
    StyleSheet,
    Text,
    View,
    Pressable,
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
        <View style={stylesFinal.Container}>
            {/* <Modal transparent={true} show={false} visible={show}>
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
            /> */}

            <View style={stylesFinal.content}>
                <Modal transparent={true} show={false} visible={show}>
                    <Calendar
                        style={stylesFinal.Calendar}
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
                    <Pressable
                        style={stylesFinal.CloseButton}
                        onPress={() => setShow(false)}
                    >
                        <Text style={stylesFinal.text}>Close</Text>
                    </Pressable>
                </Modal>
            </View>
            <View style={stylesFinal.Footer}>
                <Pressable
                    style={stylesFinal.Button}
                    onPress={() => setShow(!show)}
                >
                    <Text style={stylesFinal.text}>Wore On</Text>
                </Pressable>
                <Pressable
                    style={stylesFinal.Button}
                    onPress={() => setShow(true)}
                >
                    <Text style={stylesFinal.text}>Plan</Text>
                </Pressable>
            </View>
        </View>
    );
}

//Wore on Button
const stylesFinal = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#1C4BA5",
    },
    content: {
        flex: 1,
        flexDirection: 'column',
    },
    Calendar: {
        marginTop: 75,
        margin: 20,
    },
    CloseButton: {
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "black",
        width: 150,
        paddingVertical: 10,
        alignSelf: 'center',
    },
    Button: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 28,
        borderRadius: 6,
        backgroundColor: "black",
        width: 150,
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    Footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 15,
        //make view at the bottom of screen
    },
});
const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 7,
        backgroundColor: "blue",
        textAlign: "center",
    },
    buttonText: {
        color: "white",
        margin: 10,
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
