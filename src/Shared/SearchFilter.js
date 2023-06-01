import axios from 'axios';
import { pickBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { usePrevious } from 'react-use';

const SearchFilter = ({ filters }) => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));
  // const { filters } = usePage().props;
  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    role: '', // role is used only on users page
    search: '',
    trashed: ''
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: '',
      search: '',
      trashed: ''
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length
        ? pickBy(values)
        : { remember: 'forget' };
      axios.get(
        "http://127.0.0.1:8000/api/categories", {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
        params: {
          search: values.search
        }
      }
      );
    }
  }, [values]);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));

    if (opened) setOpened(false);
  }
  return (
    <div className="flex items-center w-full max-w-md mr-4">
      <div className="relative flex w-full bg-white rounded shadow">
        <input
          className="relative w-full px-6 py-3 rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="off"
          type="text"
          name="search"
          value={values.search}
          onChange={handleChange}
          placeholder="Search…"
        />
      </div>
      <button
        onClick={reset}
        className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
        type="button"
      >
        Reset
      </button>
    </div>
  );
};

export default SearchFilter;