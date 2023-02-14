import { test, expect } from '@playwright/test';
import { routeHelper } from '../../../helper/routeHelper';
import { CommonSteps } from '../../../pages/commonSteps';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import StaticPage from '../../../pages/staticPages/staticPage';
import { mockForCookiesPolicy } from './mockCookiesPolicy';

test.describe('Tests for Static Cookies policy page: ', () => {
  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();

    // Mock
    await routeHelper(page, 'content/v1/spaces/g44e4oo0e2sa/environments/master', mockForCookiesPolicy);

    // click footer link
    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('cookies-policy').click();
  });

  test('PT-1, open Cookie Policy page', async ({ page }) => {
    const staticPage = new StaticPage(page);

    await expect.soft(page).toHaveURL(
      '/legal-policies/cookies-policy',
    );

    await expect.soft(page).toHaveTitle(
      'Cookies Policy | The Bathroom Showroom',
    );

    await expect.soft(staticPage.title).toHaveText('Cookies Policy Mock');
    await expect.soft(staticPage.title).toHaveCSS('font-size', '36px');
    await expect.soft(staticPage.title).toHaveCSS('color', 'rgb(0, 0, 0)');
  });

  test('PT-2, page content and style', async ({ page }) => {
    const staticPage = new StaticPage(page);

    // TODO
    await expect.soft(staticPage.title).toHaveText('Cookies Policy Mock');
    await expect.soft(staticPage.title).toHaveCSS('font-size', '36px');
    await expect.soft(staticPage.title).toHaveCSS('color', 'rgb(0, 0, 0)');
  });
});
