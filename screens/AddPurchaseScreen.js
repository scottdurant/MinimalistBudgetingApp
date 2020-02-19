import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default function AddPurchaseScreen() {
    return (
        <View>
            <Text style={styles.headline}>Add a purchase!</Text>
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
    }
})

