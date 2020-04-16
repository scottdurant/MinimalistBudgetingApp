import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AddPurchase from '../components/AddPurchase';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation }) {
    // send the description to ViewAllPurchasesScreen
    const submitHandler = (description, price, date, category) => {
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
            category: category
        });
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={styles.content}>
                            <AddPurchase submitHandler={submitHandler} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
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

