//Register
//import { TEST_DISPATCH } from "./types";
import axios from "axios";
import {GET_ERRORS} from './types';

export const registerUser = (userData, history) => dispatch => {
               axios.post("/user/signUpStudent", userData)
                .then(res => history.push('/login'))
                // return {
                //     type: TEST_DISPATCH,
                //     payload : userData
                // }
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    }))
             };

            