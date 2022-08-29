import PRODUCTS from "../../data/dummy-data";
import {
  ADD_TO_DELETE,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from "../action/product";
import Product from "../../model/product";

const initialState = {
  availableProduct: [],
  userProduct: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProduct: action.storeProduct,
        userProduct: action.userProd,
      };

    case ADD_TO_DELETE:
      const userproduct = state.userProduct.filter(
        (product) => product.id !== action.prod
      );
      const availableproduct = state.availableProduct.filter(
        (product) => product.id !== action.prod
      );

      return {
        ...state,
        availableProduct: availableproduct,
        userProduct: userproduct,
      };

    case ADD_PRODUCT:
      const newProduct = new Product(
        action.dataOrder.id,
        action.dataOrder.ownerId,
        action.dataOrder.title,
        action.dataOrder.imageUrl,
        action.dataOrder.description,
        action.dataOrder.price
      );

      return {
        ...state,
        userProduct: state.userProduct.concat(newProduct),
        availableproduct: state.availableProduct.concat(newProduct),
      };

    //without these also product get storre because in SET_PRODUCT product get updated

    case UPDATE_PRODUCT:
      const productIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const availableProductIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateProduct = new Product(
        action.pid,
        state.userProduct[productIndex].ownerId,
        action.dataOrder.title,
        action.dataOrder.imageUrl,
        action.dataOrder.description,
        state.userProduct[productIndex].price
      );
      const updateduserproduct = [...state.userProduct];
      updateduserproduct[productIndex] = updateProduct;

      const updatedavailableproduct = [...state.availableProduct];
      updatedavailableproduct[availableProductIndex] = updateduserproduct; //instead of updateproduct
      return {
        ...state,
        userProduct: updateduserproduct,
        availableProduct: updatedavailableproduct,
      };
  }
  return state;
};

export default productReducer;
