import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import { Card, Menu, Label, Tab, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Dashboard = props => {
    const [activeIndex, setActiveIndex] = useState(0);

    const panes = [
        {
            menuItem: (
                <Menu.Item key="new">
                    New Questions<Label>{props.newQuestions.length}</Label>
                </Menu.Item>
            ),
            render: () => {
                if (props.newQuestions.length) {
                    return (
                        <Tab.Pane className="spacer">
                            <Card.Group>
                                {props.newQuestions.map(question => (
                                    <QuestionItem question={question} key={question.id} />
                                ))}
                            </Card.Group>
                        </Tab.Pane>
                    );
                }
                return (
                    <Tab.Pane className="spacer">
                        <div>No new questions. <Link to="/add">Create one</Link></div>
                    </Tab.Pane>
                );
            },
        },
        {
            menuItem: (
                <Menu.Item key="done">
                    Done<Label>{props.answeredQuestions.length}</Label>
                </Menu.Item>
            ),
            render: () => {
                if (props.answeredQuestions.length) {
                    return (
                        <Tab.Pane className="spacer">
                            <Card.Group>
                                {props.answeredQuestions.map(question => (
                                    <QuestionItem question={question} key={question.id} />
                                ))}
                            </Card.Group>
                        </Tab.Pane>
                    );
                }
                return (
                    <Tab.Pane className="spacer">
                        <div>No questions. <Button onClick={() => setActiveIndex(1)}>Vote for some questions</Button></div>
                    </Tab.Pane>
                );
            },
        },
    ];

    return (
        <Tab
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={(e, { activeIndex }) => setActiveIndex(activeIndex)} />
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
