import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
};

export default reducers;

