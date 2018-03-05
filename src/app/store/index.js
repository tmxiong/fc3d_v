import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import sagas from '../sagas';

const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose (
            applyMiddleware(sagaMiddleware, createLogger())
        )
    )

    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);
    return store;
}

const store = configureStore();
export default store;
