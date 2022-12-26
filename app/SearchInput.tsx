'use client';

import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';

import {
  MagnifyingGlassIcon,
  PaperPlaneIcon,
  ResetIcon,
} from '@radix-ui/react-icons';

export const searchAtom = atom('');

export default function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useAtom(searchAtom);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KEY', event.key);
    if (event.key === 'Enter') {
      handleSearch();
    }
    if (event.key === 'Escape') {
      handleResetResults();
    }
  };

  const handleSearch = () => {
    if (inputValue.length < 3) return;

    setSearchValue(inputValue.trim());
  };

  const handleResetResults = () => {
    setInputValue('');
    setSearchValue('');
  };

  useEffect(() => {
    handleResetResults();
  }, []);

  return (
    <div className="flex items-center justify-center h-12 my-4 relative">
      <MagnifyingGlassIcon
        width={22}
        height={22}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      />
      <input
        className="w-full h-full pl-12 form-control block px-3 pr-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
        type="search"
        name="search"
        id="search"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchValue && (
        <button
          onClick={handleResetResults}
          className="absolute right-12 top-1/2 -translate-y-1/2 hover:bg-gray-100 transition cursor-pointer p-2 rounded"
        >
          <ResetIcon width={22} height={22} />
        </button>
      )}
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 transition cursor-pointer p-2 rounded"
      >
        <PaperPlaneIcon width={22} height={22} />
      </button>
    </div>
  );
}
