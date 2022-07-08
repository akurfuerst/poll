export const GET_USERS = 'GET_USERS';
export const SAVE_QUESTION_ANSWER_USER = 'SAVE_QUESTION_ANSWER_USER';
export const SAVE_QUESTION_USER = 'SAVE_QUESTION_USER';

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    };
}

export function saveQuestionToUser(authedUser, id) {
    return {
        type: SAVE_QUESTION_USER,
        authedUser,
        id
    };
}

export function saveQuestionAnswerToUser(authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_ANSWER_USER,
        authedUser,
        qid,
        answer
    };
}

