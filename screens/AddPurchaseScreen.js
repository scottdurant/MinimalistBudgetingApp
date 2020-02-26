import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, View, Button, TextInput, ToastAndroid } from 'react-native';
import AddPurchase from '../components/AddPurchase';
import PurchaseItem from '../components/PurchaseItem';
import { FlatList } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation, route }) {
    // for now, this screen will show a list of purchases, and allow
    // users to enter purchases

    // list of purchases
    const [purchases, setPurchases] = useState([
        { description: 'groceries', key: '1' },
        { description: 'gas', key: '2' },
    ]);

    const submitHandler = (text) => {
        setPurchases(previousPurchases => {
            return [
                { text, key: Math.random().toString() },
                ...previousPurchases
            ];
        });
    }


    //const [descriptionText, setDescriptionText] = React.useState('text');

    // function handleChange(event) {
    //     setState({ [event.target.name]: event.target.value });
    // }

    // function onSubmit() {
    //     ToastAndroid.show('Purchase Submitted!', ToastAndroid.SHORT);
    //     navigation.navigate('ViewAllPurchases');//, { descirption: 'Some description' });
    // }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <AddPurchase submitHandler={submitHandler}/>
                    <View style={styles.list}>
                        {/* fix scrolling issue with flex box*/}
                        <FlatList
                            data={purchases}
                            renderItem={({ item }) => (
                                <PurchaseItem item={item}/>
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );









    // old return...
    // return (
    //     <View style={styles.mainContainer}>
    //         <Text style={styles.header}>Description</Text>
    //         <TextInput
    //             name="purchaseDescription"
    //             style={styles.inputText}
    //             placeholder="Enter purchase description:"
    //             value={descriptionText}    
    //             onChangeText={(val) => setDescriptionText(val)}
    //         //onChange={handleChange}
    //         />
    //         <Text style={styles.header}>Amount</Text>
    //         <TextInput
    //             name="purchaseAmount"
    //             keyboardType="decimal-pad"
    //             // style={{ height: 40, }}
    //             style={styles.inputText}
    //             placeholder="Enter purchase amount:"
    //             value={purchaseAmount}
    //             onChange={handleChange}
    //         />
    //         <View style={styles.bottomView}>
    //             <Button
    //                 title="Submit"
    //                 onPress={() => {
    //                     navigation.navigate('ViewAllPurchases', {descriptionText: descriptionText});
    //                 }}
    //             />
    //         </View>
    //     </View>
    // );
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    },
    list: {
        marginTop: 20,
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

