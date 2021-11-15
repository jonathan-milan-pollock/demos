# cypress

## auth0

- enable authentication and authorization in Auth0

  - add a new Single Page Application client Cypress E2E Testing
  - under the application Settings > Advanced Settings > Grant Types enable only Password
  - create 2 users one admin and the other a user

- under Settings of Auth0 (the Tenant) > General > Authorization Settings > Default Directory set value Username-Password-Authentication
  - this prevents the Authorization server not configured with default connection

## best practices Cypress

- Set state directly & programmatically, don't need to use the UI to build up state
- Write specs in isolation without sharing page objects
- Have access to everything so don't limit to acting like a user
