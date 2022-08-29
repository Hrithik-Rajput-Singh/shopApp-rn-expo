import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import OrdersItems from "../../components/shop/OrdersItems";
import * as orderAction from "../../Store/action/orders";

const OrderScreen = (props) => {
  const orderItem = useSelector((state) => state.order.orders);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loaded = useCallback(async () => {
    setloading(true);
    try {
      await dispatch(orderAction.fetchorder());
    } catch (err) {
      //eventually we will get err of action/product folder here which we have set
      setError(err.message);
    }
    setloading(false);
  }, [dispatch, setloading, setError]);

  useEffect(() => {
    loaded();
  }, [loaded]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={23} />
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

  if (orderItem.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product to display</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orderItem}
      renderItem={(itemData) => (
        <OrdersItems
          amounts={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          making={itemData.item.item}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "order",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderScreen;
