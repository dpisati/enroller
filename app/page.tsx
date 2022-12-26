import { apiUrlInitialSearch } from '../helpers/constants';
import Loading from './loading';
import Pagination from './Pagination';
import { SchoolList } from './SchoolList';
import { Suspense } from 'react';

export interface School {
  _id: number;
  School_Id: number;
  Org_Name: string;
  Telephone: string;
  Email: string;
  Add1_Line1: string;
  Add1_Suburb: string;
  Add1_City: string;
  Add2_Postal_Code: string;
  Authority: string;
  Education_Region: string;
  Latitude: number;
  Longitude: number;
  URL: string;
}

export interface SchoolAPIResponse {
  result: {
    total: number;
    records: School[];
    _links: {
      start: string;
      next: string;
    };
  };
}

export async function getSchools(): Promise<SchoolAPIResponse> {
  const res = await fetch(apiUrlInitialSearch);
  return await res.json();
}

export default async function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SchoolList />
      </Suspense>
      <Pagination />
    </>
  );
}
