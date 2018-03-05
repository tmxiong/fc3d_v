/**
 * Created by timxiong on 2018/3/5.
 */
import {handleActions} from "redux-actions";
import * as types from '../constants/actionTypes';

const initialState = {
    loading:true,
};

const handler = {};

handler[types.LOADING] = (state, action) => {
    const {loading} = action;
    return {
        ...state,
        loading,
    };
};

export default handleActions(handler, initialState);