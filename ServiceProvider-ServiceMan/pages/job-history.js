import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import Button from "../components/Button"
import ImageViewer from "../components/ImageViewer"
import CustomSelectDropdown from "../components/CustomSelectDropdown"
import PlaceholderImage from "../assets/house-banner-image.jpg"
import { db } from "../firebaseConfig.js"
import { ref, onValue, child, get, set, push, update } from "firebase/database"

const data = [
    { type: "Plumber", assigneeId: 10384, assigneeName: "Ali" },
    { type: "Electrician", assigneeId: 20458, assigneeName: "Muzammil" },
    { type: "Carpenter", assigneeId: 30771, assigneeName: "Taha" },
    { type: "Welder", assigneeId: 44235, assigneeName: "Arsalan" },
    { type: "Mason", assigneeId: 59188, assigneeName: "Usman" },
    { type: "Painter", assigneeId: 60512, assigneeName: "Zeeshan" },
    { type: "Mechanic", assigneeId: 73772, assigneeName: "Mudassir" }
]

export default function JobHistory() {
    const [jobType, setJobType] = useState({})
    const assigneeId = jobType?.assigneeId
    const [jobRequestList, setJobRequestList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchJobRequests()
    }, [assigneeId])

    function fetchJobRequests() {
        setLoading(true)
        console.log("Fetching user job requests")
        const dbRef = ref(db)
        console.log({ dbRef, assigneeId })
        get(child(dbRef, `job-requests/${assigneeId}`))
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
                    setJobRequestList([])
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setJobRequestList([])
                setLoading(false)
            })
    }

    const handleJobTypeSelect = (selectedItem, index) => {
        console.log(selectedItem, index)
        setJobType(selectedItem)
    }

    const acceptJob = async (jobReq, status) => {
        console.log(`user pressed ${status} Button!!`)

        const data = {
            ...jobReq,
            status
        }

        // Get the key for the job request that needs to be updated.
        const jobReqKey = jobReq.jobRequestId

        // Update the job request's status simultaneously in the job-requests list and the user-job-requests list.
        const updates = {}
        const userId = jobReq.userId
        updates["/job-requests/" + assigneeId + "/" + jobReqKey] = data
        updates["/user-job-requests/" + userId + "/" + jobReqKey] = data

        await update(ref(db), updates)
        fetchJobRequests()
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

                    <CustomSelectDropdown
                        data={data}
                        handleSelect={handleJobTypeSelect}
                    />

                    <View style={styles.jobslist}>
                        {assigneeId && loading ? (
                            <Text style={styles.loading}>Loading...</Text>
                        ) : assigneeId && jobRequestList?.length === 0 ? (
                            <Text style={styles.notFoundTxt}>
                                No jobs found
                            </Text>
                        ) : null}

                        {jobRequestList?.map((jobReq) => {
                            const date = new Date(jobReq.createdAt)
                            const dateTimeString =
                                date.getDate() +
                                "-" +
                                date.getMonth() +
                                "-" +
                                date.getFullYear()

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
                                        {jobReq.status === "Pending" ? (
                                            <View
                                                style={styles.buttonContainer}
                                            >
                                                <Button
                                                    label="Accept"
                                                    handlePress={() =>
                                                        acceptJob(
                                                            jobReq,
                                                            "Accepted"
                                                        )
                                                    }
                                                />
                                                <Button
                                                    label="Reject"
                                                    handlePress={() =>
                                                        acceptJob(
                                                            jobReq,
                                                            "Rejected"
                                                        )
                                                    }
                                                />
                                            </View>
                                        ) : (
                                            <Text style={styles.jobStatus}>
                                                {jobReq.status ===
                                                "Accepted" ? (
                                                    <Button
                                                        label="Completed"
                                                        handlePress={() =>
                                                            acceptJob(
                                                                jobReq,
                                                                "Completed"
                                                            )
                                                        }
                                                    />
                                                ) : [
                                                      "Satisfied",
                                                      "Not Satisfied"
                                                  ].includes(jobReq.status) ? (
                                                    `Customer ${jobReq.status}`
                                                ) : (
                                                    jobReq.status
                                                )}
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
    notFoundTxt: {
        textAlign: "center",
        paddingVertical: 4,
        fontSize: 16
        // fontWeight: "bold"
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
        backgroundColor: "#ffffdd",
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
