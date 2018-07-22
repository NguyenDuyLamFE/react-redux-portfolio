import { combineReducers } from 'redux'
import toggle from './isMenuClick'
import loader from './loader'

export default combineReducers({
    toggle,
    loader
});
