import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

// AddPurchase component consists of a text input and a button


export default function AddPurchase({ submitHandler }) {
    // keeps track of what the user types in
    const [text, setText] = useState('');

    // sets text to whatever the user entered
    const changeHandler = (val) => {
        setText(val);
    };
    
    return (
        <View>
            <TextInput
            style={styles.input}
            placeholder='enter purchase description'
            onChangeText={changeHandler}
            value={text}
            />
            <Button title='add purchase' onPress={() => submitHandler(text)}/>
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