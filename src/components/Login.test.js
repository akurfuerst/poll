import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import middleware from '../middleware';
import reducers from '../reducers';

describe('Login', () => {
    // This test is wrong, because the store is empty and I don't know how to solve this, that all users are available
    it('error login', async () => {
        const component = render(
            <Router>
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
        );

        const username = 'sarahedo';
        const password = 'password123123';

        const inputUser = component.getByTestId('user').children[0];
        const inputPassword = component.getByTestId('password').children[0];
        const submit = component.getByTestId('submit');

        fireEvent.change(inputUser, { target: { value: username } });
        fireEvent.change(inputPassword, { target: { value: password } });
        fireEvent.click(submit);

        expect(component.queryByTestId('error')).toBeInTheDocument();

    });

    it('Submit Button is not clickable', () => {
        const component = render(
            <Router>
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
        );

        const username = 'sarahedo';
        const password = '';

        const inputUser = component.getByTestId('user').children[0];
        const inputPassword = component.getByTestId('password').children[0];

        const submit = component.getByTestId('submit');

        fireEvent.change(inputUser, { target: { value: username } });
        fireEvent.change(inputPassword, { target: { value: password } });

        expect(submit).toHaveAttribute(
            'disabled',
            ''
        );
    });

});
