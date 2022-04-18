import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const NumericFilters = () => {
  const { filterByNumericValue, removeFilter } = useContext(MyContext);
  return (
    <section className="filters">
      <button
        type="button"
        onClick={ () => removeFilter() }
        data-testid="button-remove-filters"
      >
        Remove All Filters
      </button>
      <section className="filters-list">
        {filterByNumericValue.map(({ id, column, comparison, value }) => (
          <p key={ id } data-testid="filter" className="filter">
            <span>{`${column} ${comparison} ${value}`}</span>
            <button
              type="button"
              onClick={ () => removeFilter(id) }
              className="delete-btn"
            >
              X
            </button>
          </p>
        ))}
      </section>
    </section>
  );
};

export default NumericFilters;
