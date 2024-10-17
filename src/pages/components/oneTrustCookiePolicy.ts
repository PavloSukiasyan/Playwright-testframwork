import { BrowserContext, Locator, Page } from '@playwright/test';
import fs from 'fs';
import BasePageComponent from '../../base/baseComponents';

export default class CookiesPolicyComponent extends BasePageComponent {
  public readonly base: Locator;

  public readonly acceptBtn: Locator;

  constructor(protected page: Page, private context: BrowserContext) {
    super(page);
    this.base = this.page.locator('#onetrust-group-container');
    this.acceptBtn = this.base.locator('button#onetrust-accept-btn-handler');
  }

  clickOnAcceptCookies = async () => { await this.acceptBtn.click(); };

  setPredefinedCookies = async () => {
    const cookies = fs.readFileSync('src/resources/cookies.json', 'utf8');

    const deserializedCookies = JSON.parse(cookies);
    await this.context.addCookies(deserializedCookies);
  };

  recordCookies = async () => {
    const cookies = await this.context.cookies();
    const cookieJson = JSON.stringify(cookies);

    fs.writeFileSync('src/resources/cookies.json', cookieJson);
  };
}
