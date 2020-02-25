import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function ViewAllPurchasesScreen({ navigation, route }) {
    const {descriptionText} = route.params;
    React.useEffect(() => {
    if (route.params?.descriptionText) {
      // Description updated, do something with `route.params.desccription`
      // For example, send the description to the server
    }
  }, [route.params?.descriptionText]);

    return (
        <View style={styles.mainContainer}>
            <Text> All purchases listed here!</Text>
            <Text>Description: {(descriptionText)}</Text>
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

