import { all } from '@redux-saga/core/effects';

import example from './example/sagas';

export default function* rootSaga(){
    return yield all([example]);
}