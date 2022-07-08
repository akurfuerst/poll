import React from 'react';
import { useEffect } from 'react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './Login';
import LoadingBar from 'react-redux-loading-bar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Nav from './Nav';
import Error from './Error';
import Leaderboard from './Leaderboard';

function App(props) {
    useEffect(() => {
        props.dispatch(handleInitialData());
    }, [props]);

    return (
        <div className="App">
            <LoadingBar />

            {props.authedUser && props.loading === false && <Nav />}
            {props.authedUser && props.loading === false ? (
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/add" exact element={<NewQuestion />} />
                    <Route path="/question/:id" element={<QuestionPage />} />
                    <Route
                        path="/question/*"
                        element={<Navigate to="/" replace />}
                    />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            ) : (props.loading === true) ? null : (
                <Routes>
                    <Route path="*" element={<Login />} />
                </Routes>
            )}

        </div>
    );
}

const mapStateToProps = ({ users, questions, authedUser }) => ({
    loading: users === null && questions === null, authedUser
});

export default connect(mapStateToProps)(App);
