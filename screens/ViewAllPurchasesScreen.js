import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PurchaseItem from '../components/PurchaseItem';
import currency from 'currency.js';
import { useFocusEffect } from '@react-navigation/native';

export default function ViewAllPurchasesScreen({ navigation, route }) {
    // receive values from AddPurchaseScreen
    const { description } = route.params;   // needs a default value
    const { price } = route.params;
    const { date } = route.params;

    // list of purchases with some default values
    const [purchases, setPurchases] = useState([
        //{ description: 'groceries', price: '32', date: '',  key: '1' },
    ]);


    // when navigating to this screen, check if description has been changed
    React.useEffect(() => {
        if (route.params?.description) {
            // Description updated, update the list with new description  
            updatePurchaseList();
            var newTotalSpent = addAllPurchases();
            navigation.navigate('Home', { total: newTotalSpent });
        }
    }, [route.params?.description]);


    // takes the new description and puts it in the list of purchases
    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            return [
                {
                    description: description,
                    price: price,
                    date: date,
                    key: Math.random().toString()
                },
                ...previousPurchases
            ];
        });
        debugger;
    }

    // removes a purchase when clicked
    const removePurchase = (key) => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });

        // go to home screen and add up the purchases without the removed purchase
        navigation.navigate('Home', {total: addAllPurchasesAfterRemoval(key)});
    };

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
            <View style={styles.content}>
                <View style={styles.list}>
                    <FlatList
                        data={purchases}
                        renderItem={({ item }) => (
                            <PurchaseItem item={item} removePurchase={removePurchase} />
                        )}
                    />
                </View>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    },
    headline: {
        textAlign: 'center', // <-- the magic
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        marginTop: 12,
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
    list: {
        marginTop: 20,
    },
})