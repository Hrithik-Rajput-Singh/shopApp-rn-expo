import React from 'react';
import { View,Text,StyleSheet, Button, TouchableOpacity, Platform, TouchableNativeFeedback, Image} from 'react-native';
import Product from '../../model/product';
import Card from '../Ui/Card';

const UserItem = (props) => {

    let TouchableInput = TouchableOpacity
    if (Platform.OS === 'android'){
        TouchableInput = TouchableNativeFeedback
    }

    
    return(
    <TouchableInput onPress={props.onSelect}>
        <Card style={styles.producttt}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.ima}}/>
            </View>
            <View style={styles.detail}>
                <Text style={styles.title}>{props.tit}</Text>
                <Text style={styles.price}>${props.pri}</Text>
            </View>
            <View style={styles.action}>
                <Button color={"red"} title = "Edit" onPress={props.onSelect}/>
                <Button color={"red"} title = "Delete"  onPress={props.onDelete}/>
            </View>
        </Card>
    </TouchableInput>
    )

};

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
        height: '15%',
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
        height: '25%',
        paddingHorizontal: 18,
    }

});

export default UserItem;