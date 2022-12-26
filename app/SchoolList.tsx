'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { changePageUrl } from '../helpers/constants';
import { Size, useWindowSize } from '../hooks/useWindowSize';
import Loading from './loading';
import { School, SchoolAPIResponse } from './page';
import { pageAtom } from './Pagination';
import { searchAtom } from './SearchInput';

export const schoolListAtom = atom<SchoolAPIResponse>({} as SchoolAPIResponse);

export const SchoolList = () => {
  const [pageNumber] = useAtom(pageAtom);
  const [searchValue] = useAtom(searchAtom);
  const [_, setSchools] = useAtom(schoolListAtom);

  const [loading, setIsLoading] = useState(false);
  const [currentList, setCurrentList] = useState<School[]>();

  const size: Size = useWindowSize();
  const isLargeWindow = size.width && size.width > 1000;

  useEffect(() => {
    const fetchNewPage = async () => {
      setIsLoading(true);

      try {
        const data = await fetch(changePageUrl + pageNumber);
        const updatedList: SchoolAPIResponse = await data.json();
        setCurrentList(updatedList.result.records);
        setSchools(updatedList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue.length < 3) fetchNewPage();
  }, [pageNumber, searchValue]);

  useEffect(() => {
    const searchForValue = async () => {
      setIsLoading(true);

      try {
        const data = await fetch(
          `${changePageUrl + pageNumber + '&q=' + searchValue}`
        );
        const searchResult: SchoolAPIResponse = await data.json();

        setCurrentList(searchResult.result.records);
        setSchools(searchResult);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue) searchForValue();
  }, [searchValue, pageNumber]);

  if (loading)
    return (
      <div className="h-[calc(100vh-226px)] overflow-scroll shadow flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="h-[calc(100vh-226px)] overflow-scroll shadow">
      <table className="table-auto w-full text-sm text-left relative">
        <thead className="bg-white border-b uppercase sticky top-0">
          <tr>
            <th scope="col" className="font-bold py-3 px-6">
              Name
            </th>
            {isLargeWindow && (
              <>
                <th scope="col" className="font-bold py-3 px-6">
                  City
                </th>
                <th scope="col" className="font-bold py-3 px-6">
                  Authority
                </th>
                <th scope="col" className="font-bold py-3 px-6">
                  Telephone
                </th>
              </>
            )}
            <th scope="col" className="font-bold py-3 px-6 text-center">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {currentList?.map((school, index) => (
            <tr
              key={school.School_Id}
              className={`${index % 2 ? 'bg-white' : 'bg-gray-100'} border-b`}
            >
              <td className="text-sm text-gray-900 font-light px-6 py-4 max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                {school.Org_Name.length > 0 ? school.Org_Name : '-'}
              </td>
              {isLargeWindow && (
                <>
                  <td className="text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                    {school.Add1_City.length > 0 ? school.Add1_City : '-'}
                  </td>
                  <td className="text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                    {school.Authority.length > 0 ? school.Authority : '-'}
                  </td>
                  <td className="text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                    {school.Telephone.length > 0 ? school.Telephone : '-'}
                  </td>
                </>
              )}

              <Dialog.Root>
                <Dialog.Trigger className="cursor-pointer" asChild>
                  <td className="w-[-webkit-fill-available] max-w-sm text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden text-center hover:bg-gray-200 transition">
                    More
                  </td>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-gray-400 opacity-50" />
                  <Dialog.Content className="bg-white rounded-md shadow-lg p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90vw] sm:min-w-[600px] overflow-scroll">
                    <Dialog.Close asChild>
                      <button
                        className="absolute top-4 right-4 p-2 rounded hover:bg-slate-200 transition "
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>

                    <Dialog.Title className="font-bold mt-1 mb-3 sm:pl-4">
                      School Detail
                    </Dialog.Title>

                    <table className="w-[80vw] sm:w-full">
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Name
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Org_Name ?? '-'}
                          </td>
                        </tr>

                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Address
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Add1_Line1 ?? '-'}
                          </td>
                        </tr>

                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Authority
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Authority ?? '-'}
                          </td>
                        </tr>

                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Suburb
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Add1_Suburb.length > 0
                              ? school.Add1_Suburb
                              : '-'}
                          </td>
                        </tr>

                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            City
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Add1_City ?? '-'}
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            PO
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Add2_Postal_Code ?? '-'}
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Education Region
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Education_Region ?? '-'}
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Email
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.Email.length > 0 ? school.Email : '-'}
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            Telephone
                          </td>
                          <td className="text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            {school.Telephone.length > 0
                              ? school.Telephone
                              : '-'}
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="font-bold text-sm text-gray-900 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-ellipsis overflow-hidden">
                            URL
                          </td>
                          <td className=" text-sm text-gray-900 font-light sm:px-6 py-2 sm:py-4 whitespace-pre-wrap text-ellipsis overflow-hidden">
                            {school.URL ? (
                              <Link
                                className="underline"
                                href={school.URL}
                                target="_blank"
                                rel={school.URL}
                              >
                                {school.URL}
                              </Link>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
