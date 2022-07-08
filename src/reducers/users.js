import { GET_USERS, SAVE_QUESTION_ANSWER_USER, SAVE_QUESTION_USER } from '../actions/users';

export default function users(state = null, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_QUESTION_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.id])
                }
            };
        case SAVE_QUESTION_ANSWER_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        default:
            return state;
    }
}
