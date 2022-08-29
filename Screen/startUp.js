import React, { useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as authAction from "../Store/action/auth";

const startUp = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let userData;
    const tryingLogin = async () => {
      userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("Authentication");
        return;
      }
      const transformData = JSON.parse(userData); //these will convert into jason object

      const { token, userId, expiryDate } = transformData; //getting data in format
      const expirationDate = new Date(expiryDate);
      console.log(expirationDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Authentication");
        return;
      }

      //here we need to calculate expiration time because these kick in whenever the app start and we have to send expiration date tpo auth action folder
      // so that setloggertimeout funtoion can run and we hve also set expiartion time in logout and signup
      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate("Shop");
      dispatch(authAction.authentic(token, userId, expirationTime));
    };

    tryingLogin();

    return userData;
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="yellow" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default startUp;
