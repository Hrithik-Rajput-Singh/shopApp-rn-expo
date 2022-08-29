import React from 'react';
import { View,Text,StyleSheet, Button, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


const CartsItem = (props) => {
    return <View style={styles.cartitem}>
        <Text style={styles.itemdata}>
            <Text style={styles.qty}>{props.quantity}</Text><Text style={styles.title}>{props.title}</Text>
        </Text>
        <View style={styles.itemdata}>
            <Text style={styles.amt}>{props.Amt}</Text>
            {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                <Ionicons 
                title="delete"
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={23}
                    color="red"
                />
            </TouchableOpacity>}
        </View>
    </View>
};

const styles = StyleSheet.create({
    cartitem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemdata: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        color: '#888',
        fontSize: 16
    },
    title: {
        fontSize: 16
    },
    amt: {
        fontSize: 16
    },
    delete: {
        marginLeft: 20
    },

});

export default CartsItem;