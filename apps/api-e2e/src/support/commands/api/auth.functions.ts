/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
});
