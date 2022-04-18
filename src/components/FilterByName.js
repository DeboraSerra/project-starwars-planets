import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const FilterByName = () => {
  const { filterByName: { name }, handleNameChange } = useContext(MyContext);
  return (
    <input
      className="filter-name"
      type="text"
      data-testid="name-filter"
      value={ name }
      onChange={ handleNameChange }
      placeholder="Find a planet"
    />
  );
};

export default FilterByName;
