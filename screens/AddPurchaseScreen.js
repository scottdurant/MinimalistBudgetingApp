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

    return (//style={styles.mainContainer}
        <View style={styles.mainContainer}>
            <Text style={styles.header}>Description</Text>
            <TextInput
                name="purchaseDescription"
                //style={{height: 40}}
                style={styles.inputText}
                placeholder="Enter purchase description:"
                value={state.purchaseDescription}
                onChange={handleChange}
            />
            <Text style={styles.header}>Amount</Text>
            <TextInput
                name="purchaseAmount"
                keyboardType="decimal-pad"
                // style={{ height: 40, }}
                style={styles.inputText}
                placeholder="Enter purchase amount:"
                value={state.purchaseAmount}
                onChange={handleChange}
            />
        </View>

        
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
    inputText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'grey',
        height: 40, 
        borderColor: 'gray',
        borderBottomWidth: 1
    }
    
})

