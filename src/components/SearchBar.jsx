import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
const SearchBar = ({searchValue, handleSearch}) => {
  return (
    <div>
      <label className='relative inline-flex bg-white border border-black rounded-full overflow-hidden focus:outline-none shadow-lg'>
        <MagnifyingGlassIcon className='w-5 h-5 absolute top-1.5 left-2' />
        <input type='text' placeholder='Search user' className='py-1 pl-8 pr-1' value={searchValue} onChange={handleSearch} />
      </label>
    </div>
  )
}

export default SearchBar
