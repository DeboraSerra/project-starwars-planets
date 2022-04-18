import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextProvider from './context/ContextProvider';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumber';
import NumericFilters from './components/NumericFilters';
import SortColumn from './components/SortColumn';
import logo from './images/Star_Wars_logo-1.png';

const App = () => (
  <ContextProvider>
    <div className="stars" />
    <div className="img-sect perspective">
      <img className="fade" src={ logo } alt="Star Wars Planets" />
    </div>
    <div className="filter-selectors">
      <FilterByName />
      <FilterByNumber />
      <SortColumn />
    </div>
    <NumericFilters />
    <Table />
  </ContextProvider>
);

export default App;
