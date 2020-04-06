import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// AddPurchase component includes fields for user input and a button to submit data
export default function AddPurchase({ submitHandler }) {
    const [state, setState] = useState({
        description: '',
        price: '',
        date: new Date(),
        key: '',
    });

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (selectedDate) => {
        const currentDate = selectedDate || state.date;
        setShow(Platform.OS === 'ios');
        setState({ ...state, date: currentDate });
    }

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode('date');
    }

    const clearInput = () => {
        setState({
            description: '',
            price: '',
            date: new Date(),
        })
    }

    const vaildateAndSetPurchasePrice = (text) => {
        if (/\s/.test(text)) {
            alert('Price cannot contain whitespace!');
            return;
        }

        if ( !text.match(/^[0-9.]*$/) ) {
            alert('Price can only contain digits and decimals!');
            return;
        }

        if (text.length > 9) {
            alert('You don\'t really have that much money, do you? :)' );
            return
        }

        setState({ ...state, price: text });
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                selectionColor={Colors.gray}
                placeholder='enter purchase description'
                value={state.description}
                onChangeText={(text) => setState({ ...state, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder='enter purchase price'
                keyboardType={'decimal-pad'}
                value={state.price}
                onChangeText={(text) => vaildateAndSetPurchasePrice(text)}
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
            <View style={styles.separator} ></View>
            <Button title='add purchase' style={styles.button} onPress={() => {
                submitHandler(state.description, state.price, state.date.toDateString(), state.key)
                clearInput();
            }}
            />
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
    separator: {
        marginVertical: 6,
    },
})