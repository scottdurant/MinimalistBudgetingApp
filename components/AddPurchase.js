import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// AddPurchase component includes fields for user input and a button to submit data
export default function AddPurchase({ submitHandler }) {
    // keeps track of what the user types in
    const [state, setState] = useState({
        description: "",
        price: "",
        date: new Date(),
    });

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (value, selectedDate) => {
        const currentDate = selectedDate || state.date;
        setShow(Platform.OS === 'ios');
        setState({...state, date: currentDate});
    }

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode('date');
    }

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
            {show && (
                <DateTimePicker 
                    value={state.date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )}
            <Button title='select date' style={styles.button} onPress={showDatePicker} />
            <Button title='add purchase' style={styles.button} onPress={() => submitHandler(state.description, state.price, state.date.toDateString())} />
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
    },
    button: {
        marginTop: 20
    }
})