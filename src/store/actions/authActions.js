import axios from "axios";

export const logIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        dispatch({type: 'AUTH_SNACKBAR_OPEN'});

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            const profilePromise = axios({
                method: 'get',
                url: '/api/user/' + resp.user.uid,
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const poiPromise = axios({
                method: 'get',
                url: '/api/user/' + resp.user.uid + '/poi/list',
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return Promise.all([profilePromise, poiPromise])
        }).then((results) => {
            const userInfo = results[0].data;
            const poiList = results[1].data;
            dispatch({type: 'LOGIN_SUCCESS'});
            dispatch({type: 'LOAD_USER_PROFILE', userInfo, poiList})
        }).then(() => {

        }).catch((err) => {
            console.log(err);
            dispatch({ type: 'LOGIN_ERROR', err});
        });
    }
}

export const logOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const userInfo = {
            email: newUser.email,
            // password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            fullName: newUser.firstName + " " + newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
        }
        const poiList = {} // The poiList of each new user is always empty upon signing up

        dispatch({type: 'AUTH_SNACKBAR_OPEN'});

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return axios({
                method: 'post',
                url: '/api/user/create/' + resp.user.uid,
                timeout: 0,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: userInfo
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS', userInfo});
            dispatch({type: 'LOAD_USER_PROFILE', userInfo, poiList})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err});
        })
    }
}
