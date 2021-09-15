import { EntityAdminDto } from '@dark-rush-photography/api/types';

const IMAGE_POST = 'ImagePost';

describe('updateEntity', () => {
  beforeEach(() =>
    cy
      .loginAdmin()
      .then(() =>
        cy
          .findAllEntityAdmin(IMAGE_POST)
          .then(($body) =>
            $body.body.forEach((entityAdmin: EntityAdminDto) =>
              cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
            )
          )
      )
  );
});
