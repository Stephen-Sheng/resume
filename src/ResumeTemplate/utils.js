import {Font, StyleSheet} from "@react-pdf/renderer";
import tinos from "../utils/Tinos/Tinos-Regular.ttf";
import tinosBold from "../utils/Tinos/Tinos-Bold.ttf";

export const stylesheet = {
    // clear margins for all <p> tags

    // add pink background color to elements with class="special"
    ul: {
        margin: 0,
        padding: 0,
    },
    ol: {
        margin: 0,
        padding: 0
    },
    p: {
        marginBottom: 0,
        paddingLeft: "20px",
    },
    li: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        right: 15,
        fontFamily: 'Times-Roman',
    },
    strong: {
        fontFamily: 'Tinos-bold'
    },
    em: {
        fontFamily: 'Times-Roman',
        fontSize: 14,
        margin: 0,
        padding: 0
    },
    h1: {
        margin: 0,
        padding: 0
    },
};
export const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 0,
        fontFamily: 'Times-Roman',
        paddingTop: 5
    },
    basicInfo: {
        margin: 12,
        fontSize: 14,
        fontFamily: 'Times-Roman',
        textAlign: 'center'
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    time: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        textAlign: 'right',
        paddingLeft: 50,
        fontFamily: 'Times-Roman'
    },
    image: {
        width:80,
        height:80,
        bottom:20
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    profile_line: {
        marginTop: '5px',
        width: '100%',
        height: '1px',
        backgroundColor: 'black',
        textAlign: 'center',
        fontFamily:'Times-Roman'
    },
    topicName: {
        fontFamily: 'Tinos-bold',
        fontSize: 14,
    }
});

Font.register({
    family: 'Tinos',
    src: tinos
});
Font.register({
    family: 'Tinos-bold',
    src: tinosBold
});