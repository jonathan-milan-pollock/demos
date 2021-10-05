import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Load Public Sitemap', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));
});
