import lodash from 'lodash';
import type { FormEvent } from 'react';
import { MdMenu } from 'react-icons/md';
import SearchBar from '../common/SearchBar';
interface ToolbarProps {
  title: string;
  sidebarId: string;
}
const { debounce } = lodash;

export default function Toolbar({ title, sidebarId }: ToolbarProps) {
  function onSearchBarInput(event: FormEvent<HTMLInputElement>) {
    // TODO on debounce 300ms, dispatch 'search-update' event with event.target.value as the value
    console.log(event.currentTarget.value);
    debounce(() => {});
  }

  return (
    <header className='navbar bg-base-300 shadow-lg sticky top-0 z-50'>
      <div className='navbar-start gap-2'>
        <label htmlFor={sidebarId} className='btn rounded-full btn-ghost'>
          <MdMenu className='text-lg' />
        </label>
        <h1 className='select-none'>{title}</h1>
      </div>
      <div className='navbar-center' />
      <div className='navbar-end'>
        <SearchBar onChange={onSearchBarInput} />
      </div>
    </header>
  );
}
