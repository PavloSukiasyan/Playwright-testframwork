import { test, expect } from '@playwright/test';
import { routeHelper } from '../../../helper/routeHelper';
import BlogListPage from '../../../pages/blogs/blogListPage';
import { CommonSteps } from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs listing page: ', () => {
  let blogList : BlogListPage;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    blogList = new BlogListPage(page);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();

    // Mock
    await routeHelper(page, 'content/v1/spaces/g44e4oo0e2sa/environments/master', mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
  });

  test('BCOM-4, open page and breadcrumbs', async ({ page }) => {
    const breadcrumbs = new BreadCrumbsComponent(page);

    await expect.soft(page).toHaveURL('/blogs');

    await expect.soft(page).toHaveTitle(
      'Our bathroom inspired blogs! | The Bathroom Showroom',
    );

    await expect.soft(breadcrumbs.bigTitle).toHaveText('Welcome to our blog');

    await expect.soft(breadcrumbs.brLinks).toHaveCount(2);
    await expect.soft(breadcrumbs.brLinks.nth(0)).toHaveText('Homepage');
    await expect.soft(breadcrumbs.brLinks.nth(1)).toHaveText('Blog');
  });

  test('BCOM-5, main article', async () => {
    await expect.soft(blogList.titleMainArticle).toHaveText('Mock Add Soft Curves With Circular Bathroom Mirrors');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('font-size', '36px');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('font-weight', '700');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogList.titleMainArticle).toHaveCSS('text-align', 'start');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('text-overflow', 'ellipsis');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('-webkit-line-clamp', '2');
    await expect.soft(blogList.titleMainArticle).toHaveCSS('color', 'rgb(24, 45, 61)');

    await expect.soft(blogList.descriptionMainArticle)
      .toHaveText('A fantastic way of adding soft curves to your bathroom is through the use of stunning-looking circular mirrors.');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('font-size', '16px');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('font-weight', '400');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('text-align', 'left');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('text-overflow', 'ellipsis');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('-webkit-line-clamp', '3');
    await expect.soft(blogList.descriptionMainArticle).toHaveCSS('color', 'rgb(24, 45, 61)');

    await expect.soft(blogList.dateOfMainArticle).toHaveText('8th Feb 2023');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('font-size', '14px');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('font-weight', '400');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('text-align', 'left');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogList.dateOfMainArticle).toHaveCSS('color', 'rgb(96, 111, 128)');

    await expect.soft(blogList.readingOfMainArticle).toHaveText('5 min');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('font-size', '14px');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('font-weight', '400');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('text-align', 'left');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogList.readingOfMainArticle).toHaveCSS('color', 'rgb(96, 111, 128)');

    await expect.soft(blogList.btnMainArticle).toHaveText('Read more');
    await expect.soft(blogList.btnMainArticle).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect.soft(blogList.btnMainArticle).toHaveCSS('background-color', 'rgb(60, 113, 188)');
  });

  // ToDo regular articles test,  tests with load more + filtering
});
