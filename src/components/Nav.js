import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAuthedUser } from '../actions/authedUser';

const Nav = (props) => {
    const { user } = props;
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        props.dispatch(logoutAuthedUser());
        navigate('/');
    };

    return (
        <div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/" data-testid="home">Home</Link>
                    </li>
                    <li>
                        <Link to="/leaderboard" data-testid="leaderboard">Leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/add" data-testid="add">New Question</Link>
                    </li>
                </ul>
            </nav>
            {user && (
                <div>
                    <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
                    {user.name}

                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => {
    if (!(authedUser && users)) {
        return {};
    }

    const user = users[authedUser];

    return {
        user
    };
};
export default connect(mapStateToProps)(Nav);
