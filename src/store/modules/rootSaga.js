import { all } from '@redux-saga/core/effects';

import auth from './auth/sagas';

export default function* rootSaga(){
    return yield all([auth]);
}