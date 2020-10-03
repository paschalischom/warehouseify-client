const initState = {
    authError: null,
    authSnackbarStatus: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login error!');
            return {
                ...state,
                // authError: action.err.message // More verbose feedback of why the login failed
                authError: 'Incorrect credentials. Please try again.'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success!');
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            console.log('Logout success!');
            return {
                ...state,
                authSnackbarStatus: false   // If the user presses 'logout' while the login snackbar is still
                                            // active, then it will cause the re-rendering of the snackbar component.
                                            // We prevent that by explicitly telling the snackbar to close.
            }
        case 'SIGNUP_SUCCESS':
            console.log('Signup success!');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Signup error!');
            console.log(action.err.message);
            return {
                ...state,
                authError: action.err.message
            }
        case 'AUTH_SNACKBAR_OPEN':
            console.log('Opening snackbar...');
            return {
                ...state,
                authSnackbarStatus: true,
                authError: null
            }
        case 'AUTH_SNACKBAR_CLOSE':
            console.log('Closing snackbar...');
            return {
                ...state,
                authSnackbarStatus: false
            }
        default:
            return state
    }
}

export default authReducer;
