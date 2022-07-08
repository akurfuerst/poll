import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const Leaderboard = props => {
    return (
        <div className="Leaderboard">
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Users</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Answered</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.users.map(user => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell textAlign="right">{Object.keys(user.answers).length}</Table.Cell>
                            <Table.Cell textAlign="right">{user.questions.length}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
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
