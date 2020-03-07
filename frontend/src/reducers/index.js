import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import educationReducer from "./educationReducer";
import experienceReducer from "./experienceReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  education: educationReducer,
  experience: experienceReducer
});