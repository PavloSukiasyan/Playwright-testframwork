import { test, expect } from '@playwright/test';
import CONTENTFUL_URL from '../../../helper/constant';
import routeHelper from '../../../helper/routeHelper';
import BlogListPage from '../../../pages/blogs/blogListPage';
import CommonSteps from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import mockForBlogDetailPage from './mockBlogDetails';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs details page: ', () => {
  let blogList : BlogListPage;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    blogList = new BlogListPage(page);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();

    // Mock for list
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await blogList.btnRegArticles.nth(0).waitFor();
    // Mock for detail page
    await routeHelper(page, CONTENTFUL_URL, mockForBlogDetailPage);
    await blogList.btnRegArticles.nth(0).click();
  });

  test('BCOM-12, open Detail page and breadcrumbs', async ({ page }) => {
    const breadcrumbs = new BreadCrumbsComponent(page);
    await page.waitForLoadState();

    await expect.soft(page).toHaveURL('blogs/what-showers-are-best-for-small-bathrooms');

    await expect.soft(page).toHaveTitle(
      'Shower Ideas For Small Bathrooms | Space Saving Showers | The Bathroom Showroom',
    );

    await expect.soft(breadcrumbs.bigTitle).toHaveText('What Showers Are Best for Small Bathrooms? Banner title');

    await expect.soft(breadcrumbs.brLinks).toHaveCount(3);
    await expect.soft(breadcrumbs.brLinks.nth(0)).toHaveText('Homepage');
    await expect.soft(breadcrumbs.brLinks.nth(1)).toHaveText('Blogs');
    await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveText('What Showers Are Best for Small Bathrooms? Br Mocked');
  });
});
