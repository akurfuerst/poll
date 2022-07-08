import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            console.log(action);
            return action.id;
        case LOGOUT_USER:
            return false;
        default:
            return state;
    }
}
