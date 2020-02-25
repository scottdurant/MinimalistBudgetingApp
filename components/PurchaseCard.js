// this is a component that will display all the info for a purchase nicely
import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import { useRoute } from '@react-navigation/native';
import AddPurchaseScreen from '../screens/AddPurchaseScreen';

///////////////////////////////////////////
// for now this will just diplay a purchase amount and description.
// I will make it look nice later
///////////////////////////////////////////

// function Item({ title }) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }


function MyPurchase() {
  const route = useRoute();
  //return <Text>{route.params.description}</Text>;
}


export default function PurchaseCard(props) {
    return (
      <View>
        <Text>Purchase</Text>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#00bfff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
