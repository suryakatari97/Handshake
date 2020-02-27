import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS} from './types';


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/student/studentdetails')
    .then(res => 
        dispatch({
            type : GET_PROFILE,
            payload: res.data
        })
        )
        .catch(err =>
             dispatch({
            type : GET_PROFILE,
            payload: {}//if there is no profile,this will take us to create profile
        })
        );
};


export const createProfile = (profileData, history) => dispatch => {
    axios.post('/student/studentdetails', profileData)
    .then(res => history.push('/viewprofile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}