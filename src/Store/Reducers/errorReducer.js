const initialState = {
    isLoding : false,
    errorMessage : null,
    categoryLoader : false,
    categoryError : null,
    btnLoader: false,
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
                btnLoader:false,
                categoryError:null,
                categoryLoader:false,
            }
        case "IS_ERROR":
            return{
                ...state,
                isLoding : false,
                errorMessage:action.payload,
                btnLoader:false,
                categoryError:null,
                categoryLoader:false,
            }
        case "CATEGORY_SUCCESS":
            return{
                ...state,
                categoryLoader : false,
                categoryError : null,
            }
        case "CATEGORY_LOADER":
            return{ 
                ...state,
                categoryLoader : true,
                categoryError:null,
                errorMessage:null,
            }
        case "BUTTON_LOADER":
            return{
                ...state,
                btnLoader:true,
                errorMessage:null,
                categoryError:null,
            }
        default:
            return state;
    }
}