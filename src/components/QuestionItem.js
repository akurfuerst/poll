import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const QuestionItem = ({ question }) => {
    return (
        <div>
            {question.author}
            {formatDate(question.timestamp)}
            <Link to={`/question/${question.id}`}>Show</Link>
        </div>
    );
};

export default QuestionItem;
