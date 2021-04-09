const cloud = require('@pulumi/cloud');

/**
 * 
 * worker_processes  1;

events {
    worker_connections  1024;
}

http {
    server {
        listen 80;
        server_name  localhost;

        root   /usr/share/nginx/html;
        index  index.html index.htm;
        include /etc/nginx/mime.types;

        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/css application/javascript;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
} 
 * 
 */
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
