import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D0D2D8",
        alignItems: "center",
        paddingTop: 64,
    },
    form: {
        width: "100%",
        marginTop: 42,
        gap: 8,
        paddingHorizontal: 16
    },
    logo: {
        width: 134,
        height: 34
    },
    content: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingTop: 32,
        marginTop: 24
    },
    filterContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e4e6ec",
        paddingBottom: 12,
    },
    clearButton: {
        marginLeft: "auto",
    },
    clearButtonText: {
        fontSize: 12,
        color: "#828282",
        fontWeight: 600
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#EEF0F5",
        marginVertical: 12
    },
    listContent: {
        paddingTop: 20,
        paddingBottom: 62,
    }
})