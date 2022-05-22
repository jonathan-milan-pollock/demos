// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// api admin
import './commands/api/admin/admin-cron-processes.commands';
import './commands/api/admin/admin-entities.commands';
import './commands/api/admin/admin-images.commands';

// api public
import './commands/api/public/entities.commands';

// api
import './commands/api/delete-test-data.commands';
import './commands/api/login.commands';
