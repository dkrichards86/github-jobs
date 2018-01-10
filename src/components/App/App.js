import React from 'react';
import SearchFormContainer from '../../containers/SearchFormContainer';
import JobsContainer from '../../containers/JobsContainer';

import './App.css';

/**
 * Render the app
 */
const App = () => (
  <main className="app-container">
    <SearchFormContainer />
    <JobsContainer />
  </main>
);

export default App;