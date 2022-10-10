import { put, all, call, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);
        yield put(actions.loginSuccess({ ...response.data }));

        toast.success('Login com Sucesso!!! \0/');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        
    } catch (e) {
        toast.error('Não foi Possivel Logar no Sistema!!!');

        yield put(actions.loginFailure());
    }
        
}

function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '');
    if(!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
