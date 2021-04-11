# node

## recommended videos

- [NodeJS - The Complete Guide](https://www.udemy.com/course/nodejs-the-complete-guide)
- [HTTP/2 (H2)](https://www.youtube.com/watch?v=r5oT_2ndjms)

## references

## Enable Features

- Use Cache-Control
- Add H2 Enabled CDN
- Enable GZip (html, js, css)
- Use H2 Push -allows pushing files that are known to be needed

  ```js
  for (const asset of ['/static/awesome.css', '/static/unicorn.png']) {
    // stream is a ServerHttp2Stream.
    stream.pushStream({ ':path': asset }, (err, pushStream) => {
      if (err) throw err;
      pushStream.respondWithFile(asset);
    });
  }
  ```

### H2

- HTTP 2 used mulitplexing allowing multiple requests to fire at once fixing H1 Head-of-line blocking (HOL blocking)
- Compresses headers with HPack, references previous headers that have been processed to save time
- Works over TLS
- Defaults to H1 if client can't handle H2
