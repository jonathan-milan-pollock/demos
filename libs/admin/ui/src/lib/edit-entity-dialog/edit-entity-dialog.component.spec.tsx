import { render } from '@testing-library/react';

import EditEntityDialog from './edit-entity-dialog.component';
import { EntityType } from '@dark-rush-photography/shared/types';

describe('EditEntityDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EditEntityDialog
        entityType={EntityType.About}
        pathname={''}
        isDialogOpen={false}
        setIsDialogOpen={function (isDialogOpen: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
