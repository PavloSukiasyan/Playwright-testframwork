import BasePage from '../../base/basePage';

export default class StaticPage extends BasePage {
  mainPartOfStaticPage = this.page.locator('[class*="StaticInfoPage"]');

  navigationMenuPart = this.mainPartOfStaticPage.locator('[data-testid="navigation-side-menu"]');

  titleOfTextBlock = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] h2[class*="display-large"]');

  titlesOfParagraphText = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] h3[class*="display-medium"]');

  ordinaryText = this.mainPartOfStaticPage.locator('[class*="col-desktop-6"] div[class*="body-wide-line"]');

  navMenuLink = this.navigationMenuPart.locator('li a');
}
