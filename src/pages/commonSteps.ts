import { BrowserContext, Page } from '@playwright/test';
import CookiesPolicyComponent from './components/oneTrustCookiePolicy';
import UserRoleModalComponent from './components/userRoleModalComponent';

export class CommonSteps {
  private readonly cookiesPolicy: CookiesPolicyComponent;
  private readonly userRoleModal: UserRoleModalComponent;

  constructor(private readonly page: Page, private context: BrowserContext) {
    this.cookiesPolicy = new CookiesPolicyComponent(page, context);
    this.userRoleModal = new UserRoleModalComponent(page);
  }

  async goToHomePage() {
    await this.grantGeoPermissions();

    await this.cookiesPolicy.setPredefinedCookies();

    await this.page.goto('/', {waitUntil:'load'});

    await this.userRoleModal.setHomeowner();
  }

  async grantGeoPermissions() {
    await this.context.grantPermissions(['geolocation']);
  }
}

export default CommonSteps;
