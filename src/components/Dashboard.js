import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import { Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Dashboard = props => {

    return (
        <div>
            <h3>New Questions</h3>
            {props.newQuestions.length ?
                (
                    <Card.Group>
                        {props.newQuestions.map(question => (
                            <QuestionItem question={question} key={question.id} />
                        ))}
                    </Card.Group>
                )
                : <div>No new questions. <Link to="/add">Create one</Link></div>
            }

            <Divider />

            <h3>Done</h3>
            {props.answeredQuestions.length ?
                (
                    <Card.Group>
                        {props.answeredQuestions.map(question => (
                            <QuestionItem question={question} key={question.id} />
                        ))}
                    </Card.Group>
                )
                : <div>No questions. Vote for some questions above.</div>
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
