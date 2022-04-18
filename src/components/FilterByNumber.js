import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const FilterByNumber = () => {
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const { setNumericFilter, filterByNumericValue } = useContext(MyContext);

  const hasColumn = (column) => filterByNumericValue
    .some((item) => item.column === column);

  const handleChange = ({ target: { name, value } }) => {
    setState((prevSt) => ({ ...prevSt, [name]: value }));
  };

  const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const availbleOpt = options.filter((opt) => !hasColumn(opt));

  const handleClick = () => {
    const { column, comparison, value } = state;
    setNumericFilter({ column, comparison, value });
    setState({
      column: availbleOpt[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <section className="number-filter">
      <label htmlFor="column">
        Find
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ state.column }
          onChange={ handleChange }
        >
          {availbleOpt.map((opt) => (
            <option value={ opt }>{opt}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        That is
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          value={ state.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ state.value }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
        disabled={availbleOpt.length === 0}
      >
        Filter
      </button>
    </section>
  );
};

export default FilterByNumber;
