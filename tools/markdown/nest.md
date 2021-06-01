# nest

- add postcss
- nestjs add caching (https://reposhub.com/nodejs/frameworks/nestjs-ng-universal.html)

- implement open api 3
- implement K8 available and ready services
-

```ts
  @Get('status')
  status(): any {
    const { uptime, arch, version, platform } = process
    return {
      version: VERSION,
      stack,
      server: {
        uptime: uptime(),
        arch,
        version,
        platform,
      },
    }
  }
```
