/**
 * Created by timxiong on 2018/3/5.
 */
import * as types from '../constants/actionTypes';

showLoading = (loading = true) => ({
    type: types.LOADING,
    loading,
});

module.exports = {
    showLoading,
};
