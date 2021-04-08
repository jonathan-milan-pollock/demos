const cloud = require('@pulumi/cloud');

let service = new cloud.Service('pulumi-nginx', {
  containers: {
    nginx: {
      build: './app',
      memory: 128,
      ports: [{ port: 80 }],
    },
  },
  replicas: 2,
});

// export just the hostname property of the container frontend
exports.url = service.defaultEndpoint.apply((e) => `http://${e.hostname}`);
