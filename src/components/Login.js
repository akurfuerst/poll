import { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

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
        <form onSubmit={handleSubmit}>
            {error && <div data-testid="error">Sorry, but the username or password is wrong! Try again.</div>}
            user: {props.users.length}
            <p>
                <label>User</label>
                <input type="text" value={user} onChange={handleUserChange} data-testid="user" />
            </p>
            <p>
                <label>Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} data-testid="password" />
            </p>
            <input type="submit" value="Login" disabled={!(user && password)} data-testid="submit" />
        </form>
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
