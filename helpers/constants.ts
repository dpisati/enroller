export const ITEMS_PER_PAGE = 100;
export const baseAPIUrl = 'https://catalogue.data.govt.nz';
export const apiUrlResource = `${baseAPIUrl}/api/3/action/datastore_search?resource_id=20b7c271-fd5a-4c9e-869b-481a0e2453cd`;
export const apiUrlInitialSearch = `${apiUrlResource}&limit=${ITEMS_PER_PAGE}`;
export const changePageUrl = `${baseAPIUrl}/api/3/action/datastore_search?resource_id=20b7c271-fd5a-4c9e-869b-481a0e2453cd&limit=${ITEMS_PER_PAGE}&offset=`;
