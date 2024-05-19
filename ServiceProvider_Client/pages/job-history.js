import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import Button from "../components/Button"
import ImageViewer from "../components/ImageViewer"
import PlaceholderImage from "../assets/house-banner-image.jpg"
import { db } from "../firebaseConfig.js"
import { ref, onValue, child, get, set, push, update } from "firebase/database"
import { userId } from "../constants"

export default function JobHistory() {
    const [jobRequestList, setJobRequestList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUserJobRequests()
    }, [])

    function fetchUserJobRequests() {
        setLoading(true)
        console.log("Fetching user job requests")
        const dbRef = ref(db)
        get(child(dbRef, `user-job-requests/${userId}`))
            .then((snapshot) => {
                console.log({ snapshot })
                if (snapshot.exists()) {
                    console.log("snapshot.val() ===>>", snapshot.val())
                    const data = snapshot.val()
                    const dataKeys = Object.keys(data)
                    const dataValues = Object.values(data)
                    const jobReqList = []
                    for (key in dataKeys) {
                        const item = dataValues[key]
                        jobReqList.push(item)
                    }
                    console.log({ jobReqList })
                    setJobRequestList([...jobReqList])
                    setLoading(false)
                } else {
                    console.log("No data available")
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }

    const handleUserSatisfied = async (jobReq, status) => {
        console.log(`user pressed ${status} Button!!`)

        const data = {
            ...jobReq,
            status
        }

        // Get the key for the job request that needs to be updated.
        const jobReqKey = jobReq.jobRequestId

        // Update the job request's status simultaneously in the job-requests list and the user-job-requests list.
        const updates = {}
        const assigneeId = jobReq.assigneeId
        updates["/job-requests/" + assigneeId + "/" + jobReqKey] = data
        updates["/user-job-requests/" + userId + "/" + jobReqKey] = data

        await update(ref(db), updates)
        fetchUserJobRequests()
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.imageContainer}>
                        <ImageViewer
                            placeholderImageSource={PlaceholderImage}
                        />
                    </View>

                    <View style={styles.jobslist}>
                        {loading ? (
                            <Text style={styles.loading}>Loading...</Text>
                        ) : null}

                        {jobRequestList?.map((jobReq) => {
                            const date = new Date(jobReq.createdAt)
                            const dateTimeString =
                                date.getDate() +
                                "-" +
                                date.getMonth() +
                                "-" +
                                date.getFullYear()
                            //  +
                            // " " +
                            // date.getHours() +
                            // ":" +
                            // date.getMinutes()
                            return (
                                <View
                                    key={jobReq.jobRequestId}
                                    style={styles.listItem}
                                >
                                    <View style={styles.jobInfoContainer}>
                                        <Text style={styles.jobTypeTxt}>
                                            {jobReq.jobType}
                                        </Text>
                                        {/* <Text style={styles.personNameTxt}>
                                            {jobReq.assigneeName}
                                        </Text> */}
                                        <Text>
                                            Job requested at:{" "}
                                            <Text style={styles.date}>
                                                {dateTimeString}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View style={styles.statusContainer}>
                                        {jobReq.status === "Completed" ? (
                                            <View
                                                style={styles.buttonContainer}
                                            >
                                                <Button
                                                    label="I am satisfied"
                                                    handlePress={() =>
                                                        handleUserSatisfied(
                                                            jobReq,
                                                            "Satisfied"
                                                        )
                                                    }
                                                />
                                                <Button
                                                    label="Not Satisfied"
                                                    handlePress={() =>
                                                        handleUserSatisfied(
                                                            jobReq,
                                                            "Not Satisfied"
                                                        )
                                                    }
                                                />
                                            </View>
                                        ) : (
                                            <Text style={styles.jobStatus}>
                                                {jobReq.status === "Accepted"
                                                    ? `${jobReq.status} by ${jobReq.assigneeName}`
                                                    : jobReq.status}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        // flex: 1,
        // display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // paddingTop: 58,
        backgroundColor: "black"
    },
    loading: {
        textAlign: "center",
        paddingVertical: 4,
        fontSize: 16
    },
    jobslist: {
        // display: "flex",
        border: "2px red solid",
        // width: "100%",
        // height: 68,
        // marginTop: 20,
        marginVertical: 20,
        // marginHorizontal: 12,
        // alignItems: "center",
        // justifyContent: "center",
        padding: 8,
        gap: 4
    },
    listItem: {
        // maxHeight: 100,
        height: 120,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#A7C7E7",
        borderRadius: 8
    },
    jobInfoContainer: {
        // width: "50%",
        // display: "block",
        // backgroundColor: "red",
        padding: 4
    },
    jobTypeTxt: {
        // width: 100,
        fontSize: 18
        // color: "black"
        // backgroundColor: "orange"
    },
    personNameTxt: {
        // width: 100,
        fontSize: 14
        // backgroundColor: "green"
    },
    date: {
        // width: 100,
        fontSize: 16,
        fontWeight: "bold"
        // backgroundColor: "green"
    },
    buttonContainer: {
        display: "flex",
        // backgroundColor: "green",
        padding: 4,
        // border: "2px red solid",
        // width: "100%",
        // height: 68,
        // marginTop: 20,
        // marginHorizontal: 20,
        // alignItems: "center",
        // justifyContent: "center",
        // padding: 3,
        gap: 2
    },
    statusContainer: {
        justifyContent: "center"
        // width: "50%"
        // display: "block",
        // backgroundColor: "yellow"
    },
    jobStatus: {
        // color: "black",
        fontSize: 16
    }
})
