import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';
import { Button, Divider, Grid, Form, Segment, Header } from 'semantic-ui-react';

const NewQuestion = props => {
    const navigate = useNavigate();
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleChangeOption1 = (e) => {
        setOptionOne(e.target.value);
    };
    const handleChangeOption2 = (e) => {
        setOptionTwo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        props.dispatch(handleSaveQuestion(optionOne, optionTwo)).then(
            () => {
                setOptionOne('');
                setOptionTwo('');
                navigate('/');
            }
        );

    };

    return (
        <div>
            <Header textAlign="center" size="huge">Create your own poll</Header>
            <Header textAlign="center" size="large" data-testid="headline">Would you rather</Header>

            <Form onSubmit={handleSubmit}>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign="center">
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign="middle">
                            <Grid.Column>
                                <Form.Group widths="equal">
                                    <Form.Input fluid label="First option" value={optionOne} onChange={handleChangeOption1} />
                                </Form.Group>

                            </Grid.Column>

                            <Grid.Column>
                                <Form.Group widths="equal">
                                    <Form.Input fluid label="Second option" value={optionTwo} onChange={handleChangeOption2} />
                                </Form.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <div className="submit-button">
                    <Button type="submit" disabled={!(optionOne && optionTwo)} primary>Create Question</Button>
                </div>
            </Form>
        </div>
    );
};

export default connect()(NewQuestion);
