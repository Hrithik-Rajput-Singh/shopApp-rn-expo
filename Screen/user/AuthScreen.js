import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as authAction from "../../Store/action/auth";
import AuthForm from "../../components/shop/AuthForm";

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const [signUp, setsignUp] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("AN ERROR OCCURED", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(
    async (values) => {
      setloading(true);
      setError(null);

      try {
        if (signUp) {
          await dispatch(authAction.signUpp(values.email, values.password));
          props.navigation.navigate("Shop");
        } else {
          await dispatch(authAction.login(values.email, values.password));
          props.navigation.navigate("Shop");
        }
      } catch (err) {
        setError(err.message);
        setloading(false);
        //set loading here because when we navigate to shop then it still function we don't wqant that
      }
    },
    [setloading, dispatch, setError, signUp]
  );

  if (loading) {
    return (
      <View style={styles.cenetred}>
        <ActivityIndicator size={23} color="red" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <AuthForm
          signUp={signUp}
          key={signUp}
          setsignUp={setsignUp}
          addSubmit={submitHandler}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
