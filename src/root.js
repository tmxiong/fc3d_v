/**
 * Created by timxiong on 2018/3/2.
 */
import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import App from './routers';
import store from '../src/app/store';


export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
