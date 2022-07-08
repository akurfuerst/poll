import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Error from './Error';
import { handleSaveQuestionAnswer } from '../actions/shared';

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const QuestionPage = props => {
    const { user, question, dispatch } = props;

    if (!question) {
        return <Error />;
    }

    const handleVote = (answer) => {
        dispatch(handleSaveQuestionAnswer(props.id, answer));
    };

    const getPercentage = (amount) => {
        const total = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (amount * 100 / total) + '%';
    };

    return (
        <div>
            <h1>Poll by {user.name}</h1>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
            {props.alreadyAnswered ? (
                <div>
                    <h3>Would your rather</h3>
                    <p>Your vote: {user.answers[props.id]}</p>
                    <p>
                        {question.optionOne.text}<br />
                        Votes: {question.optionOne.votes.length}<br />
                        Percentage: {getPercentage(question.optionOne.votes.length)}
                    </p>
                    <p>
                        {question.optionTwo.text}<br />
                        Votes: {question.optionTwo.votes.length}<br />
                        Percentage: {getPercentage(question.optionTwo.votes.length)}
                    </p>
                </div>
            ) : (
                <div>
                    Would you rather...
                    <p>
                        {question.optionOne.text}<br />
                        <button onClick={() => handleVote('optionOne')}>Vote</button>
                    </p>
                    <p>
                        {question.optionTwo.text}<br />
                        <button onClick={() => handleVote('optionTwo')}>Vote</button>
                    </p>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
    const currentUser = users[authedUser];
    const { id } = props.router.params;

    if (!questions[id]) {
        return false;
    }

    const alreadyAnswered = (questions[id].id in currentUser.answers);
    const pollUser = users[questions[id].author];

    return {
        id,
        question: questions[id],
        alreadyAnswered,
        user: pollUser
    };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
