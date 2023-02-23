import { test, expect } from '@playwright/test';
import CONTENTFUL_URL from '../../../helper/constant';
import { routeHelper } from '../../../helper/routeHelper';
import BlogListPage from '../../../pages/blogs/blogListPage';
import CommonSteps from '../../../pages/commonSteps';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs listing page: ', () => {
  let blogList: BlogListPage;
  let footer: Footer;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    blogList = new BlogListPage(page);
    footer = new Footer(page);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();
  });

  test('BCOM-8, only seven blogs - so no "Load more" button', async ({ page }) => {
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing(0, 7, 7, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeHidden();
  });

  test('BCOM-9, "Load more" button loads six more, and button then hides', async ({ page }) => {
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing(0, 7, 13, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();

    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing(7, 13, 13, true));
    await blogList.loadMoreBtn.click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(12);

    await expect.soft(blogList.loadMoreBtn).toBeHidden();
  });

  test('BCOM-10, "Load more" button loads six more, and button then still visible', async ({ page }) => {
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing(0, 7, 15, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();

    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing(7, 13, 15, true));
    await blogList.loadMoreBtn.click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(12);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();
  });
});
