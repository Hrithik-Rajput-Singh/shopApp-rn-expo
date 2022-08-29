import React from "react";
import { AppRegistry } from "react-native";

import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import productReducer from "./Store/reducer/product";

import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./Store/reducer/cart";
import orderReducer from "./Store/reducer/orders";
import Reduxthunk from "redux-thunk";
import authReducer from "./Store/reducer/auth";
import NavigationContainer from "./navigation/navigationContainer";
import { LogBox } from "react-native";

AppRegistry.registerComponent("SHOPAPP", () => App);
LogBox.ignoreLogs(["Warning: ReactNative.interpolate"]);

// import * as Font from 'expo-font'
// import AppLoading from 'expo-app-loading';

// const fetchFonts =() => {
//   return font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// };

const rootReducer = combineReducers({
  productItem: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(Reduxthunk));

export default function App() {
  // const [dataloaded, setdataloaded] = useState(false)

  // if (!dataloaded){
  //   return (
  //    <AppLoading startAsync={fetchFonts} onFinish={() => setdataloaded(true)} onError={(err) => console.log(err)}/>
  //   )
  // };
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
