import Product from "../../model/product";

export const ADD_TO_DELETE = "ADD_TO_DELETE";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => {
  //getting data from store
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://shop-app-9d3e8-default-rtdb.firebaseio.com/products.json"
      );
      const resData = await response.json();

      const productUpload = [];

      for (key in resData) {
        productUpload.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        storeProduct: productUpload,
        userProd: productUpload.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addTodelete = (product) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-app-9d3e8-default-rtdb.firebaseio.com/products/${product}.json`,
      {
        method: "delete",
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }

    dispatch({
      type: ADD_TO_DELETE,
      prod: product,
    });
  };
};

export const addProduct = (title, imageUrl, description, price) => {
  //thesse is storing
  return async (dispatch, getState) => {
    const token = getState().auth.token; //these will give token
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-app-9d3e8-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );
    //these is fetching data from data response came from const response and telling to be format in json
    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      dataOrder: {
        id: resData.name,
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        ownerId: userId,
      },
    });
  };
};

//to update now we have given permission to read but not to write only a person can write how is authenticate
//GETSTATE = getstate will give current situation of all redux state so we can access token

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token; //these will give token (token which get save when login in auth reducer)
    const response = await fetch(
      `https://shop-app-9d3e8-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }

    const resData = await response.json();

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      dataOrder: {
        title: title,
        imageUrl: imageUrl,
        description: description,
      },
    });
  };
};
