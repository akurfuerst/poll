import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';

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
            <h1 data-testid="headline">Would you rather</h1>
            Create your own poll
            <form onSubmit={handleSubmit}>
                <p>
                    First option:<br />
                    <input type="text" onChange={handleChangeOption1} />
                </p>
                <p>
                    Second option:<br />
                    <input type="text" onChange={handleChangeOption2} />
                </p>

                <button type="submit" disabled={!(optionOne && optionTwo)}>Create Question</button>
            </form>
        </div>
    );
};

export default connect()(NewQuestion);
