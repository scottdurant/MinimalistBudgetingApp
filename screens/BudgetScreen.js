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
            <Text style={styles.paragraphText}>Update your monthly budget here. This number is the
            total amount of money you expect to spend this month.
            </Text>
            <TextInput
                style={styles.input}
                keyboardType={'decimal-pad'}
                placeholder='total budget for this month'
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
    headline: {
        textAlign: 'center', // <-- the magic
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    paragraphText: {
        alignItems: 'center',
        marginHorizontal: 40,
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        //alignItems: 'center',
        position: 'absolute',
        bottom: 0
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

