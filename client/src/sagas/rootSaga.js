import { all } from 'redux-saga/effects';
import { postRegRequestSaga } from './registration';
import { getStatusReqSaga, getStatusDetailSaga } from './status';

export default function* rootSaga() {
    yield all([
        postRegRequestSaga,
        getStatusReqSaga,
        getStatusDetailSaga
    ]);
}