import { test, expect } from '@playwright/test';
import { routeHelper } from '../../../helper/routeHelper';
import BlogListPage from '../../../pages/blogs/blogListPage';
import { CommonSteps } from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs listing page: ', () => {
  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();

    // Mock
    await routeHelper(page, 'content/v1/spaces/g44e4oo0e2sa/environments/master', mockForBlogsListing);

    // click footer link
    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
  });

  test('BCOM-4, open page and breadcrumbs', async ({ page }) => {
    const breadcrumbs = new BreadCrumbsComponent(page);
    const blogList = new BlogListPage(page);

    await expect.soft(page).toHaveURL('/blogs');

    await expect.soft(page).toHaveTitle(
      'Our bathroom inspired blogs! | The Bathroom Showroom',
    );

    await expect.soft(breadcrumbs.bigTitle).toHaveText('Welcome to our blog');
    await expect.soft(blogList.titleMainArticle).toHaveText('Mock Add Soft Curves With Circular Bathroom Mirrors');
  });
});
