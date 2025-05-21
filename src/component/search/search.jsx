import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApioptions } from '../../apis';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
        geoApioptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error(error);
      // return { options: [] };
    }
  };

  const handleOnchange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnchange}
        loadOptions={loadOptions}
        isClearable
      />
    </div>
  );
};

export default Search;
