import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { Card, Button } from 'semantic-ui-react';

const QuestionItem = ({ question }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{question.author}</Card.Header>
                <Card.Meta>{formatDate(question.timestamp)}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={`/question/${question.id}`} primary>
                    Show poll
                </Button>
            </Card.Content>
        </Card>
    );
};

export default QuestionItem;
