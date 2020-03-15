import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default function AddPurchaseScreen({ route, navigation }) {
    const { description } = route.params;

    return (
        <View style={styles.mainContainer}>
            <Text> Change settings!</Text>
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

