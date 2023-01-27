import { Page } from '@playwright/test';

export class CommonSteps {
  constructor(private readonly page: Page, private readonly tInfo: string = '') {}

  async goToHomePage() {
    await this.page.goto('https://www.bathrooms.com/');
  }
}

export default CommonSteps;
