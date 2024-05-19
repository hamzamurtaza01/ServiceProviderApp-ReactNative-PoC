import { StatusBar } from "expo-status-bar"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import Button from "../components/Button"
import ImageViewer from "../components/ImageViewer"
import PlaceholderImage from "../assets/house-banner-image.jpg"

export default function App({ navigation }) {
    const goToJobHistory = () => navigation.navigate("JobHistory")
    const goToJobRequest = () => navigation.navigate("JobRequest")

    return (
        // <ScrollView>
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                    <ImageViewer placeholderImageSource={PlaceholderImage} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button label="Job History" handlePress={goToJobHistory} />
                    <Button
                        label="Request A Job"
                        handlePress={goToJobRequest}
                    />
                </View>
            </SafeAreaView>
        </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center"
        // justifyContent: "center"
    },
    imageContainer: {
        // flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // paddingTop: 58,
        backgroundColor: "black"
    },
    buttonContainer: {
        display: "flex",
        border: "2px red solid",
        // width: "100%",
        height: 68,
        marginTop: 20,
        // marginHorizontal: 20,
        // alignItems: "center",
        // justifyContent: "center",
        padding: 3,
        gap: 8
    }
})
