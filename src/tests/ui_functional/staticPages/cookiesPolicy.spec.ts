import { test, expect } from '@playwright/test';
import { routeHelper } from '../../../helper/routeHelper';
import { CommonSteps } from '../../../pages/commonSteps';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import StaticPage from '../../../pages/staticPages/staticPage';
import { mockForCookiesPolicy } from './mockCookiesPolicy';

test.use({
  permissions: ['geolocation'],
});

test('PT-1, open Cookie Policy page', async ({ page, context }) => {
  const commonSteps = new CommonSteps(page);
  const staticPage = new StaticPage(page);
  const footer = new Footer(page);
  const cookiesPolicy = new CookiesPolicyComponent(page, context);

  await cookiesPolicy.setPredefinedCookies();
  await commonSteps.goToHomePage();

  await expect.soft(page).toHaveTitle(
    'The Bathroom Showroom | 280+ Showrooms nationwide',
  );

  // Mock
  await routeHelper(page, 'content/v1/spaces/g44e4oo0e2sa/environments/master', mockForCookiesPolicy);

  // click footer link
  await expect(footer.navigationPart).toBeVisible();
  await footer.getFooterLinkByHref('cookies-policy').click();

  await expect.soft(page).toHaveTitle(
    'The Bathroom Showroom | 280+ Showrooms nationwide',
  );

  await expect.soft(staticPage.title).toHaveText('Cookies Policy Mock');
  await expect.soft(staticPage.title).toHaveCSS('font-size', '36px');
});
