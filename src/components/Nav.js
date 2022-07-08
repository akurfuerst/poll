import { Link, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAuthedUser } from '../actions/authedUser';
import { Image, Menu } from 'semantic-ui-react';
import { useState } from 'react';

const Nav = (props) => {
    const location = useLocation();
    const { user } = props;
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(location.pathname);
    console.log(location.pathname);
    const handleLogout = (e) => {
        e.preventDefault();

        props.dispatch(logoutAuthedUser());
        navigate('/');
    };

    const handleItemClick = (e, { to }) => setActiveItem(to);

    return (
        <Menu pointing secondary className="Nav">
            <Menu.Item as={Link} to="/" data-testid="home" active={activeItem === '/'} onClick={handleItemClick}>
                Home
            </Menu.Item>
            <Menu.Item as={Link} to="/leaderboard" data-testid="leaderboard" active={activeItem === '/leaderboard'} onClick={handleItemClick}>
                Leaderboard
            </Menu.Item>
            <Menu.Item as={Link} to="/add" data-testid="add" active={activeItem === '/add'} onClick={handleItemClick}>
                New Question
            </Menu.Item>
            {user && (
                <Menu.Menu position="right">
                    <div className="avatar">
                        <Image src={user.avatarURL} alt={`Avatar of ${user.name}`} avatar size="mini" />
                        <span>{user.name}</span>
                    </div>
                    <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                </Menu.Menu>
            )}
        </Menu>
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
