import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack"
import Home from "./pages/index.js"
import JobRequest from "./pages/request-job"
import JobHistory from "./pages/job-history"

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="JobRequest" component={JobRequest} />
                <Stack.Screen name="JobHistory" component={JobHistory} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

