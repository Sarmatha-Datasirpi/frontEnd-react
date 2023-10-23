import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,

    GET_USER_DATA_BY_ID,
    GET_USER_DATA_BY_ID_SUCCESS,
    GET_USER_DATA_BY_ID_FAIL,

    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESS,
    ADD_USER_DATA_FAIL,

    UPDATE_USER_DATA,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAIL,

    DELETE_USER_DATA,
    DELETE_USER_DATA_SUCCESS,
    DELETE_USER_DATA_FAIL,
    DELETE_USER_DATA_SUCCESS_BY_ID,
    DELETE_USER_DATA_FAIL_BY_ID,
    DELETE_USER_DATA_BY_ID,

    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
} from './actionType'

// Get user

export const getUserSuccess = (user) => ({
    type: GET_USER_DATA_SUCCESS,
    payload: user
})
export const getUserFail = (error) => ({
    type: GET_USER_DATA_FAIL,
    payload: error
})
export const getUserData = () => ({
    type: GET_USER_DATA
})

// Add user

export const addUserSuccessful = (user) => ({
    type: ADD_USER_DATA_SUCCESS,
    payload: user
})
export const addUserFail = (error) => ({
    type: ADD_USER_DATA_FAIL,
    payload: error
})
export const addUserData = (user) => ({
    type: ADD_USER_DATA,
    payload: user
})
//getting user data by id to edit

export const getUserDataByIdSuccess = (data) => ({
    type: GET_USER_DATA_BY_ID_SUCCESS,
    payload: data
})
export const getUserDataByIdFail = (error) => ({
    type: GET_USER_DATA_BY_ID_FAIL,
    payload: error
})
export const getUserDataById = (userId) => ({
    type: GET_USER_DATA_BY_ID,
    payload: userId
})
// Delete user
export const deleteUserSuccess = (data) => ({
    type: DELETE_USER_DATA_SUCCESS_BY_ID,
    payload: data,
});
export const deleteUserFail = (error) => ({
    type: DELETE_USER_DATA_FAIL_BY_ID,
    payload: error,
});
export const deleteUserData = (userId) => ({
    type: DELETE_USER_DATA_BY_ID,
    payload: userId
});
// Update user
export const updateUserSuccess = (data) => ({
    type: UPDATE_USER_DATA_SUCCESS,
    payload: data
})
export const updateUserFail = (error) => ({
    type: UPDATE_USER_DATA_FAIL,
    payload: error
})
export const updateUserDataById = (userdata) => {
    return ({
        type: UPDATE_USER_DATA,
        payload: userdata
    })
}

//update user Password
export const changePassword = (userdata) => ({
    type: CHANGE_PASSWORD,
    payload: userdata
})
export const changePasswordSuccess = (data) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data
})
export const changePasswordFail = (error) => ({
    type: CHANGE_PASSWORD_FAIL,
    payload: error
})

