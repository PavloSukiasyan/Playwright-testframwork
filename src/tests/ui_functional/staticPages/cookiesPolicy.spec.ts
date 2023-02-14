import { test, expect } from '@playwright/test';
import { routeHelper } from '../../../helper/routeHelper';
import { CommonSteps } from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
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

  test('PT-1, open Cookie Policy page and Breadcrumbs', async ({ page }) => {
    const breadcrumbs = new BreadCrumbsComponent(page);

    await expect.soft(page).toHaveURL(
      '/legal-policies/cookies-policy',
    );

    await expect.soft(page).toHaveTitle(
      'Cookies Policy | The Bathroom Showroom',
    );

    await expect.soft(breadcrumbs.bigTitle).toHaveText('Cookies Policy Mock');
    await expect.soft(breadcrumbs.bigTitle).toHaveCSS('font-size', '36px');
    await expect.soft(breadcrumbs.bigTitle).toHaveCSS('color', 'rgb(0, 0, 0)');

    const brItems = await (breadcrumbs.brLinks).count();

    for (let index = 0; index < brItems; index += 1) {
      await expect.soft(breadcrumbs.brLinks.nth(index)).toHaveCSS('font-size', '12px');
      await expect.soft(breadcrumbs.brLinks.nth(index)).toHaveCSS('font-weight', '400');
      await expect.soft(breadcrumbs.brLinks.nth(index)).toHaveCSS('text-align', 'left');
      await expect.soft(breadcrumbs.brLinks.nth(index)).toHaveCSS('text-overflow', 'ellipsis');
      await expect.soft(breadcrumbs.brLinks.nth(index)).toHaveCSS('-webkit-line-clamp', '2');
    }

    for (let i = 0; i < 1; i += 1) {
      await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('color', 'rgb(5, 45, 91)');
      await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('cursor', 'pointer');
    }

    await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('color', 'rgb(96, 111, 128)');
    await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('cursor', 'default');

    const brLabels = ['Homepage', 'Legal policies', 'Cookies Policy Mock'];
    for (let i = 0; i < brLabels.length; i += 1) {
      await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveText(brLabels[i]);
    }
  });

  test('PT-2, page content and style', async ({ page }) => {
    const staticPage = new StaticPage(page);

    // TODO
    await expect.soft(staticPage.title).toHaveText('Cookies Policy Mock2');
    await expect.soft(staticPage.title).toHaveCSS('font-size', '24px');
    await expect.soft(staticPage.title).toHaveCSS('color', 'rgb(0, 0, 0)');
  });
});
