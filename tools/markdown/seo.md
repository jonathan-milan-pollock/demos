# Rockstar Illusions - SEO

## Recommended Reading

- [SEO 2021](https://www.amazon.com/SEO-2019-optimization-marketing-strategies-ebook/dp/B00NH0XZR0)

## Recommended Chrome Extensions

- [Structured Data Testing Tool](https://chrome.google.com/webstore/detail/structured-data-testing-t/kfdjeigpgagildmolfanniafmplnplpl?hl=en)

## References

- [Chrome Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Social Media Image Cheat Sheet](https://www.mainstreethost.com/blog/social-media-image-size-cheat-sheet/)
- [ScreamingFrog](https://www.screamingfrog.co.uk/seo-spider/)
- [KWFinder](https://app.kwfinder.com/)
- [ahrefs](https://ahrefs.com/)
- [JSON-LD](https://github.com/json-ld/json-ld.org)
- [TinyPNG](https://tinypng.com/)
- [TinyPNG Analyzer](https://tinypng.com/analyzer)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/help/home-05a5a164)
- [SEO Google Developers Doc](https://developers.google.com/search/docs)
- [Rich Search Results](https://search.google.com/test/rich-results)

## Topic

https://developers.google.com/speed/pagespeed/insights/

- For each route add meta data

```ts
import { Title, Meta } from '@angular/platform-browser';

  title = 'Dark Rush Photography';
  description = 'Specializes in Event Photography, Real Estate Photography, and Extended Reality (XR)';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'description', content: 'Photographers ' },
    ]);
  }
```

- add robots.txt file <https://www.robotstxt.org/robotstxt.html>
- add sitemap.xml file
