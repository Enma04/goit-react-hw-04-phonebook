import React from 'react';
import css from '../App.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ handleFilter }) => {
  const changeFilter = (e) => {
    e.preventDefault();
    handleFilter(e.target.value);
  }
  
  return (
    <>
      <h3 className={css.contactsH3}>Contacts</h3>
      <span className={css.filterText}>Find contacts by name</span>
      <input
        type="text"
        name="filter"
        className={css.inputFilter}
        onChange={changeFilter}
      />
    </>
  );
}

Filter.propTypes = {
  handleFilter: PropTypes.func,
};
