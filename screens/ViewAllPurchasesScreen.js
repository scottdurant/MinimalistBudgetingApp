import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PurchaseItem from '../components/PurchaseItem';




export default function ViewAllPurchasesScreen({ navigation, route }) {
    const { description } = route.params;   // needs a default value

    // call setPurchases whenever user navigates to viewAllPurchasesScreen
    // useFocusEffect(
    //     React.useCallback(() => {
    //         updatePurchaseList();
    //         //const unsubscribe = API.subscribe(userId, user => setUser(data));
    //     })
    // );


    // list of purchases
    const [purchases, setPurchases] = useState([
        { description: 'groceries', price: '32', key: '1' },
        { description: 'gas', price: '27', key: '2' },
    ]);

    // // adds the given purchase to the list of purchases
    // setPurchases(previousPurchases => {
    //     Keyboard.dismiss();
    //     return [
    //         { description: {description}, key: Math.random().toString() },
    //         ...previousPurchases
    //     ];
    // });

    const updatePurchaseList = () => {
        setPurchases(previousPurchases => {
            Keyboard.dismiss();
            return [
                { description: description, key: Math.random().toString() },
                ...previousPurchases
            ];
        });
    }

    const removePurchase = (key) => {
        setPurchases(previousPurchases => {
            return previousPurchases.filter(purchase => purchase.key != key);
        });
    };

    return (
        <View style={styles.mainContainer}>
            <Text> Description: {description} </Text>
            <Button 
            title='update list'
            onPress={() => updatePurchaseList()}
            />

            {/* move all 'purchase' stuff from AddPurchaseScreen to here!!  */}
            <FlatList
                data={purchases}
                renderItem={({ item }) => (
                    <PurchaseItem item={item} removePurchase={removePurchase}/>
                )}
            />
        </View>
    );
}




const styles = StyleSheet.create({
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
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        //alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
})

// const {descriptionText} = route.params;
    //     React.useEffect(() => {
    //     if (route.params?.descriptionText) {
    //       // Description updated, do something with `route.params.desccription`
    //       // For example, send the description to the server
    //     }
    //   }, [route.params?.descriptionText]);

