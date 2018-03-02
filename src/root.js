/**
 * Created by timxiong on 2018/3/2.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import rootSaga from './app/sagas';
import App from './routers'

const store = configureStore();
// run root saga
store.runSaga(rootSaga);

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}
