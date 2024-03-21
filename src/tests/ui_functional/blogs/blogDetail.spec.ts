import { test, expect } from '@playwright/test';
import CONTENTFUL_URL from '../../../helper/constant';
import routeHelper from '../../../helper/routeHelper';
import BlogDetailPage from '../../../pages/blogs/blogDetailPage';
import BlogListPage from '../../../pages/blogs/blogListPage';
import CommonSteps from '../../../pages/commonSteps';
import BreadCrumbsComponent from '../../../pages/components/breadcrumbs';
import Footer from '../../../pages/footer';
import mockForBlogDetailPage from './mockBlogDetails';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Blogs details page:', () => {
  let blogDetail : BlogDetailPage;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const blogList = new BlogListPage(page);
    blogDetail = new BlogDetailPage(page);

    await commonSteps.goToHomePage();

    // Mock for list
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await blogList.btnRegArticles.nth(0).waitFor();
    // Mock for detail page
    await routeHelper(page, CONTENTFUL_URL, mockForBlogDetailPage);
    await blogList.btnRegArticles.nth(0).click();

    await page.waitForLoadState();
  });

  test('BCOM-12, open Detail page and breadcrumbs', async ({ page }) => {
    const breadcrumbs = new BreadCrumbsComponent(page);

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

  test('BCOM-13, date time', async () => {
    await expect.soft(blogDetail.publishedDate).toBeVisible();
    await expect.soft(blogDetail.publishedDate).toHaveText('Published: 1st Feb 2023');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('font-size', '14px');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('font-weight', '400');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.publishedDate).toHaveCSS('text-align', 'left');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect.soft(blogDetail.publishedDate).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await expect.soft(blogDetail.readTime).toBeVisible();
    await expect.soft(blogDetail.readTime).toHaveText('Read Time: 4 min');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-size', '14px');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-weight', '400');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.readTime).toHaveCSS('text-align', 'left');
    await expect.soft(blogDetail.readTime).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.readTime).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.readTime).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('BCOM-14, UI', async () => {
    await expect.soft(blogDetail.socialMediaCont).toBeVisible();

    await expect.soft(blogDetail.facebookBtn).toBeVisible();
    await expect.soft(blogDetail.facebookBtn).toHaveText('Facebook');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('font-size', '16px');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('font-weight', '400');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('text-align', 'center');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('color', 'rgb(24, 45, 61)');
    await expect.soft(blogDetail.facebookBtn).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await expect.soft(blogDetail.contentBlock).toHaveCount(7);

    await expect.soft(blogDetail.labelParagraph).toHaveCount(5);
    await expect.soft(blogDetail.labelParagraph.nth(0)).toBeVisible();
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveText('The Best Showers for Small Bathrooms');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('font-size', '20px');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('font-weight', '700');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('text-align', 'left');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('color', 'rgb(0, 0, 0)');
    await expect.soft(blogDetail.labelParagraph.nth(0)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await expect.soft(blogDetail.textParagraph).toHaveCount(18);
    await expect.soft(blogDetail.textParagraph.nth(0)).toBeVisible();
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveText(`If your bathroom space is limited,
      you may be wondering can I have a shower in a small bathroom? For most, the answer is yes, 
      but you’ll just need to be more clever when adding your shower.`);
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('font-size', '16px');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('font-weight', '400');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('text-align', 'left');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('color', 'rgb(0, 0, 0)');
    await expect.soft(blogDetail.textParagraph.nth(0)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    // Images are loaded only if scrolled into view, so first we need to locate wrappers
    const imgNumbers = await blogDetail.imgWrapper.count();

    await expect.soft(blogDetail.imgWrapper).toHaveCount(3);
    for (let i = 0; i < (imgNumbers - 1); i += 1) {
      await blogDetail.imgWrapper.nth(i).scrollIntoViewIfNeeded();
      await expect.soft(blogDetail.imgParagraph.nth(i)).toBeVisible();
    }
    await expect.soft(blogDetail.imgParagraph).toHaveCount(3);

    await expect.soft(blogDetail.readTime).toBeVisible();
    await expect.soft(blogDetail.readTime).toHaveText('Read Time: 4 min');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-size', '14px');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-weight', '400');
    await expect.soft(blogDetail.readTime).toHaveCSS('font-family', /Helvetica Neue/);
    await expect.soft(blogDetail.readTime).toHaveCSS('text-align', 'left');
    await expect.soft(blogDetail.readTime).toHaveCSS('text-overflow', 'clip');
    await expect.soft(blogDetail.readTime).toHaveCSS('-webkit-line-clamp', 'none');
    await expect.soft(blogDetail.readTime).toHaveCSS('color', 'rgb(255, 255, 255)');
  });
});
