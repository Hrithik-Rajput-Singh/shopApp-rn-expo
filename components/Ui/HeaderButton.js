import React from "react";
import { Platform, TouchableOpacity, View ,StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const CustomHeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onpress}>
      <View style={styles.button}>
        <Text style={styles.btext}>{props.text}</Text>
      </View>
    </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderColor: '#f01d71'
  },
  btext: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }

})

export default CustomHeaderButton;






// import React from "react";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import { Ionicons } from "@expo/vector-icons";

// const CustomHeaderButton = (props) => {
//     return (<HeaderButtons {...props} IconComponent = {Ionicons} iconSize = {23} color={"red"}/>)
   
// };

// // color={"red"}
// export default CustomHeaderButton;