import { render, screen } from '@testing-library/react';
import NewQuestion from './NewQuestion';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { BrowserRouter as Router } from 'react-router-dom';

test('Check if headline is in component', () => {
    const component = render(
        <Router>
            <Provider store={store}>
                <NewQuestion />
            </Provider>
        </Router>
    );

    const headline = screen.getByTestId('headline');

    expect(headline).toBeInTheDocument();
    expect(component).toMatchSnapshot();
});
