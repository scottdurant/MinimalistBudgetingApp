import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, } from 'react-native';
import AddPurchase from '../components/AddPurchase';

export default function AddPurchaseScreen({ navigation }) {
    // send the description to ViewAllPurchasesScreen
    const submitHandler = (description, price, date) => {
        navigation.navigate('ViewAllPurchases', {
            description: description,
            price: price,
            date: date
        });
   }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AddPurchase submitHandler={submitHandler} />
               </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    header: {
        textAlign: 'center', // <-- the magic
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginTop: 18,
        marginBottom: 12,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    },
    list: {
        marginTop: 20,
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        //alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    inputText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'grey',
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1
    }

});

