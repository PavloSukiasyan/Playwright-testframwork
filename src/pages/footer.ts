import { Page } from '@playwright/test';

export default class Footer {
  constructor(private readonly page: Page) { }

  mainBlock = this.page.locator('[data-testid="footer"]');

  navigationPart = this.mainBlock.locator('[class*="Footer_navigation"] div[class*="row padding"]');

  cookiesPolicyLink = this.navigationPart.locator('a[href*="cookies-policy"]');

  getFooterLinkByHref = (href: string) => this.navigationPart.locator(`a[href*="${href}"]`);
}
