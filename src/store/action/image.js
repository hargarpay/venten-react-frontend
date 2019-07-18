import * as actionTypes from "./actionTypes";

const url = "https://sleepy-reaches-25051.herokuapp.com/media";

export const onAddImage = (payload) => {
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
                type: actionTypes.ADD_IMAGE,
                image: result
            });
        }catch(e){
            console.log(e);
        }

    }
}

export const onGetImages = () => {
    return  async (dispatch) => {
        try{

            const res = await fetch(url);
            const result = await res.json();
            
           dispatch({
                type: actionTypes.GET_IMAGES,
                images: result
            });
        }catch(e){
            console.log(e);
        }

    }
}