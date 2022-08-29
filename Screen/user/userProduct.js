import React from "react";
import {FlatList, Text, TouchableOpacity, Platform, Alert, StyleSheet, View} from 'react-native';
import UserItem from '../../components/shop/UserItem';
import { Ionicons } from "@expo/vector-icons";
import {useSelector, useDispatch} from 'react-redux';
import * as productAction from '../../Store/action/product'

const userProductScreen = (props) => {

    const userItems = useSelector(state => state.productItem.userProduct)
    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        Alert.alert(
            "Conform Delete",
            "Are u sure u want to delete",
            [
                {
                    text: 'Cancel',
                    style: "default"

                },
                {
                    text: "OK",style: "destructive", onPress: () =>  {dispatch(productAction.addTodelete(id))}
                }
            ] 

        )
    }

    if(userItems.length === 0){
        return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>No product to display</Text>
            </View>
        )
    };

    
    return(
        <FlatList data={userItems}  renderItem={itemData => (<UserItem 
        ima={itemData.item.imageUrl} 
        tit={itemData.item.title}
         pri={itemData.item.price}
         onDelete={() => {deleteHandle(itemData.item.id)}}
         onSelect={() => {props.navigation.navigate({
                    routeName: "Edit",
                    params: {
                        productId: itemData.item.id,
                        }
                    });
              }}

         />
         )}/>
    )
};

userProductScreen .navigationOptions = navData =>  {
    return{
        headerTitle: 'user',
        headerLeft: ()=>(
            <TouchableOpacity onPress={() => {navData.navigation.toggleDrawer()}} style={styles.headerL}>
              <Ionicons 
                title="order"
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                size={27}
                color="brown"
              />
           </TouchableOpacity>
           ),
           headerRight: ()=>(
            <TouchableOpacity onPress={() => {navData.navigation.navigate('Edit')}} style={styles.headerR}>
              <Ionicons 
                title="edit"
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={27}
                color="brown"
              />
           </TouchableOpacity>
           )
    }
};

const styles = StyleSheet.create({
    headerL: {
        marginLeft: 10,
        paddingLeft: 10,
    },
    headerR: {
        marginRight: 10,
        paddingRight: 10,
    },
})



export default userProductScreen ;