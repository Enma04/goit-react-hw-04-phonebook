import React from "react";
import css from '../App.module.css';
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, handleDelete }) => {
  return(
    <ul className={css.contactList}>
      {contacts.length !== 0 &&
        contacts.map(contact => (
          <li key={contact.id} className={css.contactItem}>
            {contact.name}: {contact.number}
            <button onClick={() => handleDelete(contact.id, contact.name)} >Delete</button>
          </li>
        ))}
    </ul>
  );
}

ContactsList.propTypes = {
  handleDelete: PropTypes.func,
  contacts: PropTypes.array,
};