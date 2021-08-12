import { Logger } from '@nestjs/common';
import { Repository } from '@nestjs/azure-database';

import { ClientsDropboxUserTable } from '../tables/clients-dropbox-user.table';
import { ClientsDropboxUpdateTable } from '../tables/clients-dropbox-update.table';

export const isClientsDropboxUpdate = (
  updateRepository: Repository<ClientsDropboxUpdateTable>
): Promise<boolean> =>
  new Promise((resolve) =>
    resolve(
      updateRepository.findAll().then((response) => response.entries.length > 0)
    )
  );

export const updateClientsDropbox = (
  userRepository: Repository<ClientsDropboxUserTable>,
  updateRepository: Repository<ClientsDropboxUpdateTable>,
  clientsDropboxClientId: string,
  clientsDropboxClientSecret: string,
  dropboxOwnerEmail: string
): void => {
  setTimeout(() => {
    updateRepository
      .findAll()
      .then((response) => response.entries)
      .then((entries) =>
        entries.forEach((entry) =>
          updateRepository.delete(entry.key, new ClientsDropboxUpdateTable())
        )
      )
      .then(() => userRepository.findAll())
      .then((userResponse) => userResponse.entries)
      .then((entries) =>
        entries.find((user) => user.email === dropboxOwnerEmail)
      )
      .then((owner) => {
        if (owner && owner.refreshToken) {
          Logger.log("offer to move to shared directory")
            /*updateEntitiesDropbox(
            entityModel,
            clientsDropboxClientId,
            clientsDropboxClientSecret,
            owner.refreshToken
          );*/
        }
      });
  }, 5_000);
};
