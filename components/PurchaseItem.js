// this is a component that will display all the info for a purchase nicely
import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import { useRoute } from '@react-navigation/native';
import AddPurchaseScreen from '../screens/AddPurchaseScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function PurchaseItem({ pressHandler, item }) {
    return (
      <TouchableOpacity>
        {/* this works and im not sure why. It seems like it should be item.description... */}
        <Text style={styles.item}>{item.text}</Text>
      </TouchableOpacity>
   );
}


const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  },
});
