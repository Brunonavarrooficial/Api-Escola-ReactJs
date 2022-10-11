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
    if (!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function registerRequest({ payload }) {
    const { id, nome, password, email } = payload

    try {
        if (id) {
            call(axios.put, '/users', {
                email,
                nome,
                password: password || undefined,
            });
            console.log('chegueiii no registro! Alterar!');
            toast.success('Conta Alterada com sucesso');
            put(actions.registerUpdatedSuccsess({ nome, email, password }));
        } else {
            call(axios.post, '/users', {
                email,
                nome,
                password,
            });
            console.log('chegueiii no registro! Criar user!');
            toast.success('Conta criada com sucesso!');
            put(actions.registerCreatedSuccsess({ nome, email, password }));
            history.push('/login');
        }
    } catch (e) {
        const errors = get(e, 'response.data.error', []);
        const status = get(e, 'response.status', 0);

        if (status === 401){
            toast.error('Você precisa fazer login novamente.');
            put(actions.loginFailure());
            return history.push('/login');
        }

        if (errors.length > 0) {
            errors.map(error => toast.error(error));
        } else {
            toast.error('Erro, Não Foi Possivel a Ação!');
        }

        put(actions.registerFailure());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
