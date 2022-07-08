import { getInitialData } from '../utils/api';
import { getUsers, saveQuestionAnswerToUser, saveQuestionToUser } from './users';
import { getQuestions, saveQuestionAnswerToQuestions, saveQuestionToQuestion } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitialData().then(({ users, questions }) => {
            dispatch(getQuestions(questions));
            dispatch(getUsers(users));
            dispatch(hideLoading());
        });
    };
}

export function handleSaveQuestion(optionOneText, optionTwoText) {

    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return _saveQuestion({ author: authedUser, optionOneText, optionTwoText })
            .then((question) => {
                dispatch(saveQuestionToQuestion(question));
                dispatch(saveQuestionToUser(authedUser, question.id));
            })
            .then(() => dispatch(hideLoading()));

    };
}

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => {
                dispatch(saveQuestionAnswerToQuestions(authedUser, qid, answer));
                dispatch(saveQuestionAnswerToUser(authedUser, qid, answer));
            })
            .then(() => dispatch(hideLoading()));

    };
}
