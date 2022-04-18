import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const SortColumn = () => {
  const [state, setState] = useState({
    column: 'population',
    sort: 'asc',
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((prevSt) => ({
      ...prevSt,
      [name]: value,
    }));
  };

  const { addSort } = useContext(MyContext);

  const sendSort = () => {
    const { column, sort } = state;
    addSort({ column, sort });
  };

  return (
    <section className="sort">
      <label htmlFor="column">
        Select a column
        <select
          name="column"
          id="column"
          data-testid="column-sort"
          onChange={ handleChange }
          value={ state.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <section onChange={ handleChange } className="radio-sort">
        <label htmlFor="asc">
          <input
            type="radio"
            name="sort"
            id="asc"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
          Upward
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            name="sort"
            id="desc"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
          Downward
        </label>
      </section>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sendSort }
      >
        Sort data
      </button>
    </section>
  );
};

export default SortColumn;
