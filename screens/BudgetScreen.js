import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation }) {
    const [state, setState] = useState({
        budget: '',
        categoryName: '',
        categoryAmountSpent: '',
        categoryAmountBudgeted: '',
    });

    const budgetSubmitHandler = (text) => {
        if (/\s/.test(text)) {
            alert('Price cannot contain whitespace!');
            return;
        }

        if (!text.match(/^[0-9.]*$/)) {
            alert('Price can only contain digits and decimals!');
            return;
        }

        if (text.length > 9) {
            alert('You don\'t really have that much money, do you? :)');
            return
        }
        if (text.length == 0) {
            alert('Please enter a price.');
            return;
        }
        if ((text.split(".").length) > 2) {
            alert('Price contains too many decimals.');
            return;
        }
        navigation.navigate('Home', {
            budget: text,
        });
    }

    const categorySubmitHandler = (categoryName, categoryAmountBudgeted) => {
        navigation.navigate('ViewAllPurchases', {
            categoryName: categoryName,
            categoryAmountBudgeted: categoryAmountBudgeted,
        });
    }

    const clearText = () => {
        setState({ budget: '', categoryName: '', categoryAmountBudgeted: ''});
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.paragraphText}>Enter the total amount of money you expect to spend this month.</Text>
            <View>
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
                        budgetSubmitHandler(state.budget)
                        clearText()
                    }}
                />
            </View>
            <View>
                <Text style={styles.paragraphText}>Create a spending cagetory (i.e. groceries, rent, clothes)</Text>
                <TextInput
                    style={styles.input}
                    placeholder='category name'
                    value={state.categoryName}
                    onChangeText={(text) => setState({ ...state, categoryName: text })}
                />
                <TextInput
                    style={styles.input}
                    keyboardType={'decimal-pad'}
                    placeholder='amount budgeted (monthly)'
                    value={state.categoryAmountBudgeted}
                    onChangeText={(text) => setState({ ...state, categoryAmountBudgeted: text })}
                />
                <Button
                    title="Submit"
                    style={styles.button}
                    onPress={() => {
                        categorySubmitHandler(state.categoryName, state.categoryAmountBudgeted)
                        clearText()
                    }}
                />
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
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

