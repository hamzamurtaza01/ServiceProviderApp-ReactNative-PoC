import { StyleSheet, View, TouchableOpacity, Text } from "react-native"

export default function Button({ label, handlePress, disabled }) {
    return (
        // <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, disabled ? styles.disabled : {}]}
            onPress={handlePress}
            disabled={disabled}
        >
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
        // </View>
    )
}

const styles = StyleSheet.create({
    // buttonContainer: {
    //     width: 320,
    //     height: 68,
    //     marginHorizontal: 20,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: 3
    // },
    button: {
        backgroundColor: "#40a9ff",
        border: "2px red solid",
        borderRadius: 10,
        // width: "100%",
        // height: "100%",
        border: "1px red solid",
        padding: 12,
        alignItems: "center",
        justifyContent: "center"
        // flexDirection: "row"
    },
    buttonIcon: {
        paddingRight: 8
    },
    buttonLabel: {
        color: "black",
        fontSize: 18
    },
    disabled: {
        backgroundColor: '#DDDDDD'
    }
})
