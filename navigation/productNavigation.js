import React from 'react';
import {Platform,SafeAreaView,Button,view, View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import productOverview from '../Screen/shops/productOverview';
import ProductDetail from '../Screen/shops/productDetail'
import CartScreen from '../Screen/shops/cartScreen';
import OrderScreen from '../Screen/shops/orderScreen';
import userProductScreen from '../Screen/user/userProduct';
import AuthScreen from '../Screen/user/AuthScreen'
import { createDrawerNavigator , DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import EditScreen from '../Screen/user/editScreen';
import startUp from '../Screen/startUp';
import {useDispatch} from 'react-redux';
import * as authAction from '../Store/action/auth'



const ProductNavigator = createStackNavigator(
    {
        overallProduct: {
            screen: productOverview
        },
        Detail: {
            screen: ProductDetail
        },
        Cart: CartScreen,
    

    },{
        navigationOptions: {
            drawerIcon: drawerConfig => (<Ionicons name={"ios-cart"} size={23} color={drawerConfig.activeTintColor}/>)
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? 'grey' : 'white' 
            },
  
            headerTintColor: '#ff6347',

        }
    }
);

const OrderNavigator = createStackNavigator(
    {
        order: OrderScreen 
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (<Ionicons name={"ios-list"} size={23} color={drawerConfig.activeTintColor}/>)
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? 'grey' : 'white' 
            },
  
            headerTintColor: '#ff6347',

        }
    }
);
const userNavigator = createStackNavigator(
    {
        user: {
            screen: userProductScreen
        },
        Edit: EditScreen,
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (<Ionicons name={"ios-create"} size={23} color={drawerConfig.activeTintColor}/>)
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? 'grey' : 'white' 
            },
  
            headerTintColor: '#ff6347',

        }
    }
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    }, {
        navigationOptions: {
            
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? 'grey' : 'white' 
            },
  
            headerTintColor: '#ff6347',

        }
    }
);



const shopNavigator = createDrawerNavigator({
    
    products: ProductNavigator,
    Orders: OrderNavigator,
    user: userNavigator
},{
    contentOptions: {
        activeTintColor: 'red'
    },
    //https://www.tabnine.com/code/javascript/classes/react-navigation/DrawerItems
    //paddingTop help to get drawer padding to 20 very useful
    //u can add your own cutom component in sidedrawe ,to make logout button ,we have to make it as a function 
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
             <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
               title="Logout"
              
               onPress={() => {
                dispatch(authAction.logout());
                props.navigation.navigate('Authentication');
               }}
              />
             </SafeAreaView>
            </View>
           );
 

    }
});


const mainNavigator = createSwitchNavigator({
    start: startUp,
    Authentication: AuthNavigator,
    Shop: shopNavigator
},{
    contentOptions: {
        activeTintColor: 'red'
    }
});

export default createAppContainer(mainNavigator);