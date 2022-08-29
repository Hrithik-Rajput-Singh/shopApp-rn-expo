import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import ProductDetail from "./productDetail";
import * as cartAction from "../../Store/action/cart";
import { Ionicons } from "@expo/vector-icons";

import * as productActions from "../../Store/action/product";
//to load Data from firebase in our displayscreen

const productOverview = (props) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [error, setError] = useState();
  const availableProducts = useSelector(
    (state) => state.productItem.availableProduct
  );
  const dispatch = useDispatch();

  //these action run whenever component uploaded
  //setting loading screen also
  //can't use useeffect as async so created the function then used promise function

  const loaded = useCallback(async () => {
    setLoadingScreen(true);
    try {
      await dispatch(productActions.fetchProduct());
    } catch (err) {
      //eventually we will get err of action/product folder here which we have set
      setError(err.message);
    }
    setLoadingScreen(false); /////////////
  }, [dispatch, setLoadingScreen, setError]);

  useEffect(() => {
    loaded();

    return () => {
      loaded();
    };
  }, [loaded]);

  //these use effect will run whenever we re visit these screen again after first render like suppose we aRE IN DRAWER WE GOTO user screen then come back to product screen then we want it to load again
  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loaded);
    return () => {
      willFocusSub.remove();
    };
  }, [loaded]);

  //if loading scrren is there then
  if (loadingScreen) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured</Text>
        <Button title="TRY AGAIN" onPress={loaded} color="red" />
      </View>
    );
  }

  if (!loadingScreen && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products available try again some time</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={availableProducts}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            onViewDetail={() => {
              props.navigation.navigate({
                routeName: "Detail",
                params: {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title,
                },
              });
            }}
            onAddToCart={() => {
              dispatch(cartAction.addTocart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

productOverview.navigationOptions = (navData) => {
  return {
    headerTitle: "shoplholic",
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate("Cart");
        }}
        style={styles.cart}
      >
        <Ionicons
          title="header"
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={27}
          color="brown"
        />
      </TouchableOpacity>
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //    <Item
      //      title="Header"
      //      iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
      //      onPress={() => {
      //        navData.navigation.navigate('Cart');
      //      }}
      //    />
      //  </HeaderButtons>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
        style={styles.orders}
      >
        <Ionicons
          title="order"
          name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          size={27}
          color="brown"
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
  cart: {
    marginRight: 22,
  },
  orders: {
    marginLeft: 22,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default productOverview;
