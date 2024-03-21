import { test, expect } from '@playwright/test';
import CONTENTFUL_URL from '../../../helper/constant';
import { routeHelper } from '../../../helper/routeHelper';
import { getCssPropertyValue } from '../../../helper/uiHelpers';
import BlogListPage from '../../../pages/blogs/blogListPage';
import { CommonSteps } from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
import Footer from '../../../pages/footer';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs listing page:', () => {
  let blogList : BlogListPage;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);

    blogList = new BlogListPage(page);

    await commonSteps.goToHomePage();

    // Mock
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await page.waitForLoadState();
    await blogList.blogsWaitForTitles();
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

    await expect.soft(blogList.imgOfMainArticle).toBeVisible();
    await expect.soft(blogList.imgOfMainArticle).toHaveCSS('width', '496px');
    await expect.soft(blogList.imgOfMainArticle).toHaveCSS('height', '352px');

    await expect.soft(blogList.btnMainArticle).toHaveText('Read more');
    await expect.soft(blogList.btnMainArticle).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect.soft(blogList.btnMainArticle).toHaveCSS('background-color', 'rgb(60, 113, 188)');
  });

  test('BCOM-6, regular articles titles', async () => {
    await expect.soft(blogList.regularArticles).toHaveCount(6);
    await expect.soft(blogList.titlesRegArticles).toHaveCount(6);

    const regularTitles = [
      'What Showers Are Best for Small Bathrooms?',
      'Get Creative with Your Bathroom Lighting',
      'What Is the Future of Bathroom Technology?',
      'Would Your Bathroom Benefit From a Water Softener?',
      'Add Luxury to Your Bathroom with Underfloor Heating',
      'Copy Add Luxury to Your Bathroom with Underfloor Heating',
    ];

    /* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */
    for (const title of regularTitles) {
      await blogList.getRegTitleByIndex(regularTitles.indexOf(title)).scrollIntoViewIfNeeded();
      await expect.soft(blogList.getRegTitleByIndex(regularTitles.indexOf(title)))
        .toHaveText(title);
    }
  });

  test('BCOM-7, "Load more" button UI', async () => {
    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await blogList.loadMoreBtn.scrollIntoViewIfNeeded();

    await expect(blogList.loadMoreBtn).toBeVisible();
    await expect.soft(blogList.loadMoreBtn).toHaveText('Load more');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('font-size', '16px');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('font-weight', '400');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('text-align', 'left');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('width', '212px');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('height', '40px');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('color', 'rgb(13, 45, 92)');
    await expect.soft(blogList.loadMoreBtn).toHaveCSS('background-color', 'rgb(240, 243, 246)');
  });

  test('BCOM-11, Main article and three regulars in a row', async () => {
    await expect.soft(blogList.mainArticle).toBeVisible();

    await expect.soft(blogList.regularArticles.nth(0)).toBeVisible();
    await expect.soft(blogList.regularArticles.nth(1)).toBeVisible();
    await expect.soft(blogList.regularArticles.nth(2)).toBeVisible();

    await blogList.regularArticles.nth(2).scrollIntoViewIfNeeded();

    const widthOfMainArt = await getCssPropertyValue(blogList.mainArticle, 'width');
    const widthOfFirstRegArt = await getCssPropertyValue(blogList.regularArticles.nth(0), 'width');
    const widthOfSecondRegArt = await getCssPropertyValue(blogList.regularArticles.nth(1), 'width');
    const widthOfThirdRegArt = await getCssPropertyValue(blogList.regularArticles.nth(2), 'width');

    // Here we will check, if three Regular articles widths are less,
    // then Main article width + 36px in-between
    expect(parseInt(widthOfMainArt, 10)).toBeGreaterThanOrEqual(parseInt(widthOfFirstRegArt, 10)
      + parseInt(widthOfSecondRegArt, 10) + parseInt(widthOfThirdRegArt, 10) + 36);
  });
});
