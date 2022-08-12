export const getUsersReducer = (state = { userData: {} }, action) => {
    switch (action.type) {
        
        case 'USER_LOGIN_SUCCESS':
        case 'USER_REGISTER_SUCCESS':
        case 'USER_SINGLE_SUCCESS':
        case 'USER_PROFILE_SUCCESS':
            return {
                ...state,
                userData: action.payload
            }

        case 'USER_LOGIN_FAIL':
        case 'USER_REGISTER_FAIL':
        case 'USER_SINGLE_FAIL':
        case 'USER_PROFILE_FAIL':
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
