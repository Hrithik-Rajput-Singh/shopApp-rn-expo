import React ,{useState, useCallback, useEffect}from "react";
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity , Platform, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CartsItem from "../../components/shop/CartsItem";
import * as cartAction from '../../Store/action/cart';
import * as orderAction from '../../Store/action/orders';
import Card from '../../components/Ui/Card';

const CartScreen = (props) => {
    const [loading, setloading] = useState(false)
    const totalAmounts = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {

        //making it array 
        const transformingCartItem = [];
        for (const key in state.cart.items){
            transformingCartItem.push({
                productId: key,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,

            });
        }
        return transformingCartItem;
        
    });


    const dispatch = useDispatch()

    const handlingOrderNow = useCallback(async () => {
        setloading(true)
        await dispatch(orderAction.addToOrder(cartItems, totalAmounts))
        setloading(false)
    },[setloading, cartItems,totalAmounts])


    useEffect(() => {
        handlingOrderNow
      
    }, [handlingOrderNow])

  
        
    return <View style={styles.screen}>
        <Card  style={styles.summary}>
            <Text  style={styles.text}>total Amount <Text  style={styles.amount}>${Math.round(totalAmounts.toFixed(2)* 100) / 100}</Text></Text>
            {/* math 100/100 will ensure u never ended with - or deciaml no */}
            {loading ? (<ActivityIndicator size="large" color="red"/> ):
            (<Button title="Order Now" onPress={handlingOrderNow}/>)}
        </Card>
        <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData => (

            <CartsItem 
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            Amt={itemData.item.sum}
            deletable
            onRemove={() => {
                dispatch(cartAction.addToRemove(itemData.item.productId))
            }}
      

            />
            )}/>
  
    </View>

}

const styles = StyleSheet.create({
  screen:{
      margin: 20,

  },
  summary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 10,
    //   shadowColor: 'black',
    //   shadowOpacity: 0.26,
    //   shadowOffset: {width: 0, height: 2},
    //   shadowRadius: 5,
    //   borderRadius: 10,
    //   borderColor: 'white',
  },
  text: {
      fontSize: 18
  },
  amount: {
      color: 'red',
  },
})

export default CartScreen;