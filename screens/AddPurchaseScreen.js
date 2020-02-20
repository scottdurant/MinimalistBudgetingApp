import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Input } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddPurchaseScreen() {
    // useState declares a new state variable called value, and takes an initial state
    // useState returns two values: the current state and function that updates it
    const [state, setState] = React.useState({
        purchaseDescription: "",
        purchaseAmount: ""
    })

    function handleChange(event) {
        setState({ [event.target.name]: event.target.value });
    }

    return (
        <View style={styles.mainContainer}>
            <Text> Add a purchase!</Text>
            <TextInput
                name="purchaseDescription"
                style={{ height: 40 }}
                placeholder="Enter purchase description:"
                value={state.purchaseDescription}
                onChange={handleChange}
            />
            <TextInput
                name="purchaseAmount"
                keyboardType="number-pad"
                style={{ height: 40 }}
                placeholder="Enter purchase amount:"
                value={state.purchaseAmount}
                onChange={handleChange}
            />

            <View style={styles.bottomView}>
                <Button title="Done" />
            </View>
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
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        //alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
})

