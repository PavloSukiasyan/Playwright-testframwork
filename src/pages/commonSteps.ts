import { BrowserContext, Page } from '@playwright/test';

export class CommonSteps {
  constructor(private readonly page: Page, private context: BrowserContext) {}

  async goToHomePage() {
    await this.grantGeoPermissions();
    await this.page.goto('https://www.bathrooms.com/');
  }

  async grantGeoPermissions() {
    await this.context.grantPermissions(['geolocation']);
  }
}

export default CommonSteps;
