import axios from "axios";

const requestResizeImageType = "REQUEST_RESIZE_IMAGE_TYPE";
const receiveResizeImageType = "RECEIVE_RESIZE_IMAGE_TYPE";
const errorResizeImageType = "ERROR_RESIZE_IMAGE_TYPE";

const initialState = {
  isLoading: false,
  resizedImage: null,
  isError: false,
  errorMessage: null
};

export const actionCreators = {
  resizeImage: () => async dispatch => {
    dispatch({
      type: requestResizeImageType,
      payload: {
        isLoading: true,
        resizedImage: null
      }
    });

    axios
      .post(
        `https://api.tinify.com/output/2xnsp7jn34e5.jpg`,
        {
          headers: {
            "Basic": "YXBpOjlCQU4zZDJHZHFmU2g4VFVhVEhLdkY2a2FEYTZSR1ZS",   //api:YOUR_API_KEY
            "Content-Type": "application/json",
          }
        }
      )
      .then(response => {
        dispatch({
          type: receiveResizeImageType,
          payload: {
            isLoading: false,
            resizedImage: response.data
          }
        });
      })
      .catch(error => {
        
        console.log("got error");
        
        dispatch({
          type: errorResizeImageType,
          payload: {
            isLoading: false,
            isError: true,
            errorMessage: `${error.error} ${error.message}`
          }
        });
      });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case requestResizeImageType:
    case receiveResizeImageType:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case errorResizeImageType:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};
