import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";


export const getCurrentProfile = (id) => dispatch => {
    console.log("IN GET STUDENT PROFILE :", id);
    
    dispatch(setProfileLoading());    
    axios('/student/studentdetails',{
        method: 'get',
        params:{"id" : id}
    })
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

// export const getEducation = (id) => dispatch => {
// console.log("IN GET STUDENT EDUCATION :", id);
// dispatch(setProfileLoading());
// axios("/student/studentEducation", {
//   method: "get",
//   params: { "id": id }
// })
//   .then(res =>
//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     })
//   )
//   .catch(err =>
//     dispatch({
//       type: GET_PROFILE,
//       payload: {} //if there is no profile,this will take us to create profile
//     })
//   );
// }

// export const getExperience = id => dispatch => {
//   console.log("IN GET STUDENT EXPERIENCE :", id);
//   dispatch(setProfileLoading());
//   axios("/student/studentExperience", {
//     method: "get",
//     params: { "id": id }
//   })
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: {} //if there is no profile,this will take us to create profile
//       })
//     );
// };

export const createProfile = (profileData, history) => dispatch => {
    console.log(profileData);
    
    axios.post('/student/studentdetails', profileData)
    .then(res => history.push('/viewprofile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// export const addEducationRecord = (educationData, history) => dispatch => {
//   axios
//     .post("/student/studentEducation", educationData)
//     .then(res => history.push("/viewprofile"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}