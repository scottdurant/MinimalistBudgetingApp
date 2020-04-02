import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation }) {
    const [state, setState] = useState({
        budget: ''
    });

    const submitHandler = (budget) => {
        navigation.navigate('Home', {
            budget: budget,
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

