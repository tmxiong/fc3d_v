/**
 * Created by timxiong on 2018/3/5.
 */
import { START, STOP, RESET, RUN_TIMER } from '../actionTypes';

const start = () => ({ type: START });
const stop = () => ({ type: STOP });
const reset = () => ({ type: RESET });
const runTime = () => ({ type: RUN_TIMER });

export {
    start,
    stop,
    reset,
    runTime
}