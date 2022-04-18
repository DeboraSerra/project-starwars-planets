import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import MyContext from './MyContext';

const NEG_ONE = -1;

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    planets: [],
    data: [],
    name: '',
    filterByNumericValue: [],
    order: {
      column: '',
      sort: '',
    },
  });

  useEffect(() => {
    fetchApi()
      .then((response) => {
        const data = response.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return NEG_ONE;
          return 0;
        });
        setState((prevSt) => ({ ...prevSt, data, planets: data }));
      });
  }, []);

  const handleNameChange = ({ target: { value } }) => {
    setState((prevSt) => ({
      ...prevSt,
      name: value,
      data: state.planets.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())),
    }));
  };

  const filterByNumber = (payload = null) => {
    const { planets, filterByNumericValue } = state;
    let data = planets;
    filterByNumericValue.forEach(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        data = data.filter((item) => parseFloat(item[column]) > value);
        break;
      case 'menor que':
        data = data.filter((item) => parseFloat(item[column]) < value);
        break;
      case 'igual a':
        data = data.filter((item) => item[column] === value);
        break;
      default: data = planets;
      }
    });
    if (payload) {
      const { col, comp, val } = payload;
      switch (comp) {
      case 'maior que':
        data = data.filter((item) => parseFloat(item[col]) > val);
        break;
      case 'menor que':
        data = data.filter((item) => parseFloat(item[col]) < val);
        break;
      case 'igual a':
        data = data.filter((item) => item[col] === val);
        break;
      default: data = planets;
      }
    }
    setState((prevSt) => ({
      ...prevSt,
      data,
    }));
  };

  useEffect(() => {
    filterByNumber();
  }, [state.filterByNumericValue]);

  useEffect(() => {
    const { data, order: { column, sort } } = state;
    let sortedList = [];
    if (column === 'population') {
      const newData = data.filter(({ population }) => population !== 'unknown');
      const unknownPop = data.filter(({ population }) => population === 'unknown');
      let sorted = [];
      if (sort === 'ASC') sorted = newData.sort((a, b) => a[column] - b[column]);
      else sorted = newData.sort((a, b) => b[column] - a[column]);
      sortedList = [...sorted, ...unknownPop];
    } else {
      let list = [];
      if (sort === 'ASC') list = data.sort((a, b) => a[column] - b[column]);
      else list = data.sort((a, b) => b[column] - a[column]);
      sortedList = list;
    }
    setState((prevSt) => ({
      ...prevSt,
      data: sortedList,
    }));
  }, [state.order]);

  const setNumericFilter = ({ column, comparison, value }) => {
    setState((prevSt) => ({
      ...prevSt,
      filterByNumericValue: [
        ...prevSt.filterByNumericValue,
        {
          id: Math.random(),
          column,
          comparison,
          value,
        },
      ],
    }));
    const data = { col: column, comp: comparison, val: value };
    filterByNumber(data);
  };

  const removeFilter = (id = null) => {
    const { filterByNumericValue, planets } = state;
    if (!id) {
      setState((prevSt) => ({
        ...prevSt,
        filterByNumericValue: [],
        data: planets,
      }));
    } else {
      const newFilter = filterByNumericValue.filter((item) => item.id !== id);
      setState((prevSt) => ({
        ...prevSt,
        filterByNumericValue: newFilter,
      }));
    }
  };

  const addSort = ({ column, sort }) => {
    setState((prevSt) => ({
      ...prevSt,
      order: {
        column,
        sort,
      },
    }));
  };

  const value = {
    data: state.data,
    filterByName: {
      name: state.name,
    },
    filterByNumericValue: state.filterByNumericValue,
    handleNameChange,
    setNumericFilter,
    removeFilter,
    addSort,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
