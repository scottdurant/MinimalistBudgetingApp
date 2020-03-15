import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PurchaseItem from '../components/PurchaseItem';


export default function ViewAllPurchasesScreen({ navigation, route }) {
    // receive values from AddPurchaseScreen
    const { description } = route.params;   // needs a default value
    const { price } = route.params;
    const { date } = route.params;

    // when navigating to this screen, check if description has been changed
    React.useEffect(() => {
        if (route.params?.description) {
            // Description updated, update the list with new description  
            updatePurchaseList();
        }
    }, [route.params?.description]);


    // list of purchases with some default values
    const [purchases, setPurchases] = useState([
        { description: 'groceries', price: '32', date: new Date(),  key: '1' },
    ]);


    // takes the new description and puts it in the list of purchases
    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            {/*@TODO: update how key gets generated*/ }
            return [
                { description: description,
                  price: price,
                  date: date,
                  key: Math.random().toString() },
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