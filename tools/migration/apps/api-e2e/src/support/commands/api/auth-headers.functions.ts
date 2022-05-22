export const getAuthHeaders = (): { Authorization: string } => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
});
