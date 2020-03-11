import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, View, Button, TextInput, ToastAndroid } from 'react-native';
import AddPurchase from '../components/AddPurchase';
import PurchaseItem from '../components/PurchaseItem';
import { FlatList } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation, route }) {
    // for now, this screen will show a list of purchases, and allow
    // users to enter purchases

    // list of purchases
    const [purchases, setPurchases] = useState([
        { description: 'groceries', price: '32', key: '1' },
        { description: 'gas', price: '27', key: '2' },
    ]);

    const submitHandler = (description) => {
        // send the description to ViewAllPurchasesScreen
        navigation.navigate('ViewAllPurchases', {
            description: description
        });



        // // adds the given purchase to the list of purchases
        // setPurchases(previousPurchases => {
        //     Keyboard.dismiss();
        //     return [
        //         { description, key: Math.random().toString() },
        //         ...previousPurchases
        //     ];
        // });
    }

    const removePurchase = (key) => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });
    };


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AddPurchase submitHandler={submitHandler} />
                    <View style={styles.list}>

                        {/* Need this to show up on ViewAllPurchases Screen */}
                        {/* fix scrolling issue with flex box*/}
                        <FlatList
                            data={purchases}
                            renderItem={({ item }) => (
                                <PurchaseItem item={item} removePurchase={removePurchase} />
                            )}
                        />


                    </View>
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

