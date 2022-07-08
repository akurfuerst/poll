import { connect } from 'react-redux';

const Leaderboard = props => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Users</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {props.users.map(user => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ users }) => {
    // the users var is an object, to filter it, it needs to be an array
    const arrUsers = Object.keys(users).map((key) => users[key]);

    const test = arrUsers.sort((a, b) => {
        const sumA = a.questions.length + Object.keys(a.answers).length;
        const sumB = b.questions.length + Object.keys(b.answers).length;

        return sumB - sumA;
    });
    console.log(test);
    return {
        users: arrUsers
    };
};

export default connect(mapStateToProps)(Leaderboard);
