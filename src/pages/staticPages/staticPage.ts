import { Page } from '@playwright/test';

export default class StaticPage {
  constructor(private readonly page: Page) {}

  mainPartOfStaticPage = this.page.locator('[class*="StaticInfoPage"]');

  navigationMenuPart = this.mainPartOfStaticPage.locator('[data-testid="navigation-side-menu"]');

  titleOfTextBlock = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] h2[class*="display-large"]');

  titlesOfParagraphText = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] h3[class*="display-medium"]');

  ordinaryText = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] div[class*="body-wide-line"]');

  navMenuLink = this.navigationMenuPart.locator('li a');
}
