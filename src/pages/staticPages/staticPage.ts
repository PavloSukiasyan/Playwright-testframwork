import { Page } from '@playwright/test';

export default class StaticPage {
  constructor(private readonly page: Page) {}

  mainPartOfStaticPage = this.page.locator('[class*="StaticInfoPage"]');

  navigationMenuPart = this.mainPartOfStaticPage.locator('[data-testid="navigation-side-menu"]');

  title = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] h2');
}
