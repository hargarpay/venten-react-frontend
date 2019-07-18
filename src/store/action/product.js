import * as actionTypes from "./actionTypes";

const url = "https://sleepy-reaches-25051.herokuapp.com/product";

export const onAddProduct = (payload) => {
    return  async (dispatch) => {
        try{
            const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            const result = await res.json();

           dispatch({
                type: actionTypes.ADD_PRODUCT,
                newProduct: result
            });
        }catch(e){
            console.log(e);
        }

    }
}

export const onGetProducts = () => {
    return  async (dispatch) => {
        try{
            const res = await fetch(`${url}s`);
            const result = await res.json();
            
           dispatch({
                type: actionTypes.GET_PRODUCTS,
                products: result
            });
        }catch(e){
            console.log(e);
        }

    }
}

export const onGetProduct = (product) => {
    return  async (dispatch) => {

        try{
            const res = await fetch(`${url}/${product}`);
            const result = await res.json();
           dispatch({
                type: actionTypes.GET_PRODUCT,
                product: result
            });
        }catch(e){
            console.log(e);
        }

    }
}