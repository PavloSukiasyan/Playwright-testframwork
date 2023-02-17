import { BrowserContext, Page } from '@playwright/test';
import fs from 'fs';

export default class CookiesPolicyComponent {
  constructor(private readonly page: Page, private context: BrowserContext) {}

  acceptBtn = this.page.locator('button#onetrust-accept-btn-handler');

  clickOnAcceptCookies = async () => { await this.acceptBtn.click(); };

  setPredefinedCookies = async () => {
    const cookies = fs.readFileSync('src/cookies.json', 'utf8');

    const deserializedCookies = JSON.parse(cookies);
    await this.context.addCookies(deserializedCookies);
  };

  recordCookies = async () => {
    const cookies = await this.context.cookies();
    const cookieJson = JSON.stringify(cookies);

    fs.writeFileSync('src/cookies.json', cookieJson);
  };
}
