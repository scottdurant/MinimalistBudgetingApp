import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ToastAndroid } from 'react-native';

export default function AddPurchaseScreen({ navigation, route }) {
    // useState declares a new state variable called value, and takes an initial state
    // useState returns two values: the current state and function that updates it

    // const [state, setState] = React.useState({
    //     purchaseDescription: "",
    //     purchaseAmount: ""
    // })

    const [descriptionText, setDescriptionText] = React.useState('text');

    function handleChange(event) {
        setState({ [event.target.name]: event.target.value });
    }

    function onSubmit() {
        ToastAndroid.show('Purchase Submitted!', ToastAndroid.SHORT);
        navigation.navigate('ViewAllPurchases');//, { descirption: 'Some description' });
    }


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.header}>Description</Text>
            <TextInput
                name="purchaseDescription"
                style={styles.inputText}
                placeholder="Enter purchase description:"
                value={descriptionText}    
                onChangeText={(val) => setDescriptionText(val)}
            //onChange={handleChange}
            />
            <Text style={styles.header}>Amount</Text>
            {/* <TextInput
                name="purchaseAmount"
                keyboardType="decimal-pad"
                // style={{ height: 40, }}
                style={styles.inputText}
                placeholder="Enter purchase amount:"
                value={purchaseAmount}
                onChange={handleChange}
            /> */}
            <View style={styles.bottomView}>
                <Button
                    title="Submit"
                    onPress={() => {
                        navigation.navigate('ViewAllPurchases', {descriptionText: descriptionText});
                    }}
                />
            </View>
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
        //paddingTop: (Platform.OS === 'ios') ? 20 : 0
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

