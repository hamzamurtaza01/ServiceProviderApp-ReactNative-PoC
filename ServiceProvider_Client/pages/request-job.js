import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import Button from "../components/Button"
import ImageViewer from "../components/ImageViewer"
import PlaceholderImage from "../assets/house-banner-image.jpg"
import { router } from "expo-router"
import CustomSelectDropdown from "../components/CustomSelectDropdown"
import { db } from "../firebaseConfig.js"
import { ref, onValue, child, get, set, push, update } from "firebase/database"
import { userId } from "../constants"

const data = [
    { type: "Plumber", assigneeId: 10384, assigneeName: "Ali" },
    { type: "Electrician", assigneeId: 20458, assigneeName: "Muzammil" },
    { type: "Carpenter", assigneeId: 30771, assigneeName: "Taha" },
    { type: "Welder", assigneeId: 44235, assigneeName: "Arsalan" },
    { type: "Mason", assigneeId: 59188, assigneeName: "Usman" },
    { type: "Painter", assigneeId: 60512, assigneeName: "Zeeshan" },
    { type: "Mechanic", assigneeId: 73772, assigneeName: "Mudassir" }
]

export default function RequestJob({ navigation }) {
    const [jobType, setJobType] = useState({})

    const handleJobTypeSelect = (selectedItem, index) => {
        console.log(selectedItem, index)
        setJobType(selectedItem)
    }

    function requestJob(selectedJob) {
        console.log("user requested for", { jobType: selectedJob.type })
        const timestamp = new Date().getTime()

        const data = {
            userId,
            jobType: selectedJob.type,
            assigneeId: selectedJob.assigneeId,
            assigneeName: selectedJob.assigneeName,
            createdAt: timestamp,
            status: "Pending"
        }

        // Get a key for a new Job Request.
        const newJobReqKey = push(child(ref(db), "job-requests")).key
        data.jobRequestId = newJobReqKey

        // Write the new job request's data simultaneously in the job-requests list and the user-job-requests list.
        const updates = {}
        const assigneeId = selectedJob.assigneeId
        updates["/job-requests/" + assigneeId + "/" + newJobReqKey] = data
        updates["/user-job-requests/" + userId + "/" + newJobReqKey] = data

        update(ref(db), updates)
        navigation.navigate("Home")
    }

    return (
        // <ScrollView>
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                    <ImageViewer placeholderImageSource={PlaceholderImage} />
                </View>

                <CustomSelectDropdown
                    data={data}
                    handleSelect={handleJobTypeSelect}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        label="Request Job"
                        disabled={!jobType?.type}
                        handlePress={() => requestJob(jobType)}
                    />
                </View>
            </SafeAreaView>
        </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
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
        // backgroundColor: "yellow",
        // display: "flex",
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
