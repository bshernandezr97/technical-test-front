import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AppRouter } from './routes/AppRouter';
import './styles/styles.scss';



export const MoviesApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
