import { put, all, call, takeLatest } from '@redux-saga/core/effects';
import * as actions from './actions';
import * as types from '../types';

const requisicao = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
        /*reject();*/
    }, 600)
});

function* exampleRequest() {
    try {
        yield call(requisicao);
        yield put(actions.clicaBotaoSuccess());
    } catch {
        yield put(actions.clicaBotaoFailure());
    }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);