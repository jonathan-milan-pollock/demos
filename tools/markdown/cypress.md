# cypress

npx nx run website-e2e:e2e
npx nx run website-e2e:e2e --watch
npx nx run website-e2e:e2e --headless
npx nx run website-e2e:e2e --browser edge --headless
npx nx run website-e2e:e2e --prod
npx nx run website-e2e:e2e --config-file=/apps/website-e2e/cypress-prod.json
npx nx run website-e2e:e2e --browser edge (chrome, chromium, edge, firefox, electron)

## videos and screenshots are created in the dist folder

npx nx e2e website-e2e --baseUrl=https://frontend.com
