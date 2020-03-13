import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

// AddPurchase component includes fields for user input and a button to submit data
export default function AddPurchase({ submitHandler }) {
    // keeps track of what the user types in
    const [state, setState] = useState({
        description: "",
        price: ""
    });

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='enter purchase description'
                value={state.description}
                onChangeText={(text) => setState({...state, description: text})}
            />
            <TextInput
                style={styles.input}
                placeholder='enter purchase price'
                value={state.price} 
                onChangeText={(text) => setState({...state, price: text})}
            />
            <Button title='add purchase' onPress={() => submitHandler(state.description, state.price)} />
        </View>
    );
}


const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: 'center'
    }
})