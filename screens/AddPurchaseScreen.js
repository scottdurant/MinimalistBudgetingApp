import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, } from 'react-native';
import AddPurchase from '../components/AddPurchase';

export default function AddPurchaseScreen({ navigation }) {
    // send the description to ViewAllPurchasesScreen
    const submitHandler = (description, price, date) => {
        if (description.length == 0) {
            alert('Please enter a description.');
        }
        if (description[0] == ' ') {
            alert('Please enter a description.');
            return;
        }
        if (price.length == 0) {
            alert('Please enter a price.');
            return;
        }
        if ((price.split(".").length) > 2) {
            alert('Price contains too many decimals.');
            return;
        }
        navigation.navigate('ViewAllPurchases', {
            description: description,
            price: price,
            date: date,
            key: Math.random().toString(),
        });
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AddPurchase submitHandler={submitHandler}  />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    }
});

