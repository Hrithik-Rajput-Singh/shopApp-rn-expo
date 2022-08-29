import React from "react";
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity , Platform, ScrollView, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartAction from '../../Store/action/cart'


const ProductDetail = (props) => {
    const idOfProduct = props.navigation.getParam("productId")
    const selectedProduct = useSelector(state => state.productItem.availableProduct.find(prod => prod.id === idOfProduct))

    const dispatch = useDispatch()

    return(
        <ScrollView>
            <Image style={styles.image} source = {{uri: selectedProduct.imageUrl}}/>
            <View style={styles.action}>
                <Button title="Add To Cart" onPress={() => {dispatch(cartAction.addTocart(selectedProduct))}}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price:{
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center'
    },
    action: {
        marginVertical: 10,
        alignItems: 'center',
    },

})

ProductDetail.navigationOptions = (navigationData) => {
    const prodTitle = navigationData.navigation.getParam("productTitle");

    return {
        headerTitle: prodTitle,
      }
}

export default ProductDetail;