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

// api
import './commands/api/auth-api.commands';
// api admin
import './commands/api/admin/admin-about.commands';
import './commands/api/admin/admin-best-of.commands';
import './commands/api/admin/admin-destinations.commands';
import './commands/api/admin/admin-entities.commands';
import './commands/api/admin/admin-events.commands';
import './commands/api/admin/admin-favorites.commands';
import './commands/api/admin/admin-image-dimensions.commands';
import './commands/api/admin/admin-images.commands';
import './commands/api/admin/admin-media-processes.commands';
import './commands/api/admin/admin-photo-of-the-week.commands';
import './commands/api/admin/admin-review-media.commands';
import './commands/api/admin/admin-reviews.commands';
import './commands/api/admin/admin-social-media.commands';
import './commands/api/admin/admin-video-dimensions.commands';
import './commands/api/admin/admin-videos.commands';
// api public
import './commands/api/public/about.commands';
import './commands/api/public/best-of.commands';
import './commands/api/public/destinations.commands';
import './commands/api/public/events.commands';
import './commands/api/public/favorites.commands';
import './commands/api/public/photo-of-the-week.commands';
import './commands/api/public/review-media.commands';
import './commands/api/public/reviews.commands';
// api user
import './commands/api/user/user-comments.commands';
import './commands/api/user/user-emotions.commands';

// web-socket
import './commands/web-socket/auth-web-socket.commands';
import './commands/web-socket/messages.commands';
