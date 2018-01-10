import React from 'react';
import JobListItem from '../JobsListItem/JobsListItem';

import './JobsList.css';

/**
 * Render the full job list
 * @param {*} param0 
 */
const JobsList = ({ jobs, setActiveJob }) => {
    return (
        <div className="jobs-list">
            {jobs.map((job, i) => (
                <JobListItem
                    setActiveJob={setActiveJob}
                    job={job}
                    key={job['id']} />
                )
            )}
        </div>
    );
};

export default JobsList;