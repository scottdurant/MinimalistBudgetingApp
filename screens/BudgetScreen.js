import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Keyboard, KeyboardAvoidingView, SafeAreaView, ToastAndroid } from 'react-native';
import { TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function AddPurchaseScreen({ navigation }) {
    const [state, setState] = useState({
        budget: '',
        budgetSet: false,
        categoryName: '',
        categoryAmountSpent: 0,
        categoryAmountBudgeted: '',
        categoryPercentSpent: 0.00,
    });

    const budgetSubmitHandler = (text) => {
        if (priceInputValid(text)) {
            if (text !== 0) {
                navigation.navigate('Home', {
                    budget: text,
                    budgetSet: true,
                });
            }
        }
    }

    const categorySubmitHandler = (categoryName, categoryAmountBudgeted, categoryPercentSpent) => {
        if (descriptionInputValid(categoryName) && priceInputValid(categoryAmountBudgeted)) {
            navigation.navigate('ViewAllPurchases', {
                categoryName: categoryName,
                categoryAmountBudgeted: categoryAmountBudgeted,
                categoryPercentSpent: categoryPercentSpent,
            });
        }
    }

    const priceInputValid = (input) => {
        if (/\s/.test(input)) {
            alert('Currency values cannot contain whitespace.');
            return false;
        }

        if (!input.match(/^[0-9.]*$/)) {
            alert('Currency values can only contain digits and decimals.');
            return false;
        }

        if (input.length > 9) {
            alert('You don\'t really have that much money, do you? :)');
            return false;
        }
        if (input.length == 0) {
            alert('Please enter a budget amount.');
            return false;
        }
        if ((input.split(".").length) > 2) {
            alert('Currency value contains too many decimals.');
            return false;
        }

        return true;
    }

    const descriptionInputValid = (text) => {
        if (text.length == 0) {
            alert('Please enter a category name.');
            return false;
        }
        if (text[0] == ' ') {
            alert('Category name cannot contain only whitespace.');
            return false;
        }

        return true;
    }

    const clearText = () => {
        setState({ budget: '', categoryName: '', categoryAmountBudgeted: '' });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset="-200">
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.content}>
                    <Text style={styles.text}>Enter the total amount of money you expect to spend this month.</Text>
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
                        <Text style={styles.text}>Create a spending cagetory (i.e. groceries, rent, clothes)</Text>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40
    },
    text: {
        fontFamily: 'quicksand',
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 20
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

