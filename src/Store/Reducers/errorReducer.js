const initialState = {
    isLoding : false,
    errorMessage : null 
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return{
                ...state,
                isLoding : true,
                errorMessage : null,
            }
            
        case "IS_SUCCESS":
            return{
                ...state,
                isLoding : false,
                errorMessage : null,
            }
        case "IS_ERROR":
            return{
                ...state,
                isLoding : false,
                errorMessage:action.payload,
            }
        default:
            return state;
    }
}