/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
});

export const getAdminHeaders = () => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
  'X-DRP-API-ADMIN-KEY': Cypress.env('DRP_API_ADMIN_KEY'),
});
