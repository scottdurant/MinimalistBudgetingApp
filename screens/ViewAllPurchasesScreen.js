import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, Button, ToastAndroid, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PurchaseItem from '../components/PurchaseItem';
import currency from 'currency.js';

export default function ViewAllPurchasesScreen({ navigation, route }) {
    // receive values from AddPurchaseScreen
    const { description } = route.params;   // needs a default value
    const { price } = route.params;
    const { date } = route.params;
    const { key } = route.params;
    
    // list of purchases
    const [purchases, setPurchases] = useState([
        //{ description: 'groceries', price: '32', date: '',  key: '1' },
    ]);


    // when navigating to this screen, if key has been changed, there's a new item
    React.useEffect(() => {
        if (route.params?.key) {
            updatePurchaseList();
            var newTotalSpent = addAllPurchases().toString();
            navigation.navigate('Home', { total: newTotalSpent });
        }
    }, [route.params?.key]);


    // puts new purchase in the list of purchases
    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            return [
                {
                    description: description,
                    price: price,
                    date: date,
                    key: key, 
                },
                ...previousPurchases
            ];
        });
        debugger;
    }


    const removePurchase = (key) => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });
        ToastAndroid.show("purchase removed", ToastAndroid.SHORT);

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

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={purchases}
                        renderItem={({ item }) => (
                            <PurchaseItem item={item} removePurchase={removePurchase} />
                        )}
                    />
            </View>

            <View style={styles.button}>
                <Button
                    title="remove all purchases"
                    color="#ff1a1a"
                    onPress={() => callAlert()}
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