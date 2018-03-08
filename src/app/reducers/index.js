/**
 * Created by timxiong on 2018/3/2.
 */
import { combineReducers } from 'redux';
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, RUN_TIMER } from '../actionTypes';

// 原始默认state
const defaultState = {
    loadState:'点击开始加载...'
};

function reducers(state = defaultState, action) {
    switch (action.type) {
        case FETCH_START:
            return { ...state, loadState: '正在加载...' };
        case FETCH_SUCCESS:
            return { ...state, loadState: '加载成功！' };
        case FETCH_FAILURE:
            return { ...state, loadState: '加载错误！' };
        case RUN_TIMER:
            return { ...state, seconds: state.seconds + 1 };
        default:
            return state;
    }
}

export default combineReducers({
    reducers
});
