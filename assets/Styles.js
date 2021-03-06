import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 800,
        paddingHorizontal: 20,
        flex: 1,
    },
    background: {
        backgroundColor: '#373F51',
        width: '100%',
        height: '100%',
      },
    header: {
        fontSize: 32,
        margin: 20,
        color: '#F5F5DC',
    },
    paragraph: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
        color: '#F5F5DC',
    },
    teamNamesButton:{
        backgroundColor: '#556B2F',
        borderRadius: 5,
        width: '100%',
        height: 40,
        maxWidth: 300,
        marginBottom: 10
    },
    // teamNamesText:{
    //     fontSize: 24,
    //     color: '#F5F5DC',
    //     marginBottom: 10
    // },
    teams:{
        marginBottom:40,
    },
    textInput: {
        height: 50,
        backgroundColor: '#F5F5DC',
        color: '#000000',
        marginVertical: 10,
        fontSize: 20,
        borderRadius: 5,
        minWidth: 250,
        // width: '100%',
    },
    buttonLayout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#556B2F',
        borderRadius: 5,
        // width: '100%',
        height: 40,
        paddingHorizontal: 10,
        // maxWidth: 300,
        marginBottom: 10
    },
    danger: {
        backgroundColor: '#4f0100',
    },
    text: {
        fontSize: 20,
        color: '#F5F5DC',
    },
    list: {
        fontSize: 15,
        color: '#F5F5DC',
        borderRadius: 15,
        marginBottom: 10,
    },
    listHeader: {
        fontSize: 24,
        color: '#F5F5DC',
        textAlign: 'center'
    },
    listText: {
        fontSize: 18,
        color: '#F5F5DC',
        textAlign: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});

const inputStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        backgroundColor: '#F5F5DC',
        borderRadius: 5,
        color: 'black',
        textAlign: 'center',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 40,
      },
      inputAndroid: {
        marginTop: 10,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        backgroundColor: '#F5F5DC',
        textAlign: 'center',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 40,
      },
      inputWeb: {
        marginTop: 10,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        backgroundColor: '#F5F5DC',
        textAlign: 'center',
        borderRadius: 5,
        color: 'black',
        minHeight: 40,
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 40,
      }
});

export default styles;
export {inputStyles}; 