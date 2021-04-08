import { getGreeting } from '../support/app.po';

describe('website', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to website!');
  });
});

/*

describe("app", () => {
  let webDriver: ThenableWebDriver;
  beforeAll(async () => {
    webDriver = new Builder().withCapabilities(capabilities).build();
    await webDriver.get("http://localhost:3000");
  });

  afterAll(() => {
    webDriver.quit();
  });

  it("should load", async () => {
    const title = await webDriver.getTitle();
    expect(title).toBe("");
  });

  it("should remove server side styles as using Material UI styles instead", async () => {
    await expect(
      webDriver.findElement(By.id("jss-server-side"))
    ).rejects.toThrow();
    it.todo("Change to make this return type NoSuchElementError");
  });

  it("should contain meta charset of utf-8 for unicode", async () => {
    const charset = await webDriver.findElement(
      By.xpath("//meta[@charset='UTF-8']")
    );
    expect(charset).toBeTruthy();
  });

  it("should indicate that site is mobile optimized", async () => {
    const viewportMeta = await webDriver.findElement(
      By.xpath("//meta[@name='viewport']")
    );
    const content = await viewportMeta.getAttribute("content");
    /*const viewport = {};
    content.split(',').forEach((el) => {
      const [key, value] = el.split('=');
      viewport[key.trim()] = value;
    });

    const sizeOfViewport = viewport['width'];
    expect(sizeOfViewport).toBe('device-width');

    const initialZoomLevel = viewport['initial-scale'];
    expect(initialZoomLevel).toBe('0.86');

    const maxZoomLevel = viewport['maximum-scale'];
    expect(maxZoomLevel).toBe('3.0');

    const minZoomLevel = viewport['minimum-scale'];
    expect(minZoomLevel).toBe('0.86');
  });

  it.todo("should provide theme color in meta");
  it.todo("should change theme from dark to light");
  it.todo("should change page to / with slash");
  it.todo("should change page to / without slash");
  it.todo("should redirect page /stories to /"); // TODO:
  it.todo("should change page to /stories/"); // TODO: What should be displayed here!!!!
  it.todo("should change page to /stories/:slug/story"); // TODO: This is incorrect!!!
  it.todo("should change page to /stories/:slug/story/"); // TODO: This is incorrect!!!
  it.todo("should change page to /stories/:slug");
  it.todo("should change page to /stories/:slug/");
  it.todo("should change page to /photo-of-the-week/:slug/");
  it.todo("should change page to /reviews");
  it.todo("should change page to /reviews/");
  it.todo("should change page to /review");
  it.todo("should change page to /review/");
  it.todo("should change page to /about");
  it.todo("should change page to /about/");
  it.todo("should provide service worker");
  it.todo("should use all declared fontawesome icons");
  it.todo("should not need free if pro fontawesome icon defined");
  it.todo("should provide accessibility");
  it.todo("1rem should be 16px");

rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
rel="noreferrer" has the same effect, but also prevents the Referer header from being sent to the new page. Removing the referrer header will affect analytics.

});


*/
