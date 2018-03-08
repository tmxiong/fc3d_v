/**
 * Created by timxiong on 2018/3/5.
 */
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, RUN_TIMER } from '../actionTypes';

const fetchStart = () => ({ type: FETCH_START });
const fetchSuccess = () => ({ type: FETCH_SUCCESS });
const fetchFailure = () => ({ type: FETCH_FAILURE });
const runTime = () => ({ type: RUN_TIMER });

export {
    fetchStart,
    fetchSuccess,
    fetchFailure,
    runTime
}