import React from 'react';
import { connect } from 'react-redux';

import SearchForm from "../components/SearchForm/SearchForm";

import { 
    fetchJobs, setLanguage, setLocation
} from '../actions';

const SearchFormContainer = (props) => <SearchForm {...props} />;

const mapStateToProps = (state) => {
    return {
        language: state.language,
        location: state.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchJobs: () => dispatch(fetchJobs()),
        setLanguage: (language) => dispatch(setLanguage(language)),
        setLocation: (location) => dispatch(setLocation(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);