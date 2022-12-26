'use client';

import React from 'react';
import { atom, useAtom } from 'jotai';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { ITEMS_PER_PAGE } from '../helpers/constants';

import ReactPaginate from 'react-paginate';
import { schoolListAtom } from './SchoolList';

export const pageAtom = atom(1);

export default function Pagination() {
  const [_, setPageNumber] = useAtom(pageAtom);
  const [schools] = useAtom(schoolListAtom);

  const pageCount = Math.ceil(schools?.result?.total / ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) =>
    setPageNumber(event.selected + 1);

  return (
    <div className="flex items-center justify-center h-12 my-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowRightIcon />}
        previousLabel={<ArrowLeftIcon />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
        className="flex items-stretch justify-center gap-2 text-black h-full"
        activeLinkClassName="font-bold bg-[#dfdfdf] rounded w-full h-full border border-gray-700 border-solid"
        pageLinkClassName="w-12 flex items-center justify-center rounded bg-gray-100 rounded h-full hover:bg-gray-200 transition"
        previousLinkClassName="flex items-center justify-center bg-gray-100 rounded px-4 h-full hover:bg-gray-200 transition"
        nextLinkClassName="flex items-center justify-center bg-gray-100 rounded px-4 h-full hover:bg-gray-200 transition"
        disabledLinkClassName="p-0 m-0 mx-0 text-gray-300 bg-gray-50 cursor-default hover:bg-gray-50"
        breakClassName="w-12 flex items-center justify-center"
      />
    </div>
  );
}
