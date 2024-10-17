import BasePageComponent from '../base/baseComponents';

export default class Footer extends BasePageComponent {
  base = this.page.locator('[data-testid="footer"]');

  navigationPart = this.base.locator('[class*="Footer_navigation"] div[class*="row padding"]');

  cookiesPolicyLink = this.navigationPart.locator('a[href*="cookies-policy"]');

  getFooterLinkByHref = (href: string) => this.navigationPart.locator(`a[href*="${href}"]`);
}
