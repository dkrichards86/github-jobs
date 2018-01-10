import React from 'react';

import './JobDetail.css';

/**
 * Render the job detail pane
 * @param {Object} param0 
 */
const JobDetail = ({jobs, activeJob}) => { 
    // Filter all jobs by the id stored in activeJob
    let selectedJobs = jobs.filter(job => job['id'] === activeJob);

    // If there are elements in selectedJobs, display the pane.
    if (selectedJobs.length > 0) {
        // filter returns an array, so grab the first element. We *should* only
        // have one element in selectedJobs, so it's not an issue.
        const selectedJob = selectedJobs[0];

        return (
            <div className="job-detail">
                <h2 className="is-size-3">Job Description</h2>
                <div dangerouslySetInnerHTML={{__html: selectedJob['description']}} />
            </div>
        );
    }
    else {
        return null;
    }
};

export default JobDetail;

