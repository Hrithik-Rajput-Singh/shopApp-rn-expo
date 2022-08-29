import React, { useState , useEffect, useCallback} from 'react';
import {  Text, View, Button, TextInput, ScrollView,TouchableOpacity,Platform ,ActivityIndicator,Alert ,StyleSheet} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import  {useSelector, useDispatch } from 'react-redux';
import * as productAction from '../../Store/action/product';
import Form from '../../components/shop/Form';

const EditScreen = (props) => {
    const [loading , setloading] = useState(false);
    const [error, seterror] = useState();

    const proId = props.navigation.getParam("productId");
    const editedproduct = useSelector(state => state. productItem.userProduct.find(prod => prod.id === proId));
    const dispatch = useDispatch();

    // const [title, settitle] = useState(editedproduct ? editedproduct.title : "");
    // const [imageUrl, setimageUrl] = useState(editedproduct ? editedproduct.imageUrl : "");
    // const [price, setprice] = useState("");
    // const [description, setdescription] = useState(editedproduct ? editedproduct.description : "");

    useEffect(() => {
        if(error){
            Alert.alert('AN ERROR OCCURED', error , [{text: 'ok'}])
        }
    
    }, [error])

    const submitHandler = useCallback(async (values) => {
        setloading(true)
        seterror(null)
        try{
            if (editedproduct){
                await dispatch(productAction.updateProduct(proId, values.title, values.imageUrl,values.description))
            }else{
                await dispatch(productAction.addProduct(values.title,values.imageUrl,values.description,+values.price))
            }
            props.navigation.goBack();
        }catch(err){
            seterror(err.message) 
            setloading(false)
        }

        


    },[dispatch,proId, setloading, seterror]);
    //added + sign in price to make it number and  everything sipatch from state

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    if(loading){
        return<View style={styles.cenetred}>
            <ActivityIndicator size={23} color="red"/>
        </View>
    }


    return(
        <ScrollView>
        <Form editedproduct={editedproduct} key={editedproduct} addSubmit={submitHandler}/>
            {/* <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => settitle(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setimageUrl(text)}/>
                </View>
                {editedproduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setprice(text)}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setdescription(text)}/>
                </View>
            </View> */}

        </ScrollView>
    )
};

    EditScreen.navigationOptions = navData => {
        const submitFn = navData.navigation.getParam('submit')
        return{
            headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
            headerRight: ()=>(
                <TouchableOpacity onPress={submitFn}>
                    <Ionicons 
                    title="Save"
                    name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    size={27}
                    color="brown"
                    />
                </TouchableOpacity>
            )

        };

    }

// const styles = {
//     form: {
//         margin: 20,
//     },
//     formControl:{
//         width: '100%',
//     },
//     label: {
//         marginVertical: 8
        
//     },
//     input: {
//         paddingHorizontal: 2,
//         paddingVertical: 5,
//         borderBottomColor: '#888',
//         borderBottomWidth: 1,
//     },
// };

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})


export default EditScreen;