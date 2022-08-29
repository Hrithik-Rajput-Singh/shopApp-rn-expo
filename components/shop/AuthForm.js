import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SIGNUP } from "../../Store/action/auth";

const authSchema = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const AuthForm = ({ addSubmit, signUp, setsignUp }) => {
  // const [signUp, setsignUp] = useState(false)

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={authSchema}
        onSubmit={(valuess) => {
          signUp;
          setsignUp;
          addSubmit(valuess);
        }}
      >
        {(props) => (
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={props.values.email}
                onChangeText={props.handleChange("email")}
              />
              <Text style={styles.texterror}>
                {props.touched.email && props.errors.email}
              </Text>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>password</Text>
              <TextInput
                style={styles.input}
                value={props.values.password}
                onChangeText={props.handleChange("password")}
              />
              <Text style={styles.texterror}>
                {props.touched.password && props.errors.password}
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                title={signUp ? "signUp" : "login"}
                color={"green"}
                onPress={props.handleSubmit}
              />
              <Button
                title={`switch to ${signUp ? "login" : "signup"}`}
                onPress={() => {
                  setsignUp((prevState) => !prevState);
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = {
  form: {
    margin: 40,
  },
  // gradient:{
  //     flex: 1,
  //     alignItem: 'center',
  //     justigyContent: 'center',

  // },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    borderColor: "#888",
    borderWidth: 1,
  },
  texterror: {
    margin: 2,
    color: "red",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default AuthForm;
