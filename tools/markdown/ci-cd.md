# ci-cd

---

# Add Dockerfile and .dockerignore

## Notes

- TODO: run 'npm install durable-functions' from the wwwroot folder of your function app in Kudu

---

## run pulumi locally

1. az login
2. pulumi login
3. pulumi up

-- can use affected to test use NX Cloud locally and from build
It checks that the changed code is formatted properly. (nx format:check)
It runs lint checks for all the projects affected by a PR/commit.
It runs unit tests for all the projects affected by a PR/commit.
It runs e2e tests for all the apps affected by a PR/commit.
It rebuilds all the apps affected by a PR/commit.

- <https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines/>

## Post-Deploy

1. Verify CNAME record Type CNAME Record, Host www, Value dark-rush-photography.azureedge.net.
2. Within endpoint dark-rush-photography add Custom Hostname www.darkrushphotography.host
3. Enable Custom Domain HTTPS, CDN Managed, and TLS 1.2
