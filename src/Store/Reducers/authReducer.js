const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedUserCheckOutAddress:null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload};

        case "LOG_OUT":
            return {
                user: null,
                address: null,
            }
        case "USER_ADDRESS":
            return{ ...state, address:action.payload};
        case "SELECT_CHECKOUT_ADDRESS":
            return {
                ...state,
                selectedUserCheckOutAddress:action.payload,
            }
        case "REMOVE_CHECKOUT_ADDRESS":
            return{
                ...state,
                selectedUserCheckOutAddress:null,
            }
        default:
            return state;
    }
};