import { Page } from '@playwright/test';

export default class StaticPage {
  constructor(private readonly page: Page) {}

  title = this.page.locator('div.row div[class*="text-center"] h1');
}
