import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';

const Dashboard = props => {

    return (
        <div>
            <h3>New Questions</h3>
            {props.newQuestions ? (
                    <ul>
                        {props.newQuestions.map(question => (
                            <li key={question.id}>
                                <QuestionItem question={question} />
                            </li>
                        ))}
                    </ul>
                )
                : <div>No new questions</div>
            }
            <h3>Done</h3>
            {props.answeredQuestions ? (
                    <ul>
                        {props.answeredQuestions.map(question => (
                            <li key={question.id}>
                                <QuestionItem question={question} />
                            </li>
                        ))}
                    </ul>
                )
                : <div>No new questions</div>
            }
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
    const currentUser = users[authedUser];

    // the questions var is an object, to filter it, it needs to be an array
    // sort it by timestamp
    const arrQuestions = Object.keys(questions)
        .map((key) => questions[key])
        .sort((a, b) => b.timestamp - a.timestamp);

    const answeredQuestions = arrQuestions.filter(question => (question.id in currentUser.answers));
    const newQuestions = arrQuestions.filter(question => !(question.id in currentUser.answers));

    return {
        answeredQuestions,
        newQuestions
    };
};

export default connect(mapStateToProps)(Dashboard);
