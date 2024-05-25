/* eslint-disable no-undef */
import React from "react"
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Dimensions,
    StyleSheet,
    ScrollView,
    Image
} from "react-native"
const { width } = Dimensions.get("window")
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SelectDropdown from "react-native-select-dropdown"

export default CustomSelectDropdown = ({ data, handleSelect }) => {
    return (
        // <SafeAreaView style={styles.saveAreaViewContainer}>
        //     <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        //     <View style={styles.viewContainer}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewContainer}
        >
            <SelectDropdown
                data={data}
                onSelect={handleSelect}
                // defaultButtonText="Select Job Type"
                // buttonTextAfterSelection={(selectedItem, index) => {
                //     return selectedItem
                // }}
                // rowTextForSelection={(item, index) => {
                //     return item
                // }}

                //
                renderCustomizedButtonChild={(selectedItem, index) => (
                    <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                            {selectedItem
                                ? selectedItem.type
                                : "Select Job Type"}
                        </Text>
                        {/* <FontAwesome
                                    name="chevron-down"
                                    color="#444"
                                    size={18}
                                /> */}
                    </View>
                )}
                // dropdownStyle={styles.dropdown3DropdownStyle}
                // rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => (
                    <View style={styles.dropdown3RowChildStyle}>
                        <Text style={styles.dropdown3RowTxt}>{item.type}</Text>
                    </View>
                )}
                //

                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                    return (
                        <FontAwesome
                            name={isOpened ? "chevron-up" : "chevron-down"}
                            color="#444"
                            size={18}
                        />
                    )
                }}
                dropdownIconPosition="right"
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
        </ScrollView>
        //     </View>
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    saveAreaViewContainer: { backgroundColor: "#FFF", border: "1px solid red" },
    viewContainer: { width, backgroundColor: "#FFF" },
    scrollViewContainer: {
        Grow: 1,
        // justifyContent: "space-between",
        alignItems: "center",
        padding: 24
    },

    dropdown1BtnStyle: {
        width: "80%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444"
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5"
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

    dropdown3BtnStyle: {
        width: "80%",
        height: 50,
        backgroundColor: "#FFF",
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#444"
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
    dropdown3BtnTxt: {
        color: "#444",
        textAlign: "center",
        // fontWeight: "bold",
        fontSize: 20,
        marginHorizontal: 12
    },
    dropdown3DropdownStyle: { backgroundColor: "slategray" },
    dropdown3RowStyle: {
        backgroundColor: "slategray",
        borderBottomColor: "#444",
        height: 50
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 18
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
    dropdown3RowTxt: {
        color: "gray",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginHorizontal: 12
    }
})
