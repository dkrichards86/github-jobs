import jsonp from 'jsonp';

const BASE_URL = `https://jobs.github.com/positions.json`;

/**
 * Encode and lowercase a string for inclusion in build URL
 * 
 * @param {String} value string to encode
 * @returns {String}
 */
export const encode = (value) => encodeURIComponent(value).toLowerCase();

/**
 * Generate a GitHub Jobs URL from the store and page
 * 
 * @param {String} langauge target language
 * @param {String} location target location
 * @param {Number} page current page
 * @returns {String}
 */
export const buildURL = (language, location, page) => {
    let queryString = [];
   
    if (language) {
        queryString.push(`description=${encode(language)}`);
    }

    if (location) {
        queryString.push(`location=${encode(location)}`);
    }

    if (page) {
        queryString.push(`page=${page}`);
    }

    return `${BASE_URL}?${queryString.join('&')}`;
};

/**
 * Asynchronously fetch job listings
 * 
 * @param {String} apiURL full GitHub Jobs URL
 * @returns {Promise} 
 */
export const _fetch = (apiURL) => {
    return new Promise( (resolve, reject) => {
        jsonp(apiURL, null, (err, data) => {
            if (err) {
                reject(err.message);
            }
            
            if (data && data.length) {
                resolve(data);
            }
            else {
                resolve(null);
            }
        });
    });
};

/**
 * Fetch the data
 * 
 * @param {Object} state Redux state object
 * @param {Number} page current page
 */
export async function fetchData(state, page) {
    let shouldFetch = true;
    let fullData = [];

    // GitHub Jobs API doesn't include a total listing count, so we're forced to
    // hack a solution. In order to fetch all listings, we loop, awaiting promise
    // resolution in _fetch. 
    while(shouldFetch) {
        const { language, location } = state;
        let apiURL = buildURL(language, location, page);
        const response = await _fetch(apiURL);

        // If there is a response, merge it into full data array. Otherwise kill
        // looping.
        if (response) {
            fullData = [...fullData, ...response];

            // If ther response array has 50 elements, we've likely hit the per
            // page limit. In this case, we increment the page and fetch again.
            // Otherwise we stop looping.
            if (response.length === 50) {
                page++;
            }
            else {
                shouldFetch = false;
            }
        }
        else {
            shouldFetch = false;
        }
    }

    return fullData;
};