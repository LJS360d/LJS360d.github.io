import { useEffect, type FormEvent } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className='relative'>
      <MdSearch className='absolute left-4 top-4 text-lg text-gray-500' />
      <input
        autoComplete='off'
        id='search-input'
        placeholder='Search...'
        className='input pl-10 pr-0'
        type='text'
        onInput={onChange}
        onKeyUp={onChange}
        onChange={onChange}
      />
    </div>
  );
}
