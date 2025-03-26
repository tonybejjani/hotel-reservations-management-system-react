/** @format */

import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByValue = searchParams.get('sortBy') || 'name-asc';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortByValue}
      options={options}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
