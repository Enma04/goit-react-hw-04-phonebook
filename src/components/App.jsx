import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import {ContactForm} from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import Swal from 'sweetalert2';
import { ContactsList } from './ContactsList/ContactsList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  //------------------------------------------------------------------------
  //------------------- METODOS
  const handleDelete = (e) => {
    const name = e.target.parentNode.firstChild.data;
    setContacts([ ...contacts.filter( item => item.name !== name )])
    Swal.fire(`${name} eliminado!`);
  }

  const handleSubmit = ({ number, name }) => {

    if (contacts.map(item => item.name).includes(name)) {
      Swal.fire('El contacto ya existe!');
      return
    }
    else if (contacts.map(item => item.number).includes(number)) {
      Swal.fire('Este numero ya esta agregado!');
      return
    }

    const id = "id-" + contacts.length + "-" + nanoid(2);
    setContacts( [...contacts, {id, name, number}] );
  };

  const handleFilter = (filter) => { 
    setFilter( filter );
    if( filter !== "" ) handleContacts();
  }

  const handleContacts = () => {
    const aux = contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    if(aux !== "") return aux
    else return contacts
  }

  //------------------------------------------------------------------------
  //------------------- USE EFFECT
  useEffect(() => {
    if(JSON.parse( localStorage.getItem("contacts")) !== null) {
      const localeContacts = JSON.parse( localStorage.getItem("contacts") );
      setContacts([...localeContacts]);
    }
  }, []);

  useEffect(() => {
    if( contacts.length > 0 ) {
      localStorage.setItem("contacts", JSON.stringify( contacts ));
    }
  }, [contacts]);

  //------------------------------------------------------------------------
  //------------------- RETURN
  return (
    <div className={css.container}>
      <ContactForm
        handleSubmit={handleSubmit}
      />
      <Filter handleFilter={handleFilter} />
      <ContactsList
        contacts={handleContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
}
