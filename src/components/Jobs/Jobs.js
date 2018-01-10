import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import JobDetail from '../JobDetail/JobDetail';
import JobsList from '../JobsList/JobsList';
import isEqual from 'lodash/isEqual';

import './Jobs.css';

const PER_PAGE = 10;

class Jobs extends Component {
    constructor(props) {
        super(props);
        
        this.mounted = false;

        this.state = {
            visibleJobs: []
        };
    }

    /**
     * Flag the dom as mounted after initial render
     */
    componentDidMount() {
        // This is used to switch the empty pane message based on context.
        this.mounted = true;
    }

    /**
     * Respond to incoming props
     * @param {Object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.jobs, nextProps.jobs)) {
            const { start, end } = this.getListingRange(0);

            this.setState({
                visibleJobs: this.getVisibleJobs(nextProps.jobs, start, end)
            });
        }
        else if (!isEqual(this.props.page, nextProps.page)) {
            // If the page changes, update the job list and page number. Changing
            // a page also resets the active job.
            const { start, end } = this.getListingRange(nextProps.page);

            this.setState({
                visibleJobs: this.getVisibleJobs(nextProps.jobs, start, end)
            });
        }
    }

    /**
     * Get start and end indicies based on page number.
     * @param {Number} page 
     */
    getListingRange(page) {
        const start = page * PER_PAGE;
        const end = start + PER_PAGE;

        return { 
            start, end
        };
    }

    /**
     * Slice the jobs array based on the visible page.
     * 
     * @param {Array} jobs 
     * @param {Number} start 
     * @param {Number} end 
     */
    getVisibleJobs(jobs, start, end) {
        return jobs.slice(start, end);
    }

    /**
     * Respond to a page change. Update the page and unset the active job.
     * 
     * @param {Number} page 
     */
    handlePageChange(page) {
        this.props.setActiveJob(null);
        this.props.setPage(page);
    }

    /**
     * Render an empty job list. This occurs either (a) on the initial render, 
     * or (b) on subsequent rerenders with no results.
     */
    renderEmptyList() {
        let message = "No listings available. Please update your search criteria.";

        if (!this.mounted) {
            message = "Welcome to Job Listings. Please conduct a search.";
        }

        return (
            <div className="jobs">
                <h2 className="is-size-5 has-text-centered">{message}</h2>
            </div>
        );
    }

    /**
     * Render the job list. This display the list itself and teh description of
     * the active job, if applicable.
     */
    renderJobs() {
        const { activeJob, jobs } = {...this.props};
        const { visibleJobs } = {...this.state};

        // Properly pluralize job(s)
        const pluralizedJobs = `Job${jobs.length === 1 ? '' : 's'}`;
        const countStr = `Showing ${visibleJobs.length} of ${jobs.length} ${pluralizedJobs}`;

        return (
            <div className="jobs">
                <h2 className="is-size-5 has-text-centered">{countStr}</h2>
                <div className="job-container">
                    <div className="job-element">
                        <JobsList {...this.props} jobs={visibleJobs} />
                    </div>
                    {activeJob && (
                        <div className="job-element">
                            <JobDetail {...this.props} jobs={visibleJobs} />
                        </div>
                    )}
                </div>
                {this.renderPagination(jobs)}
            </div>
        );
    }

    /**
     * If there are more than PER_PAGE listings, render the pagination view. 
     * 
     * @param {Array} jobs 
     */
    renderPagination(jobs) {
        if ( jobs.length > PER_PAGE ) {
            const pageCount = Math.ceil(jobs.length / PER_PAGE);

            return (
                <ReactPaginate previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={(data) => this.handlePageChange(data.selected)}
                    containerClassName={"pagination"}
                    activeClassName={"active"} />
            );
        }
        else {
            return null;
        }
    }

    /**
     * Render the job list. If there are listigns, show the list. Otherwise show
     * an empty message.
     */
    render() {
        if (this.props.jobs.length) {
            return this.renderJobs();
        }
        else {
            return this.renderEmptyList();
        }
    }
}

export default Jobs;

