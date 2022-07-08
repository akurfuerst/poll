import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';

test('Check if Home is in Navigation', () => {
    const component = render(
        <Router>
            <Provider store={store}>
                <Nav />
            </Provider>
        </Router>
    );

    const link = screen.getByTestId('home');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
        'href',
        '/'
    );

});

test('Check if Leaderboard is in Navigation', () => {
    const component = render(
        <Router>
            <Provider store={store}>
                <Nav />
            </Provider>
        </Router>
    );

    const link = screen.getByTestId('leaderboard');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
        'href',
        '/leaderboard'
    );
});


test('Check if add new Question is in Navigation', () => {
    const component = render(
        <Router>
            <Provider store={store}>
                <Nav />
            </Provider>
        </Router>
    );

    const link = screen.getByTestId('add');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
        'href',
        '/add'
    );

});
