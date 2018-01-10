import React from 'react';
import { connect } from 'react-redux';

import Jobs from "../components/Jobs/Jobs";

import { fetchJobs, setActiveJob, setPage } from '../actions';

const JobsContainer = (props) => <Jobs {...props} />;

const mapStateToProps = (state) => {
    return {
        activeJob: state.activeJob,
        page: state.page,
        jobs: state.jobs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchJobs: () => dispatch(fetchJobs()),
        setActiveJob: (id) => dispatch(setActiveJob(id)),
        setPage: (page) => dispatch(setPage(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer);