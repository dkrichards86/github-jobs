import React from 'react';

import './JobsListItem.css';

/**
 * Render an individual job list item
 * @param {*} param0 
 */
const JobsListItem = ({ job, setActiveJob }) => {
    const getLocaleDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div
            className="job-list-item"
            onClick={() => setActiveJob(job['id'])}>
            <div className="job-list-item-listing">
                <div className="job-list-item-title">
                    {job['title']}
                </div>
                <div className="job-list-item-detail">
                    {job['company']} - {job['type']}
                </div>
            </div>
            <div className="job-list-item-metadata">
                <div className="job-list-item-location">
                    {job['location']}
                </div>
                <div className="job-list-item-date">
                    {getLocaleDateString(job['created_at'])}
                </div>
            </div>
        </div>
    );
}

export default JobsListItem;