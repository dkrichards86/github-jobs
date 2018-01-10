import React from 'react';

import './SearchForm.css';

const LOCATIONS = [
    'Boston', 'San Francisco', 'Los Angeles', 'Denver', 'Boulder',
    'Chicago', 'New York'
];

const LANGUAGES = [
    'Python', 'Node', 'JavaScript', 'Ruby', '.NET', 'Java', 'Go'
];

/**
 * Render the search form
 * @param {*} props 
 */
const SearchForm = (props) => (
    <div className="search-form">
        <div className="field">
            <label className="label">
                Language
            </label>
            <div className="control">
                <div className="select">
                    <select 
                        value={props.language} 
                        onChange={event => props.setLanguage(event.target.value)}>
                        <option value=''>
                            -- choose a language --
                        </option>
                        {LANGUAGES.map((language, i)=> (
                            <option 
                                value={language}
                                key={`language-${i}`}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="field">
            <label className="label">
                Location
            </label>
            <div className="control">
                <div className="select">
                    <select
                        value={props.location} 
                        onChange={event => props.setLocation(event.target.value)}>
                        <option value=''>
                            -- choose a location --
                        </option>
                        {LOCATIONS.map((location, i) => (
                            <option
                                value={location}
                                key={`location-${i}`}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="control">
            <button 
                className="button is-link"
                onClick={() => props.fetchJobs()}>
                Submit
            </button>
        </div>
    </div>
);

export default SearchForm;