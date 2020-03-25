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

    const [totalSpent, setTotalSpent] = useState(0);

    // when navigating to this screen, check if description has been changed
    React.useEffect(() => {
        if (route.params?.description) {
            // Description updated, update the list with new description  
            updatePurchaseList();
        }
    }, [route.params?.description]);


    // useFocusEffect(
    //     React.useCallback(() => {
    //         //alert('Screen was focused');
    //         // Do something when the screen is focused
    //         return () => {
    //             // do something when screen goes out of foucs
    //             addAllPurchases();
    //         };
    //     }, [])
    // );

    ////////////////////////// tru using useFocusEffect to call addAllPurchases when leaving the screen

    // takes the new description and puts it in the list of purchases
    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            {/*@TODO: update how key gets generated*/ }
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
    }

    // removes a purchase when clicked
    const removePurchase = (key) => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });
    };

    // const addAllPurchases = () => {
    //     var i;
    //     var total = 0;
    //     //console.log(purchases.length);
    //     for (i = 0; i < purchases.length; i++) {
    //         //console.log(purchases[i]);
    //         total = currency(total).add(purchases[i].price);
    //     }
    //     //console.log(total);
    //     //setTotalSpent(total);
    //     return total;
    // }

    const goHome = () => {
        var i;
        var total = 0;
        for (i = 0; i < purchases.length; i++) {
            total = currency(total).add(purchases[i].price);
        }

        navigation.navigate('Home', {
            total: total,
        });
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
                <View>
                    <Button
                        title="sum all purchases"
                        onPress={() => addAllPurchases()}
                    />
                    
                    {/* For some reason this button makes it go to the home screen when
                    you enter a purchase ????? */}
                    <Button
                        title="go home!"
                        onPress={goHome()}
                    />

                </View>
                <View>
                    {/* <Text>Total Spent: {(totalSpent.toString())}</Text> */}
                    <Text>Total spent: {currency(totalSpent, { formatWithSymbol: true }).format().toString()}</Text>
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