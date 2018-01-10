import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import { 
    SET_ACTIVE_JOB, SET_JOBS, SET_LANGUAGE, SET_LOADING, SET_LOCATION, SET_PAGE
} from '../actions';

const initialState = { 
    activeJob: null,
    jobs: [],
    langauge: '',
    loading: false,
    location: '',
    page: 0
};

const reducer = handleActions({
    [SET_ACTIVE_JOB]: (state, action) => (
        update(state, {
            activeJob: {
                $set: action.payload
            }
        })
    ),
    [SET_JOBS]: (state, action) => (
        update(state, {
            jobs: {
                $set: action.payload
            }
        })
    ),
    [SET_LANGUAGE]: (state, action) => (
        update(state, {
            language: {
                $set: action.payload
            }
        })
    ),
    [SET_LOADING]: (state, action) => (
        update(state, {
            loading: {
                $set: action.payload
            }
        })
    ),
    [SET_LOCATION]: (state, action) => (
        update(state, {
            location: {
                $set: action.payload
            }
        })
    ),
    [SET_PAGE]: (state, action) => (
        update(state, {
            page: {
                $set: action.payload
            }
        })
    )
}, initialState);

export default reducer;
