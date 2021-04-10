# ci-cd

## recommended reading

- [12 Factor App](https://12factor.net/)
- [Beyond the 12 Factor App](https://tanzu.vmware.com/content/blog/beyond-the-twelve-factor-app)

## references

- [Pulumi Azure Setup](https://www.pulumi.com/docs/intro/cloud-providers/azure/setup/)
- [GitHub Azure Pipelines](https://azuredevopslabs.com/labs/vstsextend/github-azurepipelines/)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)
- [GIT LFS](https://www.youtube.com/watch?v=uLR1RNqJ1Mw)

---

## Notes

### Pulumi Azure Windows Installation

1. [Install Azure Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)
2. choco install pulumi (run from elevated cmd window)
3. when running pulumi up, fixed error to run 'pulumi plugin install resource azure v3.54.0'

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
