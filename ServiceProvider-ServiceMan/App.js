import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack"
import Button from "./components/Button"
import ImageViewer from "./components/ImageViewer"
import PlaceholderImage from "./assets/house-banner-image.jpg"
import Home from "./pages/index.js"
import JobHistory from "./pages/job-history"

const Stack = createStackNavigator()

export default function App({ navigation }) {
    // const handleBackPress = () => console.log('NAVIGATIONNNN >>>', navigation)

    return (
        <NavigationContainer>
            <Stack.Navigator
            // screenOptions={({ navigation, route }) => ({
            //     headerLeft: (props) => {
            //         // console.log({ props, navigation, route })
            //         return (
            //             <>
            //                 <Text>Menu</Text>
            //                 {/* {props.canGoBack && (
            //                     <Pressable
            //                         style={styles.button}
            //                         onPress={handleBackPress}
            //                     >
            //                         <Text style={styles.buttonLabel}>
            //                             Back
            //                         </Text>
            //                     </Pressable>
            //                 )} */}
            //                 {/* {props.canGoBack && (
            //                     <HeaderBackButton {...props} />
            //                 )} */}
            //             </>
            //         )
            //     }
            // })}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="JobHistory" component={JobHistory} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     imageContainer: {
//         // flex: 1,
//         // display: "flex",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         // paddingTop: 58,
//         backgroundColor: "black"
//     },
//     buttonContainer: {
//         // display: "flex",
//         border: "2px red solid",
//         width: "100%",
//         height: 68,
//         marginTop: 20,
//         // marginHorizontal: 20,
//         // alignItems: "center",
//         // justifyContent: "center",
//         padding: 3,
//         gap: 8
//     },
//     button: {
//         backgroundColor: "#40a9ff",
//         borderRadius: 10,
//         // width: "100%",
//         // height: "100%",
//         borderRadius: 20,
//         marginHorizontal: 4,
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         alignItems: "center",
//         justifyContent: "center"
//         // flexDirection: "row"
//     },
//     buttonIcon: {
//         paddingRight: 8
//     },
//     buttonLabel: {
//         color: "black",
//         fontSize: 16
//     }
// })
