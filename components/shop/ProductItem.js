import React from 'react';
import { View,Text,StyleSheet, Button, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import Product from '../../model/product';
import Card from '../Ui/Card';

const ProductItem = (props) => {

    let TouchableInput = TouchableOpacity
    if (Platform.OS === 'android'){
        TouchableInput = TouchableNativeFeedback
    }

    
    return(
    <TouchableInput onPress={props.onViewDetail}>
        <Card style={styles.producttt}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}}/>
            </View>
            <View style={styles.detail}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price}</Text>  
            </View>
            <View style={styles.action}>
                <Button color={"red"} title = "View Detail" onPress={props.onViewDetail}/>
                <Button color={"red"} title = "Add To Cart"  onPress={props.onAddToCart}/>
            </View>
        </Card>
    </TouchableInput>
    )

};

//props.price .toFixed(2)

const styles = StyleSheet.create({
    producttt: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 5,
        // borderRadius: 10,
        // backgroundColor: 'white',
        height: 350,
        margin: 20
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detail:{
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    action: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 18,
    }

})

export default ProductItem;