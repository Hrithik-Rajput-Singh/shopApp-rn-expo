import React ,{useState}from "react";
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity , Platform} from 'react-native';
import CartsItem from "./CartsItem";
import Card from '../Ui/Card';

const OrdersItems = (props) => {
    

    const [showDetail, setshowDetail] = useState(false)
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>{props.amounts.toFixed(2)}</Text> 
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetail ? "Hide Detail" : "Show Detail"} onPress={() => {setshowDetail(preState => !preState)}}/>
            {showDetail && (<View style={styles.shwdetails}>
              {props.making.map(itemInCart => (
                <CartsItem key = {itemInCart.productId} quantity={itemInCart.quantity} Amt={itemInCart.sum} title={itemInCart.productTitle}/>
            ))}                
            </View>)}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 5,
        // borderRadius: 10,
        // backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    amount: {
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: "#888"
    },
    shwdetails:{
        width: '100%',
        

    },
})

export default OrdersItems;