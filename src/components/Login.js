import { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Card, Form, Button } from 'semantic-ui-react';

const Login = (props) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUserChange = e => {
        setUser(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // find user with the inserted name and password
        const successLogin = props.users.filter(currentUser => currentUser.id === user && currentUser.password === password);

        if (successLogin.length) {
            setError(false);
            console.log(user);
            props.dispatch(setAuthedUser(user));
        } else {
            setError(true);
        }
    };

    // temporary for auto login
    //props.dispatch(setAuthedUser(user));

    return (
        <div className="Login">
            <Card>
                <Card.Content>
                    <Card.Header>Login</Card.Header>

                    <Form onSubmit={handleSubmit}>
                        {error && <p data-testid="error" className="error">Sorry, but the username or password is wrong! Try again.</p>}
                        <Form.Group widths="equal">
                            <Form.Input fluid label="User" value={user} onChange={handleUserChange} data-testid="user" />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" fluid label="Password" value={password} onChange={handlePasswordChange} data-testid="password" />
                        </Form.Group>

                        <Button type="submit" disabled={!(user && password)} data-testid="submit">Login</Button>
                    </Form>
                </Card.Content>
            </Card>

        </div>
    );
};

const mapStateToProps = ({ users }) => {
    // the users var is an object, to filter it, it needs to be an array
    const filteredUser = users ? Object.keys(users).map((key) => users[key]) : [];

    return {
        users: filteredUser
    };
};

export default connect(mapStateToProps)(Login);
