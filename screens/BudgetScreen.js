import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation }) {
    const [state, setState] = useState({
        budget: ''
    });

    const submitHandler = (text) => {
        if (/\s/.test(text)) {
            alert('Price cannot contain whitespace!');
            return;
        }

        if (!text.match(/^[0-9.]*$/)) {
            alert('Price can only contain digits and decimals!');
            return;
        }

        if (text.length > 9) {
            alert('You don\'t really have that much money, do you? :)');
            return
        }
        if (text.length == 0) {
            alert('Please enter a price.');
            return;
        }
        if ((text.split(".").length) > 2) {
            alert('Price contains too many decimals.');
            return;
        }
        navigation.navigate('Home', {
            budget: text,
        });
    }

    const clearText = () => {
        setState({ budget: '' });
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.paragraphText}>Enter the total amount of money you expect to spend this month.</Text>
            <TextInput
                style={styles.input}
                keyboardType={'decimal-pad'}
                placeholder='        $0.00        '
                value={state.budget}
                onChangeText={(text) => setState({ ...state, budget: text })}
            />
            <Button
                title='Update Monthly Budget'
                clearTextOnFocus={true}
                style={styles.button}
                onPress={() => {
                    submitHandler(state.budget)
                    clearText()
                }
                }
            />
        </View>
    );
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    paragraphText: {
        textAlign: 'center',
        marginHorizontal: 60,
        fontFamily: 'quicksand',
        fontSize: 18
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
})

