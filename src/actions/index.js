import { createAction } from 'redux-actions';
import { fetchData } from '../utils/';

export const SET_ACTIVE_JOB = 'SET_ACTIVE_JOB';
export const SET_JOBS = 'SET_JOBS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_PAGE = 'SET_PAGE';

export const setActiveJob = createAction(SET_ACTIVE_JOB);
export const setJobs = createAction(SET_JOBS);
export const setLanguage = createAction(SET_LANGUAGE);
export const setLoading = createAction(SET_LOADING);
export const setLocation = createAction(SET_LOCATION);
export const setPage = createAction(SET_PAGE);

/**
 * 
 */
export const fetchJobs = () => {
    return (dispatch, getState) => {
        // First, set the loading flag
        dispatch(setLoading(true));

        // ... then fetch listings
        fetchData(getState(), 0)
            .then(data => {
                // If we successfully receive data, we have a few housekeeping
                // tasks to handle.

                // First, we reset the active job and page
                dispatch(setActiveJob(null));
                dispatch(setPage(0));

                // We save the listings
                dispatch(setJobs(data));

                // And we disable the loading flag
                dispatch(setLoading(false));
            })
            .catch(err => {
                // If something went wrong, turn off the loading flag.
                dispatch(setLoading(false));
                console.log(err);
            });
    }
};