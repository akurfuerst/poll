import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Error from './Error';
import { handleSaveQuestionAnswer } from '../actions/shared';
import { Button, Divider, Progress, Grid, Header, Image, Segment } from 'semantic-ui-react';

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
    const { pollUser, question, dispatch, currentUser } = props;

    if (!question) {
        return <Error />;
    }

    const handleVote = (answer) => {
        dispatch(handleSaveQuestionAnswer(props.id, answer));
    };

    const getPercentage = (amount) => {
        const total = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (amount * 100 / total);
    };

    const options = ['optionOne', 'optionTwo'];

    return (
        <div>
            <Header textAlign="center" size="huge">
                <Image src={pollUser.avatarURL} alt={`Avatar of ${pollUser.name}`} avatar verticalAlign="bottom" size="large" />
                <span>Poll by {pollUser.name}</span>
            </Header>
            <Header textAlign="center" size="large" data-testid=" headline">Would you rather</Header>

            {props.alreadyAnswered ? (
                <Segment placeholder>
                    {options.map((option, key) => (
                        <div key={key} className="Progress">
                            {currentUser.answers[props.id] === option && (
                                <Image src={currentUser.avatarURL} alt={`Avatar of ${currentUser.name}`} avatar className="Progress__avatar" />
                            )}

                            <Progress
                                percent={getPercentage(question[option].votes.length)}
                                progress
                                size="medium"
                                color="blue">
                                {question[option].text} | Votes: {question[option].votes.length}
                            </Progress>
                        </div>
                    ))}

                </Segment>
            ) : (
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign="center">
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign="middle">
                            <Grid.Column>
                                <p><strong>{question.optionOne.text}</strong></p>
                                <Button onClick={() => handleVote('optionOne')} primary>Vote</Button>

                            </Grid.Column>

                            <Grid.Column>
                                <p><strong>{question.optionTwo.text}</strong></p>
                                <Button onClick={() => handleVote('optionTwo')} primary>Vote</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
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
        pollUser: pollUser,
        currentUser
    };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
