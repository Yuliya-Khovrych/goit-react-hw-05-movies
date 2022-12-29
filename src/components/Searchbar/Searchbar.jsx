import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error(
        'The search string cannot be empty. Please specify your search query.'
      );
    }
    onSubmit(searchQuery);
  };

  return (
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={20} />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search movies"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
  
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
