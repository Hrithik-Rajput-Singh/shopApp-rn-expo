import React from 'react';
import { View,Text,StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

//change props.editedproduct in down check if work or not
//to fixed is a issue in price

const ProductSchema = Yup.object({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    imageUrl: Yup.string().required('Required'),
    price: Yup.string().required('Required').test('is-num-1-10000','price must be  under 10000',(val) => {
        return parseInt(val) > 0 && parseInt(val) < 10000;
    }),
    description: Yup.string()
      .min(10, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
    
  });


const Form = ({editedproduct,  addSubmit}) =>{
    return(
        <View>
        <Formik initialValues={{
            title: editedproduct ? editedproduct.title : "",
            imageUrl: editedproduct ? editedproduct.imageUrl : "",
            price: "",
            description: editedproduct ? editedproduct.description : "",
         }}
         validationSchema={ProductSchema}
         onSubmit={(valuess) => {
            addSubmit(valuess);
            }}
            >{(props) => (
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>title</Text>
                    <TextInput style={styles.input} value={props.values.title} onChangeText={props.handleChange('title')}/>
                    <Text style={styles.texterror}>{props.touched.title && props.errors.title}</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput style={styles.input} value={props.values.imageUrl} onChangeText={props.handleChange('imageUrl')}/>
                    <Text style={styles.texterror}>{props.touched.imageUrl && props.errors.imageUrl}</Text>
                </View>
                {props.editedproduct ? null : <View style={styles.formControl}> 
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={props.values.price} onChangeText={props.handleChange('price')} keyboardType='numeric'/>
                    <Text style={styles.texterror}>{props.touched.price && props.errors.price}</Text>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={props.values.description} onChangeText={props.handleChange('description')} multiline/>
                    <Text style={styles.texterror}>{props.touched.description && props.errors.description}</Text>
                </View>
                <View style={styles.button}>
                    <Button title="SUBMIT" onPress={props.handleSubmit}/>
                </View>
            </View>

        )}
        </Formik>
        </View>
    )

}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl:{
        width: '100%',
    },
    label: {
        marginVertical: 8
        
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#888',
        borderBottomWidth: 1,
    },
    texterror: {
        margin: 2,
        color: 'red',
          
    },
    button: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export default Form;
