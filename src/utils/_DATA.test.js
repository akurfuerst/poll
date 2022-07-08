import { _saveQuestion, _saveQuestionAnswer } from './_DATA';

describe('handleSaveQuestion', () => {
    it('Will return the question formatted', async () => {
        const mockQuestion = {
            author: 'sarahedo',
            optionOneText: 'Option1',
            optionTwoText: 'Option2'
        };

        const result = await _saveQuestion(mockQuestion);

        expect(result.author).toEqual(mockQuestion.author);
        expect(result.optionOne.text).toEqual(mockQuestion.optionOneText);
        expect(result.optionTwo.text).toEqual(mockQuestion.optionTwoText);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('timestamp');
    });

    it('Will return an error for incorrect data passing', async () => {
        const mockQuestion = {
            author: 'sarahedo',
            optionOneText: 'Option1',
        };

        await expect(_saveQuestion(mockQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
});

describe('handleSaveQuestionAnswer', () => {
    it('Will return true', async () => {
        const mockQuestionAnswer = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionOne'
        };

        const result = await _saveQuestionAnswer(mockQuestionAnswer);

        expect(result).toEqual(true);
    });

    it('Will return an error for incorrect data passing', async () => {
        const mockQuestionAnswer = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd'
        };

        await expect(_saveQuestionAnswer(mockQuestionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
});
