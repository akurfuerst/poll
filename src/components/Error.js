import { Link } from 'react-router-dom';
import { Message, Button } from 'semantic-ui-react';

const Error = () => {
    return (
        <Message negative>
            <Message.Header>We're sorry we can't find the poll</Message.Header>
            <p>Maybe you should try another one.</p>
            <Button as={Link} to="/" primary>Go to Home</Button>
        </Message>
    );
};

export default Error;
