export const getAuthHeaders = (): { Authorization: string } => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
});

export const getAuthHeadersAdmin = (): { Authorization: string } => ({
  Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN_ADMIN')}`,
});
