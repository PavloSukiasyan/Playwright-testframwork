import { Page } from '@playwright/test';

export default class CookiesPolicyComponent {
  constructor(private readonly page: Page) {}

  acceptBtn = this.page.locator('button#onetrust-accept-btn-handler');

  clickOnAcceptCookies = () => { this.acceptBtn.click(); };
}
