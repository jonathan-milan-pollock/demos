# temp

### references

- [12 Factor App](https://12factor.net/)
- [Beyond the 12 Factor App](https://tanzu.vmware.com/content/blog/beyond-the-twelve-factor-app)

- [Angular Performance Best Patterns](https://www.youtube.com/watch?v=-eH2gCGHcGs)

- [OnPush Change Detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
- [OnPush Change Detection](https://medium.com/@ManfredSteyer/performance-tuning-data-binding-in-angular-with-onpush-immutables-and-observables-9fb2734dc66e)
- [Angular 10 New Features](https://betterprogramming.pub/angular-10-new-features-dbc779061dc8)
- [Plyr](https://plyr.io/)
- [Google Analytics](https://analytics.google.com/)
- [Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Essential Meta Tags](https://css-tricks.com/essential-meta-tags-social-media/)
- [Social Media Image Sizes](https://www.mainstreethost.com/blog/social-media-image-size-cheat-sheet/)
- [Screen sizes mobile](https://screensiz.es/phone)
- [Advertising Sizes](https://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)
- [iPhone Resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
- [Node.js can HTTP/2 push!](https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1)
- [Cool Gray](https://medium.com/ge-design/iot-cool-gray-is-a-great-background-color-for-data-visualization-ebf18c318418)
- [GitHub Azure Pipelines](https://azuredevopslabs.com/labs/vstsextend/github-azurepipelines/)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)
- [GIT LFS](https://www.youtube.com/watch?v=uLR1RNqJ1Mw)

---

```ts
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = ;
// google geocoding api
// google js maps api
// @types/googlemaps

//declare var google: { maps: { Map: any; Marker: any } };

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
  };

  axios
    .get<GoogleGeocodingResponse>(
      `/https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
```

```ts
/*
- @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)

*/
```
