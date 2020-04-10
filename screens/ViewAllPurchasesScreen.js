import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, Button, ToastAndroid, Alert, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryItem from '../components/CategoryItem';
import PurchaseItem from '../components/PurchaseItem';
import currency from 'currency.js';

export default function ViewAllPurchasesScreen({ navigation, route }) {
    // receive values from AddPurchaseScreen
    const { description } = route.params;   // needs a default value
    const { price } = route.params;
    const { date } = route.params;
    const { key } = route.params;
    const { category } = route.params;

    // receive values from BudgetScreen
    const { categoryName } = route.params;
    const { categoryAmountBudgeted } = route.params;


    // let's us use categoryName as the key, so we don't interfere with key from purchases
    const keyExtractor = item => item.categoryName;


    // keep track of the previous category so we know if we need to update the category list
    const [previousCategoryName, setPreviousCategoryName] = useState('');

    // toggles showing all purchases or showing all spending categories
    const [showAllPurchases, setShowAllPurchases] = useState(true);

    const [purchases, setPurchases] = useState([
        //{ description: 'groceries', price: '32', date: '', category: '',  key: '1' },
    ]);

    const [spendingCategories, setSpendingCategories] = useState([
        //{ categoryName: 'gas', categoryAmountSpent: '20', categoryAmountBudgeted: '50'}
    ])


    // when navigating to this screen, if key has been changed, there's a new item
    React.useEffect(() => {
        if (route.params?.key) {
            if (categoryExists()) {
                updatePurchaseList();
                var newTotalSpent = addAllPurchases().toString();
                navigation.navigate('Home', { total: newTotalSpent });
            } else {
                Alert.alert(
                    'Category does not exist',
                    'Please create a category on the budget tab before using it.',
                    [
                        { text: 'Ok', onPress: () => { } },
                    ],
                    { cancelable: false }
                )
            }
        }
    }, [route.params?.key]);

    ///// Functions related to purchases /////

    // puts new purchase in the list of purchases
    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            return [
                {
                    description: description,
                    price: price,
                    date: date,
                    category: category,
                    key: key,
                },
                ...previousPurchases
            ];
        });
    }

    const removePurchase = (key) => {
        var categoryToSubtractFrom = '';
        var amountToSubtract = '';
        debugger;
        var i = 0;
        for (i = 0; i < purchases.length; i++) {
            if (purchases[i].key === key) {
                categoryToSubtractFrom = purchases[i].category;
                amountToSubtract = purchases[i].price;
            }
        }

        // remove the purchase amount from that purchase's category
        for (i = 0; i < spendingCategories.length; i++) {
            if (spendingCategories[i].categoryName === categoryToSubtractFrom) {
                spendingCategories[i].categoryAmountSpent = currency(spendingCategories[i].categoryAmountSpent).subtract(currency(amountToSubtract));
            }
        }

        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });
        ToastAndroid.show('purchase removed', ToastAndroid.SHORT);

        // go to home screen and add up the purchases without the removed purchase
        navigation.navigate('Home', { total: addAllPurchasesAfterRemoval(key).toString() });
    };

    const removeAllPurchases = () => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => false);
        });
        ToastAndroid.show("all purchases removed", ToastAndroid.SHORT);
        navigation.navigate('Home', { total: 0 });
    }

    const addAllPurchasesAfterRemoval = (keyToSkip) => {
        var i = 0;
        var total = 0;

        for (i = 0; i < purchases.length; i++) {
            if (purchases[i].key != keyToSkip) {
                total = currency(total).add(purchases[i].price);
            }
        }
        return currency(total);
    }

    // adds up all purchases. Its a little hacky but it works
    function addAllPurchases() {
        var i;
        var total = 0;
        if (purchases.length == 0) {
            return price;
        }

        for (i = 0; i < purchases.length; i++) {
            total = currency(total).add(purchases[i].price);
        }

        return currency(total).add(currency(price));
    }

    // creates an alert for the remove all purchases button
    const callAlert = () => {
        Alert.alert(
            'Are you sure you want to remove all purchases?',
            'This cannot be undone.',
            [
                { text: 'no', onPress: () => { } },
                { text: 'yes', onPress: () => removeAllPurchases() },
            ],
            { cancelable: false }
        )
    }




    ///// Functions related to categories /////




    // Does the category given on the purchase item exist already?
    // Also adds the price of the just added purchase to the total spent in that ourchase's category
    const categoryExists = () => {
        var i = 0;
        // user did not select a category, which is ok
        if (category === '') { return true }

        if (spendingCategories != null && spendingCategories !== undefined) {
            for (i = 0; i < spendingCategories.length; i++) {
                if (spendingCategories[i].categoryName === category) {
                    spendingCategories[i].categoryAmountSpent = currency(spendingCategories[i].categoryAmountSpent).add(currency(price));
                    return true
                }
            }
            return false;
        }
    }

    const updateCategoryList = () => {
        setPreviousCategoryName(categoryName);
        setSpendingCategories(previousCategories => {
            Keyboard.dismiss();
            return [
                {
                    categoryName: categoryName,
                    categoryAmountBudgeted: categoryAmountBudgeted
                },
                ...previousCategories
            ];
        });
    }

    // returns true if there's a new category, false otherwise. Prevents duplicate categories
    const newCategory = () => {
        var i = 0;
        if (categoryName === '' || categoryName === undefined) { return false; }
        if (previousCategoryName === categoryName) { return false; }

        if (spendingCategories != null && spendingCategories !== undefined) {
            for (i = 0; i < spendingCategories.length; i++) {
                if (spendingCategories[i].categoryName === categoryName) {
                    return false
                }
            }
            return true;
        }
        return false;
    }

    const removeSpendingCategory = (categoryName) => {
        setSpendingCategories(previousCategories => {
            return previousCategories.filter(category => category.categoryName != categoryName);
        });
        ToastAndroid.show('spending category removed', ToastAndroid.SHORT);

        // remove given spending category from any purchase made
        var i = 0;
        for (i = 0; i < purchases.length; i++) {
            if (purchases[i].category == categoryName) {
                purchases[i].category = '';
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {showAllPurchases && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={purchases}
                        renderItem={({ item }) => (
                            <PurchaseItem item={item} removePurchase={removePurchase} />
                        )}
                    />
                )}
                {!showAllPurchases && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={spendingCategories}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <CategoryItem item={item} removeSpendingCategory={removeSpendingCategory} />
                        )}
                    />
                )}
            </View>
            <View style={styles.button}>
                <Button
                    title="remove all purchases"
                    color="#ff1a1a"
                    onPress={() => callAlert()}
                />
                <Button
                    title="Toggle All Purchases and Spending Categories"
                    onPress={() => {
                        setShowAllPurchases(!showAllPurchases);
                        if (newCategory()) {
                            updateCategoryList();
                        }
                    }}
                />
            </View>

        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        flex: 5,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 22,
        paddingRight: 22
    },
    button: {
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
    }
});