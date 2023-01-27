import { test, expect } from '@playwright/test';
import { routeHelper } from '../../helper/routeHelper';
import { CommonSteps } from '../../pages/commonSteps';
import StaticPage from '../../pages/staticPages/staticPage';
import { mockForCookiesPolicy } from './mockCookiesPolicy';

test.use({
  permissions: ['geolocation'],
});

test('PT-1, open Cookie Policy page', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  const staticPage = new StaticPage(page);

  await commonSteps.goToHomePage();

  await expect.soft(page).toHaveTitle(
    'The Bathroom Showroom | 280+ Showrooms nationwide',
  );

  // close cookie
  await page.locator('button#onetrust-accept-btn-handler').click();

  // Mock
  await routeHelper(page, 'content/v1/spaces/g44e4oo0e2sa/environments/master', mockForCookiesPolicy);

  const cookiesPageLinkLocator = '[data-testid="footer"] [class*="Footer_navigation"] a[href*="cookies-policy"]';
  // click footer link
  await expect(page.locator(cookiesPageLinkLocator)).toBeVisible();
  await page.locator(cookiesPageLinkLocator).click();

  await expect.soft(page).toHaveTitle(
    'The Bathroom Showroom | 280+ Showrooms nationwide',
  );

  await expect.soft(staticPage.title).toHaveText('Cookies Policy Mock');
  await expect.soft(staticPage.title).toHaveCSS('font-size', '36px');
});
